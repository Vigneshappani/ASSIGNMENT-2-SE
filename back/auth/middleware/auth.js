const passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});

/**
 * Middleware to check whether user has has access to a resource by user role
 *
 * @param roles : array including elements in , ['super-admin','admin','administrator', 'clinician', 'dataCollector','coordinator','ministry-official', 'bed-validator']
 * @returns {(function(*, *, *): (*))|*}
 */
const hasAnyRoleIn = roles => {
    return (req, res, next) => {
        const role = req.user.role;
        if (roles.includes(role)){
            return next()
        }else {
            return res.status(401).send({ result: 'error', message: `No ${role} permission granted` })
        }
    }
}

const _sanitize = v => {
    if (v instanceof Object) {
        for (var key in v) {
          if (/^\$/.test(key)) {
            delete v[key];
          } else {
            _sanitize(v[key]);
          }
        }
    }
    return v;
}

/**
 * Middleware to remove $ from the body to prevent NOSQL injection
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */

const sanitize = (req, res, next) => {    
    req.body = _sanitize(req.body);

    return next();
  };


module.exports = { hasAnyRoleIn , sanitize, requireAuth, requireLogin }
