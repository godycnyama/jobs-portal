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
var jobAdController = new JobAdController(azureTable);

module.exports = jobAdController;
function JobAdController(azureTable) {
    this.azureTable = azureTable;

}

exports.getJobAds = {
    handler: function (request, reply) {        
        var query = azure.TableQuery
            .select()
            .from(self.azureTable.tableName)
            .where('PartitionKey eq ?', azureTable.partitionKey);
            azureTable.find(query, function itemsFound(error, items) {
           if (error) {
                return reply(Boom.badRequest('An error occured while searching for jobAds,try again'))
            }
            else { reply(items); }
        });
    }
};

exports.getJobAdByID = {
    validate: {
        payload: {
            jobAdID: Joi.string().required()            
        }
    },
    handler : function (request, reply) {        
        var query = azure.TableQuery
            .select()
            .from(azureTable.tableName)
            .where('RowKey eq ?', request.payload.jobAdID);
            azureTable.find(query, function itemsFound(error, items) {
            if (error) {
                return reply(Boom.badRequest('An error occured while searching for jobAd,try again'))
            }
            else { reply(items[0]); }
        });
    }
};

exports.insertJobAd = {
    validate: {
        payload: {
            jobAdID: Joi.string().required(),
            jobRef: Joi.string().required(),         
            jobTitle: Joi.string().required(),
            jobLevel: Joi.string().required(),
            jobType: Joi.string().required(),
            salaryCurrency: Joi.string().required(),
            salaryMinimum: Joi.string().required(),
            salaryMaximum: Joi.string().required(),
            disableSalary: Joi.string().required(),
            salaryFrequency: Joi.string().required(),
            renumerationType: Joi.string().required(),
            locationCountry: Joi.string().required(),
            locationTown: Joi.string().required(),
            recruiterName: Joi.string().required(),
            recruiterType: Joi.string().required(),  //e.g employer,agent
            datePosted: Joi.string().required(), 
            closingDate: Joi.string().required(), 
            applicationsLimit: Joi.string().required(),
            jobDescription: Joi.string().required(),
            jobRequirements: Joi.string().required(),
            isDisabled: Joi.string().required()            
        }
    },
    handler: function insertJobAd(request, reply) {        
        var jobAd = {
            PartitionKey : azureTable.partitionKey
            , RowKey : request.payload.jobAdID
            ,jobRef: request.payload.jobRef         
            ,jobTitle: request.payload.jobTitle
            ,jobLevel: request.payload.jobLevel
            ,jobType: request.payload.jobType
            ,salaryCurrency: request.payload.salaryCurrency
            ,salaryMinimum: request.payload.salaryMinimum
            ,salaryMaximum: request.payload.salaryMaximum
            ,disableSalary: request.payload.disable
            ,salaryFrequency: request.payload.salaryFrequency
            ,renumerationType: request.payload.renumerationType
            ,locationCountry: request.payload.locationCountry
            ,locationTown: request.payload.locationTown
            ,recruiterName: request.payload.recruiterName
            ,recruiterType: request.payload.recruiterType  //e.g employer,agent
            ,datePosted: new Date(request.payload.datePosted) 
            ,closingDate: new Date(request.payload.closingDate) 
            ,applicationsLimit: request.payload.applicationLimit
            ,jobDescription: request.payload.jobDescription
            ,jobRequirements: request.payload.jobRequirements
            ,isDisabled: Boolean(request.payload.isDisabled) 
            
        };
            azureTable.addItem(jobAd, function itemAdded(error) {
            if(error) {
                return reply(Boom.badRequest('An error occured while adding jobAd record,try again'))
            }
            else{ reply(jobAd);}
        });
    }
};

exports.updateJobAd = {
    validate: {
        payload: {
            jobAdID: Joi.string().required(),
            jobRef: Joi.string().required(),         
            jobTitle: Joi.string().required(),
            jobLevel: Joi.string().required(),
            jobType: Joi.string().required(),
            salaryCurrency: Joi.string().required(),
            salaryMinimum: Joi.string().required(),
            salaryMaximum: Joi.string().required(),
            disableSalary: Joi.string().required(),
            salaryFrequency: Joi.string().required(),
            renumerationType: Joi.string().required(),
            locationCountry: Joi.string().required(),
            locationTown: Joi.string().required(),
            recruiterName: Joi.string().required(),
            recruiterType: Joi.string().required(),  //e.g employer,agent
            datePosted: Joi.string().required(), 
            closingDate: Joi.string().required(), 
            applicationsLimit: Joi.string().required(),
            jobDescription: Joi.string().required(),
            jobRequirements: Joi.string().required(),
            isDisabled: Joi.string().required()            
        }
    },
    handler: function updateJobAd(request, reply) {        
        var jobAd = {
            PartitionKey : azureTable.partitionKey
            , RowKey: request.payload.jobAdID
            ,jobRef: request.payload.jobRef         
            ,jobTitle: request.payload.jobTitle
            ,jobLevel: request.payload.jobLevel
            ,jobType: request.payload.jobType
            ,salaryCurrency: request.payload.salaryCurrency
            ,salaryMinimum: request.payload.salaryMinimum
            ,salaryMaximum: request.payload.salaryMaximum
            ,disableSalary: request.payload.disable
            ,salaryFrequency: request.payload.salaryFrequency
            ,renumerationType: request.payload.renumerationType
            ,locationCountry: request.payload.locationCountry
            ,locationTown: request.payload.locationTown
            ,recruiterName: request.payload.recruiterName
            ,recruiterType: request.payload.recruiterType  //e.g employer,agent
            ,datePosted: new Date(request.payload.datePosted) 
            ,closingDate: new Date(request.payload.closingDate) 
            ,applicationsLimit: request.payload.applicationLimit
            ,jobDescription: request.payload.jobDescription
            ,jobRequirements: request.payload.jobRequirements
            ,isDisabled: Boolean(request.payload.isDisabled) 
        };
            azureTable.updateItem(jobAd, function itemUpdated(error) {
            if(error) {
                return reply(Boom.badRequest('An error occured while adding jobAd,try again'))
            }
            else{ reply({message:"JobAd"+jobAd.jobID+","+jobAd.jobAdName+"updated successfully"});}
        })
    }
};

exports.deleteJobAd = {
    validate: {
        payload: {
            jobAdID: Joi.string().required()            
        }
    },
    handler: function deleteBookmark(request, reply) {        
            azureTable.deleteItem(request.payload.jobAdID , function itemDeleted(error) {
            if(error) {
                return reply(Boom.badRequest('An error occured while deleting jobAd,try again'))
            }
            else{reply({ message : "JobAd deleted successfully"})}
        })
    }
}

