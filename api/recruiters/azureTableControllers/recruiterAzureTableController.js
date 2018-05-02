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
var recruiterController = new RecruiterController(azureTable);

module.exports = recruiterController;
function RecruiterController(azureTable) {
    this.azureTable = azureTable;
}
RecruiterController.prototype = {
    getRecruiters: function (request, reply) {
        var self = this;
        var query = azure.TableQuery
            .select()
            .from(self.azureTable.tableName)
            .where('PartitionKey eq ?', self.azureTable.partitionKey);
        self.azureTable.find(query, function itemsFound(error, items) {
            if (error) {
                return reply(Boom.badRequest('An error occured while searching for recruiters record,try again'))
            }
            else { reply(items); }
        });
    },
    getRecruiterByID: function (request, reply) {
        var self = this;
        var query = azure.TableQuery
            .select()
            .from(self.azureTable.tableName)
            .where('RowKey eq ?', request.payload.recruiterID);
        self.azureTable.find(query, function itemsFound(error, items) {
            if (error) {
                return reply(Boom.badRequest('An error occured while searching for recruiter record,try again'))
            }
            else { reply(items[0]); }
        });
    },
    insertRecruiter: function (request, reply) {
        var self = this;
        var recruiter = {
            PartitionKey: self.azureTable.partitionKey
            , RowKey: request.payload.recruiterID
            , companyName: request.payload.companyName
            , recruiterType: request.payload.recruiterType  //Employer,Agent
            , companyAddress: request.payload.companyAddress
            , companyTel: request.payload.companyTel
            , email: request.payload.email
            , fax: request.payload.fax
            , locationCountry: request.payload.locationCountry
            , locationTown: request.payload.locationTown
            , logoID: request.payload.logoID
        };
        self.azureTable.addItem(recruiter, function itemAdded(error) {
            if (error) {
                return reply(Boom.badRequest('An error occured while adding recruiter record,try again'))
            }
            else { reply(recruiter); }
        });
    },
    updaterRecruiter: function (request, reply) {
        var self = this;
        var recruiter = {
            PartitionKey: self.azureTable.partitionKey
            , RowKey: request.params.recruiterID
            , companyName: request.payload.companyName
            , recruiterType: request.payload.recruiterType  //Employer,Agent
            , companyAddress: request.payload.companyAddress
            , companyTel: request.payload.companyTel
            , email: request.payload.email
            , fax: request.payload.fax
            , locationCountry: request.payload.locationCountry
            , locationTown: request.payload.locationTown
            , logoID: request.payload.logoID
        };
        self.azureTable.updateItem(recruiter, function itemUpdated(error) {
            if (error) {
                return reply(Boom.badRequest('An error occured while updating recruiter record,try again'))
            }
            else { reply({ message: "Recruiter updated successfully" }); }
        });
    },
    deleteRecruiter: function (request, reply) {
        var self = this;
        self.azureTable.deleteItem(request.params.recruiterID, function itemDeleted(error) {
            if (error) {
                return reply(Boom.badRequest('An error occured while deleting recruiter record,try again'))
            }
            else { reply({ message: "Recruiter deleted successfully" }) }
        });
    }
}