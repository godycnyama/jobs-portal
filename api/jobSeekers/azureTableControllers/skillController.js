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



exports.getSkills={
    handler: function (request, reply) {        
        var query = azure.TableQuery
            .select()
            .from(azureTable.tableName)
            .where('PartitionKey eq ?', azureTable.partitionKey);
            azureTable.find(query, function itemsFound(error, items) {
            if (error) {
                return reply(Boom.badRequest('An error occured while searching for skills record,try again'));
            }
           reply(items);
        });
    }
};

exports.getSkillByID = {
    validate: {
        payload: {
            skillID: Joi.string().required()            
        }
    },
    handler: function (request, reply) {        
        var query = azure.TableQuery
            .select()
            .from(azureTable.tableName)
            .where('RowKey eq ?', request.payload.skillID);
            azureTable.find(query, function itemsFound(error, items) {
            if (error) {
                return reply(Boom.badRequest('An error occured while searching for skill record,try again'));
            }
            reply(items[0]);
        });
    }
};

exports.insertSkill = {
    validate: {
        payload: {
            skillID: Joi.string().required(),
            description: Joi.string().required(),
            level: Joi.string().required(),
            experience: Joi.string().required(),
            lastDate: Joi.date().required(),
            isCurrent: Joi.boolean().required()
        }
    },
    handler : function (request, reply) {        
        var skill = {
            PartitionKey : azureTable.partitionKey
            , RowKey : request.payload.skillID                               
            ,description: request.payload.description
            ,level: request.payload.level
            ,experience: request.payload.experience
            ,lastDate: new Date(request.payload.lastDate) 
            ,isCurrent: new Boolean(request.payload.isCurrent)
        };
            azureTable.addItem(skill, function itemAdded(error) {
            if(error) {
                return reply(Boom.badRequest('An error occured while adding skill record,try again'));
            }
            else{ reply(skill);}
        });
    }
};

exports.updateSkill = {
    validate: {
        payload: {
            skillID: Joi.string().required(),
            description: Joi.string().required(),
            level: Joi.string().required(),
            experience: Joi.string().required(),
            lastDate: Joi.date().required(),
            isCurrent: Joi.boolean().required()
        }
    },
    handler : function (request, reply) {       
        var skill = {
            PartitionKey : azureTable.partitionKey
            , RowKey : request.payload.skillID                               
            ,description: request.payload.description
            ,level: request.payload.level
            ,experience: request.payload.experience
            ,lastDate: new Date(request.payload.lastDate) 
            ,isCurrent: new Boolean(request.payload.isCurrent)
        };
            azureTable.updateItem(skill, function itemUpdated(error) {
            if(error) {
                return reply(Boom.badRequest('An error occured while updating skill record,try again'));
            }
            else{ reply({message:"Skill updated successfully"});}
        });
    }
};

exports.deleteSkill = {
    validate: {
        payload: {
            skillID: Joi.string().required()            
        }
    },
    handler: function (request, reply) {        
            azureTable.deleteItem(request.payload.skillID, function itemDeleted(error) {
            if(error) {
                return reply(Boom.badRequest('An error occured while adding skill record,try again'));
            }
            else{reply({ message : "Skill deleted successfully"})}
        });
    }
}

