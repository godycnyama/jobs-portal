var passwordChangeModule = angular.module('passwordChangeModule', []);

passwordChangeModule.controller('PasswordChangeController', ['$scope', '$rootScope', '$uibModal', '$uibModalStack', '$timeout', 'Restangular', 'store', 'ModalService', function ($scope, $rootScope, $uibModal, $uibModalStack, $timeout, Restangular, store, ModalService) {
    $scope.changePassword = {};
    $scope.changePassword.email = '';
    $scope.changePassword.password = '';
    $scope.changePassword.newPassword = '';
    $scope.confirmNewPassword = '';
    $scope.change = function () {
        ModalService.SetTitle('Change Password')
        ModalService.SetMessage('Changing password,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //post  to /changePassword
        var Users = Restangular.all('api/changePassword');
        Users.post($scope.changePassword).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                store.set('id_token', response.data.id_token);
                store.set('userEmail', response.data.userEmail);
                store.set('userID', response.data.userID);
                store.set('passwordTemporary', response.data.passwordTemporary);
                store.set('passwordTemporaryTTL', response.data.passwordTemporaryTTL);
                store.set('role', response.data.role);               
                store.set('loggedIn', true);
                $rootScope.$broadcast('loggedin');
                ModalService.SetMessage(response.data.message);
                ModalService.SetTitle('Reset Password');
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/modals/messageModal.html',
                    controller: 'ModalController'
                });
                modalInstance.result.then(function () {
                    if (reponse.data.role === 'jobseeker') {
                        $state.go('jobs.master');
                    }
                    if (reponse.data.role === 'recruiter') {
                        $state.go('recruiters.Master');
                    }
                });           
            }           
        })
    }

}])