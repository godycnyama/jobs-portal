"use strict";

var jobSeekerServiceModule = angular.module('jobSeekerServiceModule', []);
jobSeekerServiceModule.factory('JobSeekerService', ['$http', '$stateParams', function ($http, $stateParams) {
    var jobSeeker = {};
    
    var qualification = {};
    var skill = {};
    var employment = {};
    var language = {};
    var referee = {};
    var cvs = [];
    var attachments = [];
    var jobSeekers = [];  
    return {
        SetJobSeeker: function (_jobSeeker) {
            jobSeeker = _jobSeeker;
            return;
        },
        GetJobSeeker: function () {
            return jobSeeker;
        },
        SetQualificationForEdit: function (_qualification) {
            qualification = _qualification;
            return 
        },
        GetQualificationForEdit: function () {
            return qualification;
        },
        //edit Qualification
        SetSkillForEdit: function (_skill) {
            skill = _skill;
            return 
        },
        //edit skill
        GetSkillForEdit: function () {
            //return skill;
            for (var i = 0; i < jobSeeker.skills.length; i++) {
                if (jobSeeker.skills[i]._id == $stateParams.skillID) {
                    console.log(jobSeeker.skills[i]);
                    return jobSeeker.skills[i];
                }
            };
        },
        SetEmploymentForEdit: function (_employment) {
            employment = _employment;
            return 
        },
        //edit employment
        GetEmploymentForEdit: function () {
            return employment;
        },
        SetLanguageForEdit: function (_language) {
            language = _language;
            return
        },
        //edit language
        GetLanguageForEdit: function () {
            return language;
        },
        SetRefereeForEdit: function (_referee) {
            referee = _referee;
            return
        },
        //edit language
        GetRefereeForEdit: function () {
            return referee;
        },
        SetCV: function (_cv) {
            cvs.push(_cv);
            return
        },
        GetCVs: function () {
            return cvs;
        },
        SetAttachment: function (_attachment) {
            attachments.push(_attachment);
            return
        },
        GetAttachments: function () {
            return attachments;
        }
    }
}]);