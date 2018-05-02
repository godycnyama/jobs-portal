var refereeModule = angular.module('refereeModule',[]);

refereeModule.controller('RefereeController', ['$scope', '$stateParams', '$uibModal', '$uibModalStack', '$timeout', 'Restangular', 'JobSeekerService', 'ModalService', 'Auth', 'Notification', function ($scope, $stateParams, $uibModal, $uibModalStack, $timeout, Restangular, JobSeekerService, ModalService, Auth, Notification) {
    
    $scope.referee = $scope.iniReferee;
    $scope.back = function () {
        window.history.back();
    };
    $scope.createReferee = function () {
        ModalService.SetTitle('Add Referee')
        ModalService.SetMessage('Adding referee,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //post  to /jobSeekers/{email}/languages
        var Referees = Restangular.one('api/jobSeekers', Auth.GetUserEmail()).all('referees');
        Referees.post($scope.referee).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                JobSeekerService.SetJobSeeker(response.data.jobSeeker);             
                Notification.success({ message: response.data.message, title: 'Add Referee' });
                window.history.back();
            }

        })
    };
    
    $scope.iniReferee = {
        email: Auth.GetUserEmail(),
        fullName: null,
        title: null,
        organisationName: null,
        tel: null,
        cell: null,
        refereeEmail: null
    };
}]);

refereeModule.controller('RefereeEditController', ['$scope', '$stateParams', '$uibModal', '$uibModalStack', '$timeout', 'Restangular', 'JobSeekerService', 'ModalService', 'Auth', 'Notification', function ($scope, $stateParams, $uibModal, $uibModalStack, $timeout, Restangular, JobSeekerService, ModalService, Auth, Notification) {
   
    $scope.referee = JobSeekerService.GetRefereeForEdit();
    $scope.back = function () {
        window.history.back();
    };
    
    $scope.updateReferee = function () {
        var referee = {
            fullName: $scope.referee.fullName,
            title: $scope.referee.title,
            organisationName: $scope.referee.organisationName,
            tel: $scope.referee.tel,
            cell: $scope.referee.cell,
            refereeEmail: $scope.referee.refereeEmail
        };
        ModalService.SetTitle('Update Referee')
        ModalService.SetMessage('Updating referee,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });

        var Referee = Restangular.one('api/jobSeekers', Auth.GetUserEmail()).one('referees', $scope.referee._id);
        Referee.customPUT(referee).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                JobSeekerService.SetJobSeeker(response.data.jobSeeker);
                Notification.success({ message: response.data.message, title: 'Update Referee' });
                window.history.back();
            }

        })
    };

    $scope.deleteReferee = function () {
        ModalService.SetTitle('Delete Referee')
        ModalService.SetMessage('Deleting referee,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        
        var Referee = Restangular.one('api/jobSeekers', Auth.GetUserEmail()).all('referees');
        Referee.customDELETE('',{refereeID: $scope.referee._id}).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                JobSeekerService.SetJobSeeker(response.data.jobSeeker);
                Notification.success({ message: response.data.message, title: 'Delete Referee' });
                window.history.back();
            }
        })
    };
}])