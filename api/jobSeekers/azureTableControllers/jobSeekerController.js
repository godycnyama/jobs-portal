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


exports.getJobSeekers = {
    handler: function (request, reply) {        
        var query = azure.TableQuery
            .select()
            .from(azureTable.tableName)
            .where('PartitionKey eq ?', azureTable.partitionKey);
            azureTable.find(query, function itemsFound(error, items) {
            if (error) {
                return reply(Boom.badRequest('An error occured while searching for jobSeekers record,try again'));
            }
            else { reply(items); }
        })
    }
}

exports.getJobSeekerByID = {
    validate: {
        payload: {
            jobSeekerID: Joi.string().required()            
        }
    },
    handler: function (request, reply) {       
        var query = azure.TableQuery
            .select()
            .from(azureTable.tableName)
            .where('RowKey eq ?', request.params.jobSeekerID);
            azureTable.find(query, function itemsFound(error, items) {
            if (error) {
                return reply(Boom.badRequest('An error occured while searching for jobSeeker record,try again'));
            }
            reply(items[0]);
        })
    }
}

exports.insertJobSeeker = {
    validate: {
        payload: {
            jobSeekerID: Joi.string().required(),
            firstName: Joi.string().required(),
            middleName: Joi.string().required(),
            lastName: Joi.string().required(),
            gender: Joi.string().required(),
            birthDate: Joi.string().required(),
            registrationBody: Joi.string().required(),
            registrationType: Joi.string().required(),
            registrationNumber: Joi.string().required(),
            id: Joi.string().required(),
            nationality: Joi.string().required(),
            hasWorkPermit: Joi.string().required(),
            email: Joi.string().required(),
            cell: Joi.string().required(),
            homeTel: Joi.string().required(),
            workTel: Joi.string().required(),
            website: Joi.string().required(),
            linkedIn: Joi.string().required(),
            address: Joi.string().required(),
            locationCountry: Joi.string().required(),
            locationTown: Joi.string().required(),
            minimumSalary: Joi.string().required(),
            maximumSalary: Joi.string().required(),
            disableSalary: Joi.string().required(),
            photoID: Joi.string().required(),
            coverNote: Joi.string().required()            
        }
    },
    handler: function (request, reply) {       
        var jobSeeker = {
            PartitionKey: azureTable.partitionKey
            , RowKey: request.payload.jobSeekerID
            , firstName: request.payload.firstName
            , middleName: request.payload.middleName
            , lastName: request.payload.lastName
            , gender: request.payload.gender
            , birthDate: new Date(request.payload.birthDate)
            , registrationBody: request.payload.registrationBody
            , registrationType: request.payload.registrationType
            , registrationNumber: request.payload.registrationNumber
            , id: request.payload.ID
            , nationality: request.payload.nationality
            , hasWorkPermit: new Boolean(request.payload.hasWorkPermit)
            , email: request.payload.email
            , cell: request.payload.cell
            , homeTel: request.payload.hometel
            , workTel: request.payload.workTel
            , website: request.payload.website
            , linkedIn: request.payload.linkedIn
            , address: request.payload.address
            , locationCountry: request.payload.locationCountry
            , locationTown: request.payload.LocationTown
            , minimumSalary: request.payload.minimumSalary
            , maximumSalary: request.payload.maximumSalary
            , disableSalary: new Boolean(request.payload.disableSalary)
            , photoID: request.payload.photoID
            , coverNote: requestNote.payload.cover
        };
            azureTable.addItem(jobSeeker, function itemAdded(error) {
            if (error) {
                return reply(Boom.badRequest('An error occured while adding jobSeeker record,try again'));
            }
            else { reply({ message: "JobSeeker record added successfully" }); }
        })
    }
}

exports.updateJobSeeker = {
    validate: {
        payload: {
            jobSeekerID: Joi.string().required(),
            firstName: Joi.string().required(),
            middleName: Joi.string().required(),
            lastName: Joi.string().required(),
            gender: Joi.string().required(),
            birthDate: Joi.string().required(),
            registrationBody: Joi.string().required(),
            registrationType: Joi.string().required(),
            registrationNumber: Joi.string().required(),
            id: Joi.string().required(),
            nationality: Joi.string().required(),
            hasWorkPermit: Joi.string().required(),
            email: Joi.string().required(),
            cell: Joi.string().required(),
            homeTel: Joi.string().required(),
            workTel: Joi.string().required(),
            website: Joi.string().required(),
            linkedIn: Joi.string().required(),
            address: Joi.string().required(),
            locationCountry: Joi.string().required(),
            locationTown: Joi.string().required(),
            minimumSalary: Joi.string().required(),
            maximumSalary: Joi.string().required(),
            disableSalary: Joi.string().required(),
            photoID: Joi.string().required(),
            coverNote: Joi.string().required()            
        }
    },
    handler: function (request, reply) {       
        var jobSeeker = {
            PartitionKey: azureTable.partitionKey
            , RowKey: request.payload.jobSeekerID
            , firstName: request.payload.firstName
            , middleName: request.payload.middleName
            , lastName: request.payload.lastName
            , gender: request.payload.gender
            , birthDate: new Date(request.payload.birthDate)
            , registrationBody: request.payload.registrationBody
            , registrationType: request.payload.registrationType
            , registrationNumber: request.payload.registrationNumber
            , id: request.payload.ID
            , nationality: request.payload.nationality
            , hasWorkPermit: new Boolean(request.payload.hasWorkPermit)
            , email: request.payload.email
            , cell: request.payload.cell
            , homeTel: request.payload.hometel
            , workTel: request.payload.workTel
            , website: request.payload.website
            , linkedIn: request.payload.linkedIn
            , address: request.payload.address
            , locationCountry: request.payload.locationCountry
            , locationTown: request.payload.LocationTown
            , minimumSalary: request.payload.minimumSalary
            , maximumSalary: request.payload.maximumSalary
            , disableSalary: new Boolean(request.payload.disableSalary)
            , photoID: request.payload.photoID
            , coverNote: request.payload.coverNote
        };
            azureTable.updateItem(jobSeeker, function itemUpdated(error) {
            if (error) {
                return reply(Boom.badRequest('An error occured while updating jobSeeker record,try again'));
            }
            else { reply({ message: "JobSeeker updated successfully" }); }
        });
    }
};

exports.deleteJobSeeker = {
    validate: {
        payload: {
            jobSeekerID: Joi.string().required()            
        }
    },
    handler: function (request, reply) {        
            azureTable.deleteItem(request.payload.jobSeekerID, function itemDeleted(error) {
            if (error) {
                return reply(Boom.badRequest('An error occured while deleting jobSeeker record,try again'));
            }
            else { reply({ message: "JobSeeker deleted" }) }
        });
    }
}
