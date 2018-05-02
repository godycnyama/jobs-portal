"use strict";
var azure = require('azure-storage');
var AzureTable=require('./../dataAccess/azuretable');
var nconf = require('nconf');
nconf.env().file({ file: '/config/config.json'});
var tableName = nconf.get("TABLE_NAME");
var partitionKey = nconf.get("PARTITION_KEY");
var accountName = nconf.get("STORAGE_NAME");
var accountKey = nconf.get("STORAGE_KEY");
var tableService = azure.createTableService(accountName, accountKey);
var azureTable = new AzureTable(azure.createTableService(accountName, accountKey), tableName, partitionKey);


exports.getQualifications = {
    handler: function (request, reply) {        
        var query = azure.TableQuery
            .select()
            .from(azureTable.tableName)
            .where('PartitionKey eq ?', azureTable.partitionKey);
            azureTable.find(query, function itemsFound(error, items) {
            if (error) {
                return reply(Boom.badRequest('An error occured while searching for qualifications record,try again'));
            }
            else { reply(items); }
        });
    }
};

exports.getQualificationByID = {
    validate: {
        payload: {
            qualificationID: Joi.string().required()            
        }
    },
    handler: function (request, reply) {       
        var query = azure.TableQuery
            .select()
            .from(azureTable.tableName)
            .where('RowKey eq ?', request.payload.qualificationID);
            azureTable.find(query, function itemsFound(error, items) {
            if (error) {
                return reply(Boom.badRequest('An error occured while searching for qualification record,try again'));
            }
            else { reply(items[0]); }
        })
    }
};

exports.insertQualification = {
    validate: {
        payload: {
            qualificationID: Joi.string().required(),
            name: Joi.string().required(),
            level :Joi.string().required(),
            institution: Joi.string().required(),
            yearCompleted: Joi.string().required(),
            status: Joi.string().required(),
            majors: Joi.string().required()                       
        }
    },
    handler: function (request, reply) {        
        var qualification = {
            PartitionKey: azureTable.partitionKey
            , RowKey: request.payload.qualificationID
            , name: request.payload.name
            , level: request.payload.level
            , institution: request.payload.institution
            , yearCompleted: request.payload.yearCompleted
            , status: request.payload.status //complete,incomplete,in progress
            , majors: request.payload.majors
        };
            azureTable.addItem(qualification, function itemAdded(error) {
            if (error) {
                if (error) {
                return reply(Boom.badRequest('An error occured while adding qualification record,try again'));
            }
            }
            else { reply(qualification); }
        })
    }
};

exports.updateQualification = {
    validate: {
        payload: {
            qualificationID: Joi.string().required(),
            name: Joi.string().required(),
            level :Joi.string().required(),
            institution: Joi.string().required(),
            yearCompleted: Joi.string().required(),
            status: Joi.string().required(),
            majors: Joi.string().required()                       
        }
    },
    handler: function (request, reply) {
        var qualification = {
            PartitionKey: azureTable.partitionKey
            , RowKey: request.payload.qualificationID
            , name: request.payload.name
            , level: request.payload.level
            , institution: request.payload.institution
            , yearCompleted: request.payload.yearCompleted
            , status: request.payload.status //complete,incomplete,in progress
            , majors: request.payload.majors
        };
            azureTable.updateItem(qualification, function itemUpdated(error) {
            if (error) {
                if (error) {
                return reply(Boom.badRequest('An error occured while updating qualification record,try again'));
            }
            }
            else { reply({ message: "Qualification updated successfully" }); }
        })
    }
};

exports.deleteQualification = {
    validate: {
        payload: {
            qualificationID: Joi.string().required()            
        }
    },
    handler: function (request, reply) {       
            azureTable.deleteItem(request.payload.qualificationID, function itemDeleted(error) {
            if (error) {
                reply(error);
            }
            else { reply({ message: "Qualification deleted successfully" }) }
        })
    }
} 

