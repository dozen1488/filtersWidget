var express = require('express');
var router = express.Router();

const tables = require('./tables.json');

router.get('/contexts', function (req, res, next) {
    const mappedTables = tables.map(table => ({
        id: table.id, name: table.name, dimensions: []
    }))
    res.send(mappedTables);
});

router.get('/dimensions', function (req, res, next) {
    const contextId = req.query.contextId;
    const context = tables.find(table => table.id == contextId);
    if (!context) {
        res.status(404).send('Context not found');
    } else {
        res.send(context.dimensions.map(dimension => ({ dimensionName: dimension.dimensionName, fields: [] })));
    }
});

router.get('/fields', function (req, res, next) {
    const contextId = req.query.contextId;
    const dimensionName = req.query.dimensionName;
    const context = tables.find(table => table.id == contextId);
    if (!context) {
        res.status(404).send('Context not found');
    } else {
        const dimension = context.dimensions.find(dimension => dimension.dimensionName == dimensionName);
        if (!dimension) {
            res.status(404).send('Dimension not found');
        }
        res.send(dimension.fields);
    }
});

module.exports = router;
