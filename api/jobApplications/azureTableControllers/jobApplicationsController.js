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
var jobApplicationController = new JobApplicationController(azureTable);

module.exports = jobApplicationController;

function JobApplicationController(azureTable) {
    this.azureTable = azureTable;
}
JobApplicationController.prototype = {
    getJobApplication: function (request, reply) {
        var self = this;
        var query = azure.TableQuery
            .select()
            .from(self.azureTable.tableName)
            .where('PartitionKey eq ?', self.azureTable.partitionKey);
        self.azureTable.find(query, function itemsFound(error, items) {                       
           if (error) {
                return reply(Boom.badRequest('An error occured while searching for job Applications,try again'))
            }
            else { reply(items); }
        });
    },
    getJobApplicationByID: function (request, reply) {
        var self = this;
        var query = azure.TableQuery
            .select()
            .from(self.azureTable.tableName)
            .where('RowKey eq ?', request.payload.applicationID);
        self.azureTable.find(query, function itemsFound(error, items) {
            if (error) {
                return reply(Boom.badRequest('An error occured while searching for job Applications,try again'))
            }
            else { reply(items[0]); }
        });
    },
    insertJobApplication: function (request, reply) {
        var self = this;
        var jobApplication = {
            PartitionKey : self.azureTable.partitionKey
            , RowKey : request.payload.applicationID                     
            ,jobAdID: request.payload.jobAdID
            ,jobName: request.payload.jobName
            ,recruiterID: request.payload.recruiterID
            ,coverNote: request.payload.coverNote            
            ,applicationDate : new Date(Date.UTC(request.payload.applicationDate)) 
            
        };
        self.azureTable.addItem(jobApplication, function itemAdded(error) {
            if(error) {
                return reply(Boom.badRequest('An error occured while adding job application record,try again'))
            }
            else{ reply(jobApplication);}
        });
    },
    updateJobApplication: function (request, reply) {
        var self = this;
        var jobApplication = {
            PartitionKey : self.azureTable.partitionKey
            , RowKey : request.payload.applicationID                     
            ,JobAdID: request.payload.jobAdID
            ,recruiterID: request.payload.recruiterID
            ,coverNote: request.payload.coverNote
            ,applicationDate : new Date(Date.UTC(request.payload.applicationDate)) 
        };
        self.azureTable.updateItem(jobApplication, function itemUpdated(error) {
            if(error) {
                return reply(Boom.badRequest('An error occured while adding jobApplication record,try again'))
            }
            else{ reply({message:"JobApplication"+jobApplication.jobID+","+jobAd.jobAdName+"updated successfully"});}
        });
    },
    deleteJobAd: function deleteBookmark(request, reply) {
        var self = this;
        self.azureTable.deleteItem(request.payload.applicationID, function itemDeleted(error) {
            if(error) {
                reply(error);
            }
            else{reply({ message : "JobAd deleted"})}
        });
    }
}