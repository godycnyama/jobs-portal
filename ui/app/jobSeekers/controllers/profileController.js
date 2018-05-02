"use strict";

var profileModule = angular.module('profileModule', ['jobSeekerServiceModule']);

profileModule.controller('ProfileController', ['$scope', '$state', '$stateParams', '$rootScope', 'JobSeekerService', 'ModalService', 'Restangular', '$uibModal', '$uibModalStack', 'Auth', '$timeout', 'FileSaver', 'Blob', '$http', 'Upload', 'Notification', function ($scope, $state, $stateParams, $rootScope, JobSeekerService, ModalService, Restangular, $uibModal, $uibModalStack, Auth, $timeout, FileSaver, Blob, $http, Upload, Notification) {
    $scope.jobSeeker = JobSeekerService.GetJobSeeker();
    $scope.message = '';
    $scope.cvFile = null;
    /*
    $rootScope.$on('$viewContentLoaded', function () {
        $scope.getProfile();
    });
    console.log(profile);
    /*
    console.log(profile);
    $scope.jobSeeker = profile.data.jobSeeker;
    $scope.cvs = profile.data.cvs;
    $scope.attachments = profile.data.attachments;
    JobSeekerService.SetJobSeeker(profile.data.jobSeeker);
    /*
    if (profile.data.error) {
        ModalService.SetMessage(profile.data.message);
        ModalService.SetTitle('Load Profile');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/messageModal.html',
            controller: 'ModalController'
        });
    } else {
        $scope.jobSeeker = profile.jobSeeker;
        $scope.cvs = profile.cvs;
        $scope.attachments = profile.attachments;
        JobSeekerService.SetJobSeeker(profile.jobSeeker);
    };
    */
    $scope.getProfile = function () {
            ModalService.SetTitle('Load Profile');
            ModalService.SetMessage('Loading profile,please wait!');
            var modalInstance = $uibModal.open({
                templateUrl: 'app/modals/modal.html',
                controller: 'ModalController'
            });
            var jobSeeker = Restangular.one('api/jobSeekers', Auth.GetUserEmail());
            jobSeeker.get().then(function (response) {
                if (response.data) {
                    $uibModalStack.dismissAll();
                    $scope.jobSeeker = response.data.jobSeeker;
                    JobSeekerService.SetJobSeeker(response.data.jobSeeker);
                };
            })
             
    }
    $scope.editPersonalDetail = function () {
        $state.go('profile.personalEdit');
    };
    $scope.createQualification = function () {
        $state.go('profile.qualificationCreate');
    };
    $scope.editQualification = function (_qualification) {
        console.log(_qualification._id);
        JobSeekerService.SetQualificationForEdit(_qualification);
        $state.go('profile.qualificationEdit');

    };
    $scope.deleteQualification = function (_qualification) {
       
        ModalService.SetMessage('Are you sure you want to delete qualification?');
        ModalService.SetTitle('Delete Qualification');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/messageModal.html',
            controller: 'ModalController'
        });
        modalInstance.result.then(function () {
            $uibModalStack.dismissAll();
            ModalService.SetTitle('Delete Qualification');
            ModalService.SetMessage('Deleting qualification,please wait!');
            var modalInstance = $uibModal.open({
                templateUrl: 'app/modals/modal.html',
                controller: 'ModalController'
            });
            //Delete  /jobSeekers/{email}/qualifications/{qualificationID}
            var Qualification = Restangular.one('api/jobSeekers', Auth.GetUserEmail()).one('qualifications', _qualification._id);
            Qualification.customDELETE().then(function (response) {
                if (response.data) {
                    $scope.jobSeeker = response.data.jobSeeker;
                    $uibModalStack.dismissAll();
                    Notification.success({ message: response.data.message, title: 'Delete Qualification' });          
                }

            })        
        });        
    };
    $scope.editSkill = function (_skill) {
        console.log(_skill);
        //$rootScope.skill = _skill.isCurrent;
        //console.log($rootScope.skill);
        $rootScope.skill = _skill;
        console.log($rootScope.skill);

        /*
        for (var i = 0; i < $scope.jobSeeker.skills.length; i++) {
            if (i === index) {
                console.log($scope.jobSeeker.skills[i]);
                JobSeekerService.SetSkillForEdit($scope.jobSeeker.skills[i]);
            }
        }
        */
        $state.go('profile.skillEdit');
    };
    $scope.deleteSkill = function (_skill) {
        ModalService.SetMessage('Are you sure you want to delete skill?');
        ModalService.SetTitle('Delete Skill');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/messageModal.html',
            controller: 'ModalController'
        });
        modalInstance.result.then(function () {
            $uibModalStack.dismissAll();
            ModalService.SetMessage('Deleting skill,please wait!');
            var modalInstance = $uibModal.open({
                templateUrl: 'app/modals/modal.html',
                controller: 'ModalController'
            });
            //delete /jobSeekers/{email}/skills/{skillID}
            var Skill = Restangular.one('api/jobSeekers', Auth.GetUserEmail()).one('skills', _skill._id);
            Skill.customDELETE().then(function (response) {
                if (response.data) {
                    $scope.jobSeeker = response.data.jobSeeker;
                    $uibModalStack.dismissAll();
                    Notification.success({ message: response.data.message, title: 'Delete Skill' });
                }

            })
        });
    };
    $scope.editEmployment = function (_employment) {
        JobSeekerService.SetEmploymentForEdit(_employment);
        $state.go('profile.employmentEdit');
    };
    $scope.deleteEmployment = function (_employment) {
        ModalService.SetMessage('Are you sure you want to delete employment record?');
        ModalService.SetTitle('Delete Employment Record');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/messageModal.html',
            controller: 'ModalController'
        });
        modalInstance.result.then(function () {
            $uibModalStack.dismissAll();
            ModalService.SetMessage('Deleting employment record ,please wait!');
            var modalInstance = $uibModal.open({
                templateUrl: 'app/modals/modal.html',
                controller: 'ModalController'
            });
            //Delete  /jobSeekers/{email}/employment/{employmentID}
            var Employment = Restangular.one('api/jobSeekers', Auth.GetUserEmail()).one('employment', _employment._id);
            Employment.customDELETE().then(function (response) {
                if (response.data) {
                    $scope.jobSeeker = response.data.jobSeeker;
                    $uibModalStack.dismissAll(); // close modal
                    Notification.success({ message: response.data.message, title: 'Delete Employment Record' });
                }

            })
        });
    };
    $scope.editLanguage = function (_language) {
        JobSeekerService.SetLanguageForEdit(_language);
        $state.go('profile.languageEdit');
    };
    $scope.deleteLanguage = function (_language) {
        ModalService.SetMessage('Are you sure you want to delete language ' + _language.languageName + '?');
        ModalService.SetTitle('Delete Language');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/messageModal.html',
            controller: 'ModalController'
        });
        modalInstance.result.then(function () {
            $uibModalStack.dismissAll();
            ModalService.SetMessage('Deleting language ' + _language.languageName + ',please wait!');
            var modalInstance = $uibModal.open({
                templateUrl: 'app/modals/modal.html',
                controller: 'ModalController'
            });
            //Delete  /jobSeekers/{email}/qualifications/{languageID}
            var Language = Restangular.one('api/jobSeekers', Auth.GetUserEmail()).one('languages', _language._id);
            Language.customDELETE().then(function (response) {
                if (response.data) {
                    $scope.jobSeeker = response.data.jobSeeker;
                    $uibModalStack.dismissAll(); // close modal      
                    Notification.success({ message: response.data.message, title: 'Delete Language' });          
                }

            })
        });
    };
    
    $scope.editReferee = function (_referee) {
        JobSeekerService.SetRefereeForEdit(_referee);
        $state.go('profile.refereeEdit');
    };
    $scope.deleteReferee = function (_referee) {
        ModalService.SetMessage('Are you sure you want to delete referee ' + _referee.fullName + '?');
        ModalService.SetTitle('Delete Referee');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/messageModal.html',
            controller: 'ModalController'
        });
        modalInstance.result.then(function () {
            $uibModalStack.dismissAll();
            ModalService.SetMessage('Deleting referee ' + _referee.fullName + ',please wait!');
            var modalInstance = $uibModal.open({
                templateUrl: 'app/modals/modal.html',
                controller: 'ModalController'
            });
            //Delete  /jobSeekers/{email}/qualifications/{languageID}
            var Referee = Restangular.one('api/jobSeekers', Auth.GetUserEmail()).one('referees', _referee._id);
            Referee.customDELETE().then(function (response) {
                if (response.data) {
                    $scope.jobSeeker = response.data.jobSeeker;
                    $uibModalStack.dismissAll(); // close modal
                    Notification.success({ message: response.data.message, title: 'Delete Referee' });
                }

            })
        });
    };

    $scope.uploadCV = function () {
        if (!$scope.cvFile) {
            $scope.message = 'File Empty';
            return
            //$scope.upload();
        }
    };
    $scope.upload = function () {
        ModalService.SetTitle('Upload CV')
        ModalService.SetMessage('Uploading CV,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        Upload.upload({
            url: window.location.origin + '/api/jobSeekers/uploadCV',
            data: {
                file: $scope.cvFile,
                userEmail: Auth.GetUserEmail()
            }
        }).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                $scope.jobSeeker = response.data.jobSeeker;
                Notification.success({ message: response.data.message, title: 'Upload CV' });
            };
        }
      );
    };
    
    $scope.viewCV = function () {
        var cv = Restangular.one('/api/cvs/getCV', $scope.jobSeeker.cv.fileID).withHttpConfig({ responseType: 'arraybuffer' });
        cv.get().then(function (response) {
            if (response.data) {
                var fileName = $scope.jobSeeker.cv.fileName;
                var a = document.createElement('a');
                document.body.appendChild(a);
                a.style = 'display: none';
                var fileURL = (window.URL || window.webkitURL).createObjectURL(new Blob([response.data], { type: $scope.jobSeeker.cv.content_type }));
                a.href = fileURL;
                a.download = fileName;
                a.click();
                (window.URL || window.webkitURL).revokeObjectURL(file);
            }
            
        })
    };
    
    $scope.deleteCV = function () {
        ModalService.SetTitle('Delete CV')
        ModalService.SetMessage('Are you sure you want to delete CV ' + $scope.jobSeeker.cv.fileName + '?');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/messageModal.html',
            controller: 'ModalController'
        });
        modalInstance.result.then(function () {
            $uibModalStack.dismissAll();
            ModalService.SetTitle('Delete CV')
            ModalService.SetMessage('Deleting CV ' + $scope.jobSeeker.cv.fileName + ',please wait!');
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/modals/modal.html',
                    controller: 'ModalController'
                });
            
            
                var cvs = Restangular.one('api/jobSeekers/deleteCV');
                var query = {
                    fileID: $scope.jobSeeker.cv.fileID,
                    email: $scope.jobSeeker.email
                }
            cvs.customDELETE('',query).then(function (response) {
                if (response.data) {
                    $uibModalStack.dismissAll();
                    $scope.jobSeeker = response.data.jobSeeker;  
                    Notification.success({ message: response.data.message, title: 'Delete CV' });
                }
            })
        });
    };
   
    $scope.viewAttachment = function (_attachment) {
        var attachment = Restangular.one('/api/attachments', _attachment.fileID).withHttpConfig({ responseType: 'arraybuffer' });
        attachment.get().then(function (response) {
            if (response) {
                var fileName = _cv.fileName;
                var a = document.createElement('a');
                document.body.appendChild(a);
                a.style = 'display: none';
                var fileURL = (window.URL || window.webkitURL).createObjectURL(new Blob([response], { type: _cv.content_type }));
                a.href = fileURL;
                a.download = fileName;
                a.click();
                (window.URL || window.webkitURL).revokeObjectURL(file);
            }

        })
    };
    $scope.deleteAttachment = function (_attachment) {
        ModalService.SetTitle('Delete Attachment')
        ModalService.SetMessage('Are you sure you want to delete attachment ' + _attachment.filename + '?');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/messageModal.html',
            controller: 'ModalController'
        });
        modalInstance.result.then(function () {
            $uibModalStack.dismissAll();
            ModalService.SetTitle('Delete Attachment')
            ModalService.SetMessage('Deleting attachment ' + _attachment.filename + ',please wait!');
            var modalInstance = $uibModal.open({
                templateUrl: 'app/modals/modal.html',
                controller: 'ModalController'
            });
            
            var attachments = Restangular.one('api/jobSeekers/deleteAttachment', _attachment._id);
            attachments.customDELETE().then(function (response) {
                if (response.data) {
                    $uibModalStack.dismissAll();
                    ModalService.SetMessage(response.data.message);
                    ModalService.SetTitle('Delete Attachment');
                    var modalInstance = $uibModal.open({
                        templateUrl: 'app/modals/messageModal.html',
                        controller: 'ModalController'
                    });
                    for (var i = 0; i < $scope.jobSeeker.attachments.length; i++) {
                        if ($scope.jobSeeker.attachments[i] === _attachment._id) {
                            return $scope.jobSeeker.attachments.splice(i, 1);
                        }
                    }
                }
            })
        });
    };
    
    
    var arrayBufferToString = function (buff) {
        var charCodeArray = Array.apply(null, new Uint8Array(buff));
        var result = '';
        for (i = 0, len = charCodeArray.length; i < len; i++) {
            code = charCodeArray[i];
            result += String.fromCharCode(code);
        }
        result;
    };

    $scope.downloadCV = function () {
        var url = window.location.origin + '/api/cvs/getCV/' + $scope.jobSeeker.cv.fileID;
        $http.get(url, { cache: false, responseType: 'arraybuffer' }).then(function (response) {
            var blob = new Blob([response.data], { type: $scope.jobSeeker.cv.content_type });
            FileSaver.saveAs(blob, $scope.jobSeeker.cv.fileName);
        });
    };

    $scope.downloadAttachment = function (_attachment) {
        var url = window.location.origin + '/api/attachments/getAttachment/' + _attachment._id
        $http.get(url, { cache: false }).then(function (response) {
            var blob = new Blob([response.data], { type: _attachment.contentType });
            FileSaver.saveAs(blob, _attachment.filename);
        });
    };

}])

