var express = require("express");
var router = express.Router();
const axios = require('axios');

router.get('', async (request, response, next) => {
    let res = await axios.get('https://tradestie.com/api/v1/apps/reddit');
    return response.json(res.data)
});



module.exports = router;
