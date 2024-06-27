var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET users listing. */
router.get('/', function (req, res, next) {
    const query = req.query;
    axios.get(`${query.url}`,{
        responseType: 'arraybuffer',
    })
        .then((response) => {
            res.setHeader('Content-Type', 'image/jpeg');
            res.send(response.data);
        }).catch((error) => {
        res.send(error);
    });
});

module.exports = router;
