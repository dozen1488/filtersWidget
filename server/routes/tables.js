var express = require('express');
var router = express.Router();

const tables = require('./tables.json');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send(tables);
});

module.exports = router;
