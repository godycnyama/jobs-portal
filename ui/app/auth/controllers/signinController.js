"use strict";

var signinModule = angular.module('signinModule', []);

signinModule.controller('SigninController', ['$scope', '$state', '$uibModal', '$uibModalStack', '$timeout', 'Restangular', 'store', 'Auth', 'ModalService', function ($scope, $state, $uibModal, $uibModalStack, $timeout, Restangular, store, Auth, ModalService) {
    $scope.signin = {};
    $scope.signin.email = null;
    $scope.signin.password = null;
    $scope.logIn = function () {
        ModalService.SetTitle('Sign In')
        ModalService.SetMessage('Signing in,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //post  to /users/signIn
        var Users = Restangular.all('api/signIn');
        Users.post($scope.signin).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                store.set('id_token', response.data.id_token);
                store.set('userEmail', response.data.userEmail);
                store.set('userID', response.data.userID);
                store.set('passwordTemporary', response.data.passwordTemporary);
                store.set('passwordTemporaryTTL', response.data.passwordTemporaryTTL);
                store.set('role', response.data.role);
                store.set('loggedIn',true);
                ModalService.SetMessage(response.data.message);
                ModalService.SetTitle('Sign In');
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/modals/messageModal.html',
                    controller: 'ModalController'
                });
                modalInstance.result.then(function () {
                    switch (response.data.role) {
                        case 'jobseeker':
                            $state.go('jobs.master');
                            break;
                        case 'recruiter':
                            $state.go('recruiter.Master');
                            break;
                        case 'advertiser':
                            break;
                        case 'admin':
                            $state.go('admin.Master');
                            break;
                    }

                });
            }          
        })
    }

}])