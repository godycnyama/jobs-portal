'use strict';
var AdminController = require('./adminController');
exports.register = function (server, options, next) {

    server.route([
    {
        method: 'POST',
        path: '/api/items',
        config: AdminController.createItem
    },
    {
        method: 'GET',
        path: '/api/items',
        config: AdminController.getAllItems
    },
    {
        method: 'GET',
        path: '/api/items/{itemID}',
        config: AdminController.getItemByID
    },
    {
        method: 'GET',
        path: '/api/items/getByItemCode/{itemCode}',
        config: AdminController.getItemByCode
    },
    {
        method: 'PUT',
        path: '/api/items',
        config: AdminController.updateItem
    },
    {
        method: 'DELETE',
        path: '/api/items',
        config: AdminController.deleteItem
    }
    ]);

    next();

};

exports.register.attributes = {
    pkg: require('./package.json')
};