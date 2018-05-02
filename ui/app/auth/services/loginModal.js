var loginModalModule = angular.module('loginModalModule', []);
loginModalModule.service('loginModalService', ['$uibModal', 'Auth','store', function ($uibModal, Auth, store) {

    function setToken(response) {
        return response.data.id_token;
    }

    return function () {
        var instance = $uibModal.open({
            templateUrl: 'app/auth/views/loginModal.html',
            controller: 'LoginModalController',
        });

        return instance.result.then(setToken);
    };

}]);

loginModalModule.controller('LoginModalController', ['$scope', '$rootScope', '$state', '$uibModal', '$uibModalStack', '$uibModalInstance', '$timeout', 'Restangular', 'store', 'Auth', 'ModalService', 'Notification', function ($scope, $rootScope, $state, $uibModal, $uibModalStack, $uibModalInstance, $timeout, Restangular, store, Auth, ModalService, Notification) {
    $scope.signin = {};
    $scope.signin.email = null;
    $scope.signin.password = null;
    $scope.isSignIn = true;
    $scope.isAnimation = false;
    $scope.isMessage = false;
    $scope.message = "";
    $scope.ok = function () {
        $scope.logIn();
        /*
        switch (result) {
            case 'forgot_password':
                $scope.message = 'forgot_password';
                console.log($scope.message);
                $state.go('auth.resetPassword');              
                $uibModalInstance.dismiss();
                break;
            case 'change_password':
                $scope.message = 'change_password';
                console.log($scope.message);
                $state.go('auth.changePassword');            
                $uibModalInstance.dismiss();
                break;
            case'signin':
                $scope.logIn();
                break;
        }
        */
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };
    $scope.logIn = function () {
        $scope.isSignIn = false;
        $scope.isAnimation = true;
        $scope.message = 'Signing in,please wait!'
        //post  to /users/signIn
        var Users = Restangular.all('api/signIn');
        Users.post($scope.signin).then(function (response) {
            if (response.data) {
                store.set('id_token', response.data.id_token);
                store.set('userEmail', response.data.userEmail);
                store.set('userID', response.data.userID);
                store.set('passwordTemporary', response.data.passwordTemporary);
                store.set('passwordTemporaryTTL', response.data.passwordTemporaryTTL);
                store.set('role', response.data.role);
                store.set('loggedIn', true);
                $scope.message = response.data.message;
                $scope.isMessage = true;
                $scope.isAnimation = false;
                $rootScope.$broadcast('loggedin');
                $timeout(function () {
                }, 4000);
                $uibModalInstance.close(response);            
            }
        })
    }

}])