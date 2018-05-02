var passwordResetModule = angular.module('passwordResetModule', []);

passwordResetModule.controller('PasswordResetController', ['$scope', '$uibModal', '$uibModalStack', '$timeout', 'Restangular', 'Auth', 'ModalService', function ($scope, $uibModal, $uibModalStack, $timeout, Restangular, Auth, ModalService) {
    $scope.passwordReset = {};
    $scope.passwordReset.email = null;
    $scope.resetPassword = function () {
        ModalService.SetTitle('Reset Password')
        ModalService.SetMessage('Resetting password,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //post  to /users/resetPassword
        var Users = Restangular.all('api/resetPassword');
        Users.post($scope.passwordReset).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                ModalService.SetMessage(response.data.message);
                ModalService.SetTitle('Reset Password');
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/modals/messageModal.html',
                    controller: 'ModalController'
                });
                modalInstance.result.then(function () {
                    $state.go('auth.signin');
                });
            }           
        })
    }

}])

passwordResetModule.controller('PasswordResetWithQuestionController', ['$scope', '$uibModal', '$uibModalStack', '$timeout', 'Restangular', 'Auth', 'ModalService', function ($scope, $uibModal, $uibModalStack, $timeout, Restangular, Auth, ModalService) {
    $scope.resetPassword = {};
    $scope.resetPassword.username = '';
    $scope.resetPassword.newPassword = '';
    $scope.securityQuestionOptions = ['What is the name of your first grade teacher?', 'What is the name of your first school?', 'What is your dream job?', 'What was your first car?', 'What is the maiden name of your mother?', 'What was your favourate place to visit as a child?', 'Where did you meet your spouse?'];
    $scope.resetPassword.securityQuestion = '';
    $scope.resetPassword.securityQuestionAnswer = '';
    $scope.confirmNewPassword = '';
    
    $scope.reset = function () {
        ModalService.SetTitle('Reset Password')
        ModalService.SetMessage('Resetting password,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //post  to /api/auth/resetPasswordWithQuestion
        var Users = Restangular.all('api/auth/resetPasswordWithQuestion');
        Users.post($scope.resetPassword).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                ModalService.SetMessage(response.data.message);
                ModalService.SetTitle('Reset Password');
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/modals/messageModal.html',
                    controller: 'ModalController'
                });
            }
        })
    }

}])