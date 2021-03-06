var jwt = require('jwt-simple');
var request = require('request');
var moment = require('moment');
var GOOGLE_SECRET = 'lxD4MKWoPWKo_T7ONj-QEFjZ';
var TOKEN_SECRET = "thisisatoken";
var User = require('./models/User');

module.exports = function (app) {

    /*
 |--------------------------------------------------------------------------
 | Login Required Middleware
 |--------------------------------------------------------------------------
 */
    function ensureAuthenticated(req, res, next) {
        if (!req.headers.authorization) {
            return res.status(401).send({
                message: 'Please make sure your request has an Authorization header'
            });
        }
        var token = req.headers.authorization.split(' ')[1];

        var payload = null;
        try {
            payload = jwt.decode(token, config.TOKEN_SECRET);
        } catch (err) {
            return res.status(401).send({
                message: err.message
            });
        }

        if (payload.exp <= moment().unix()) {
            return res.status(401).send({
                message: 'Token has expired'
            });
        }
        req.user = payload.sub;
        next();
    }

    /*
 |--------------------------------------------------------------------------
 | Generate JSON Web Token
 |--------------------------------------------------------------------------
 */
    function createJWT(user) {
        var payload = {
            sub: user._id,
            iat: moment().unix(),
            exp: moment().add(14, 'days').unix()
        };
        return jwt.encode(payload, TOKEN_SECRET);
    }

    /*
 |--------------------------------------------------------------------------
 | GET /api/me
 |--------------------------------------------------------------------------
 */
    app.get('/api/me', ensureAuthenticated, function (req, res) {
        User.findById(req.user, function (err, user) {
            res.send(user);
        });
    });

    /*
 |--------------------------------------------------------------------------
 | PUT /api/me
 |--------------------------------------------------------------------------
 */
    app.put('/api/me', ensureAuthenticated, function (req, res) {
        User.findById(req.user, function (err, user) {
            if (!user) {
                return res.status(400).send({
                    message: 'User not found'
                });
            }
            user.displayName = req.body.displayName || user.displayName;
            user.email = req.body.email || user.email;
            user.save(function (err) {
                res.status(200).end();
            });
        });
    });

    /*
     |-------------------------------------------------------------------- ------
     | Login with Google
     |--------------------------------------------------------------------------
     */
    app.post('/auth/google', function (req, res) {
        var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
        var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
        var params = {
            code: req.body.code,
            client_id: req.body.clientId,
            client_secret: GOOGLE_SECRET,
            redirect_uri: req.body.redirectUri,
            grant_type: 'authorization_code'
        };

        // Step 1. Exchange authorization code for access token.
        request.post(accessTokenUrl, {
            json: true,
            form: params
        }, function (err, response, token) {
            var accessToken = token.access_token;
            var headers = {
                Authorization: 'Bearer ' + accessToken
            };

            // Step 2. Retrieve profile information about the current user.
            request.get({
                url: peopleApiUrl,
                headers: headers,
                json: true
            }, function (err, response, profile) {
                if (profile.error) {
                    return res.status(500).send({
                        message: profile.error.message
                    });
                }
                // Step 3a. Link user accounts.
                if (req.headers.authorization) {
                    User.findOne({
                        google: profile.sub
                    }, function (err, existingUser) {
                        if (existingUser) {
                            return res.status(409).send({
                                message: 'There is already a Google account that belongs to you'
                            });
                        }
                        var token = req.headers.authorization.split(' ')[1];
                        var payload = jwt.decode(token, config.TOKEN_SECRET);
                        User.findById(payload.sub, function (err, user) {
                            if (!user) {
                                return res.status(400).send({
                                    message: 'User not found'
                                });
                            }
                            user.google = profile.sub;
                            user.picture = user.picture || profile.picture.replace('sz=50', 'sz=200');
                            user.displayName = user.displayName || profile.name;
                            user.save(function () {
                                var token = createJWT(user);
                                res.send({
                                    token: token
                                });
                            });
                        });
                    });
                } else {
                    // Step 3b. Create a new user account or return an existing one.
                    User.findOne({
                        google: profile.sub
                    }, function (err, existingUser) {
                        if (existingUser) {
                            return res.send({
                                token: createJWT(existingUser)
                            });
                        }
                        var user = new User();
                        user.google = profile.sub;
                        user.picture = profile.picture.replace('sz=50', 'sz=200');
                        user.displayName = profile.name;
                        user.save(function (err) {
                            var token = createJWT(user);
                            res.send({
                                token: token
                            });
                        });
                    });
                }
            });
        });
    });
};
