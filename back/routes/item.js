var express = require("express");
var router = express.Router();

var item = require('../controller/item');
const { hasAnyRoleIn, sanitize , requireAuth, requireLogin} = require("../auth/middleware/auth");


router.post('',sanitize,  item.add);
router.put('/:id',sanitize,  item.update);
router.delete('/:id',sanitize,  item.deleteById);
router.get('',sanitize, item.getAll);
router.get('/:id',sanitize, item.getById);
router.post('/upload', item.upload)

module.exports = router;
