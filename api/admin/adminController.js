'use strict';

var Joi = require('joi'),
  Boom = require('boom'),
  Item = require('../models/mongodbModels/item');
  
exports.getAllItems = {
    auth: {
        strategy: 'jwt',
        scope: ['admin']
    },
    handler: function (request, reply) {
        Item.paginate({}, { sort: { createdOn: -1 }, page: 1, limit: 8 }, function (err, items) {
            if (err) {
                return reply(Boom.badRequest("An error occured while searching for items,try again"));
            } else {
                if (items) {
                    return reply({
                        data: items.docs,
                        total: items.total,
                        perPage: items.limit,
                        pageNo: items.page
                    });
                } else {
                    return reply(Boom.badRequest("No items found"));
                }
            }
        });
    }
};

exports.getItemByID = {
    auth: {
        strategy: 'jwt',
        scope: ['admin']
    },
    validate: {
        params: {
            itemID: Joi.number().required()
        }
    },
    handler: function (request, reply) {
        Item.findOne({ '_id': request.params.itemID }, function (err, item) {
            if (err) {
                return reply(Boom.badRequest("An error occured while searching for item,try again"));
            } else {
                if (item) {
                    return reply(item);
                } else {
                    return reply(Boom.badRequest("No item found"));
                }
            }
        });
    }
};

exports.getItemByCode = {
    auth: {
        strategy: 'jwt',
        scope: ['admin']
    },
    validate: {
        params: {
            itemCode: Joi.string().required().trim().min(1).max(50)
        }
    },
    handler: function (request, reply) {
        Item.find({ 'itemCode': request.params.itemCode }, function (err, item) {
            if (err) {
                return reply(Boom.badRequest("An error occured while searching for item,try again"));
            } else {
                if (item) {
                    return reply(item);
                } else {
                    return reply(Boom.badRequest("No item found"));
                }
            }
        });
    }
};

exports.createItem = {
    auth: {
        strategy: 'jwt',
        scope: ['admin']
    },
    validate: {
        payload: {
            itemCode: Joi.string().required().trim().max(50),        
            description: Joi.string().required().trim().max(50),
            category: Joi.string().required().trim().max(50),
            minimumJobAds: Joi.number(),
            maximumJobAds: Joi.number().allow(null),
            unitPrice: Joi.number()
        }
    },
    handler: function (request, reply) {
        var item = new Item(request.payload);
        item.save(function (err, item) {
            if (err) {
                return reply(Boom.badRequest("An error occured while creating  item,try again"));
            } else {
                if (item) {
                    console.log(item);
                    return reply({message:'Item price created successfully'});
                } else {
                    return reply(Boom.badRequest("Could not create item,try again"));
                }
            }
        });
    }
};

exports.updateItem = {
    auth: {
        strategy: 'jwt',
        scope: ['admin']
    },
    validate: {
        payload: {
            itemID: Joi.number().required(),
            itemCode: Joi.string().required().trim().min(1).max(50),            
            description: Joi.string().required().trim().min(1).max(50),
            category: Joi.string().required().trim().max(50),
            minimumJobAds: Joi.number(),
            maximumJobAds: Joi.number(),
            unitPrice: Joi.number().required()
        }
    },
    handler: function (request, reply) {
        Item.findOne({ '_id': request.payload.itemID }, function (err, item) {
            if (err) {
                return reply(Boom.badRequest("An error occured while updating item,try again"));
            } else {
                if (item) {
                    item.itemCode = request.payload.itemCode;
                    item.description = request.payload.description;
                    item.category = request.payload.category;
                    item.minimumJobAds = request.payload.minimumJobAds;
                    item.maximumJobAds = request.payload.maximumJobAds;
                    item.unitPrice = request.payload.unitPrice;                   
                    item.save(function (err, item0) {
                        if (err) {
                            return reply(Boom.badRequest("An error occured while updating item,try again"));
                        } else {
                            if (item0) {
                                return reply({ message: "Item"  + item0.itemCode + "updated successfully" });
                            } else {
                                return reply(Boom.badRequest("Item" + item0.itemCode + "could not be updated,try again"));
                            }
                        }
                    });
                } else {
                    return reply(Boom.badRequest("Item was not found"));
                }
            }


        });
    }
};

exports.deleteItem = {
    auth: {
        strategy: 'jwt',
        scope: ['admin']
    },
    handler: function (request, reply) {
        Item.findByIdAndRemove({ '_id': request.query.itemID }, function (err, item) {
            if (err) {
                return reply(Boom.badRequest(err));
            }
            return reply({ message: "Item deleted successfully" });
        });
    }
};


