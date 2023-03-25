const express = require('express');

var  passportService = require('../config/passport'),
passport = require('passport');

var requireAuth = passport.authenticate('jwt', {session: false}),
requireLogin = passport.authenticate('local', {session: false});


const {hasAnyRoleIn, sanitize }  = require('../middleware/auth')

const router = express.Router();
const UserController = require('../controllers/user');

router.post('/reister',sanitize, UserController.register);
router.post('/login', requireLogin, UserController.login);

module.exports = router;
