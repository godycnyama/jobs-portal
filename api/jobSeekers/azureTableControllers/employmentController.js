"use strict";
var azure = require('azure-storage');
var Boom  = require('boom')
var AzureTable=require('./../dataAccess/azuretable');
var nconf = require('nconf');
nconf.env().file({ file: '/config/config.json'});
var tableName = nconf.get("TABLE_NAME");
var partitionKey = nconf.get("PARTITION_KEY");
var accountName = nconf.get("STORAGE_NAME");
var accountKey = nconf.get("STORAGE_KEY");
var tableService = azure.createTableService(accountName, accountKey);
var azureTable = new AzureTable(azure.createTableService(accountName, accountKey), tableName, partitionKey);

exports.employmentRecords = {
    handler: function (request, reply) {        
        var query = azure.TableQuery
            .select()
            .from(azureTable.tableName)
            .where('PartitionKey eq ?', azureTable.partitionKey);
            azureTable.find(query, function itemsFound(error, items) {
            if (error) {
                return reply(Boom.badRequest('An error occured while searching for employment records,try again'));
            }
            else { reply(items); }
        })
    }
};

exports.getEmploymentByID = {
    validate: {
        payload: {
            employmentID: Joi.string().required()            
        }
    },
    handler: function (request, reply) {        
        var query = azure.TableQuery
            .select()
            .from(azureTable.tableName)
            .where('RowKey eq ?', request.payload.employmentID);
            azureTable.find(query, function itemsFound(error, items) {
            if (error) {
                return reply(Boom.badRequest('An error occured while searching for employment record,try again'));
            }
            else { reply(items[0]); }
        })
    }
};

exports.createEmployment = {
    validate: {
        payload: {
            employmentID: Joi.string().required(),
            jobTitle: Joi.string().required(),
            jobLevel: Joi.string().required(),
            jobType: Joi.string().required(),
            companyName: Joi.string().required(),
            dateStarted: Joi.string().required(),
            dateEnded: Joi.string().required(),
            isCurrent: Joi.string().required(),
            sector: Joi.string().required(),
            location: Joi.string().required(),
            duties: Joi.string().required(),
            salary: Joi.string().required(),
            disableSalary: Joi.string().required(),
            reason: Joi.string().required()                        
        }
    },
    handler: function (request, reply) {        
        var employment = {
            PartitionKey: azureTable.partitionKey
            , RowKey: request.payload.employmentID
            , jobTitle: request.payload.jobTitle
            , jobLevel: request.payload.jobLevel
            , jobType: request.payload.jobType
            , companyName: request.payload.companyName
            , dateStarted: new Date(request.payload.dateStarted)
            , dateEnded: new Date(request.payload.dateEnded)
            , isCurrent: new Boolean(request.payload.isCurrent)
            , sector: request.payload.sector
            , location: request.payload.location
            , duties: request.payload.duties
            , salary: request.payload.salary
            , disableSalary: new Boolean(request.payload.disableSalary)
            , reason: request.payload.reason
        };
            azureTable.addItem(employment, function itemAdded(error) {
            if (error) {
                return reply(Boom.badRequest('An error occured while adding employment record,try again'));
            }
            else { reply(employment); }
        })
    }
};

exports.updateEmployment = {
    validate: {
        payload: {
            employmentID: Joi.string().required(),
            jobTitle: Joi.string().required(),
            jobLevel: Joi.string().required(),
            jobType: Joi.string().required(),
            companyName: Joi.string().required(),
            dateStarted: Joi.string().required(),
            dateEnded: Joi.string().required(),
            isCurrent: Joi.string().required(),
            sector: Joi.string().required(),
            location: Joi.string().required(),
            duties: Joi.string().required(),
            salary: Joi.string().required(),
            disableSalary: Joi.string().required(),
            reason: Joi.string().required()                        
        }
    },
    handler: function (request, reply) {        
        var employment = {
            PartitionKey: azureTable.partitionKey
            , RowKey: request.payload.employmentID
            , jobTitle: request.payload.jobTitle
            , jobLevel: request.payload.jobLevel
            , jobType: request.payload.jobType
            , companyName: request.payload.companyName
            , dateStarted: new Date(request.payload.dateStarted)
            , dateEnded: new Date(request.payload.dateEnded)
            , isCurrent: new Boolean(request.payload.isCurrent)
            , sector: request.payload.sector
            , location: request.payload.location
            , duties: request.payload.duties
            , salary: request.payload.salary
            , disableSalary: new Boolean(request.payload.disableSalary)
            , reason: request.payload.reason
        };
            azureTable.updateItem(employment, function itemUpdated(error) {
            if (error) {
                return reply(Boom.badRequest('An error occured while updating employment record file,try again'));
            }
            else { reply({ message: "Employment record updated successfully" }); }
        })
    }
}

exports.deleteEmployment = {
    validate: {
        payload: {
            employmentID: Joi.string().required()            
        }
    },
    handler: function (request, reply) {        
            azureTable.deleteItem(request.payload.employmentID, function itemDeleted(error) {
            if (error) {
                return reply(Boom.badRequest('An error occured while deleting employment record file,try again'));
            }
            else { reply({ message: "Employment record deleted" }) }
        })
    }
}
