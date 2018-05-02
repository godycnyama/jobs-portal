var jobSeekerModalsModule = angular.module('jobSeekerModalsModule', []);

jobSeekerModalsModule.controller('QualificationDeleteController', ['$scope', '$uibModalInstance', 'AdminService', function ($scope, $uibModalInstance, AdminService) {
    $scope.message = '';
    $scope.delete = false;
    $scope.ok = function () {
        $scope.delete = true;
        $uibModalInstance.close($scope.delete);
        /*
        var qualification = Restangular.one('jobSeekers', username).one('qualifications', _qualification._id);
        qualification.remove().then(function () {
            $scope.messages = 'Qualification successfully deleted';
        }, function () {
            $scope.messages = 'An error occured while deleting qualification';
        })
        */
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);

jobSeekerModalsModule.controller('EmploymentDeleteController', ['$scope', '$uibModalInstance', 'AdminService', function ($scope, $uibModalInstance, AdminService) {
    $scope.message = '';
    $scope.delete = false;
    $scope.ok = function () {
        $scope.delete = true;
        $uibModalInstance.close($scope.delete);
        /*
        var qualification = Restangular.one('jobSeekers', username).one('qualifications', _qualification._id);
        qualification.remove().then(function () {
            $scope.messages = 'Qualification successfully deleted';
        }, function () {
            $scope.messages = 'An error occured while deleting qualification';
        })
        */
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);

jobSeekerModalsModule.controller('SkillDeleteController', ['$scope', '$uibModalInstance', 'AdminService', function ($scope, $uibModalInstance, AdminService) {
    $scope.message = '';
    $scope.delete = false;
    $scope.ok = function () {
        $scope.delete = true;
        $uibModalInstance.close($scope.delete);
        /*
        var qualification = Restangular.one('jobSeekers', username).one('qualifications', _qualification._id);
        qualification.remove().then(function () {
            $scope.messages = 'Qualification successfully deleted';
        }, function () {
            $scope.messages = 'An error occured while deleting qualification';
        })
        */
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);

jobSeekerModalsModule.controller('LanguageDeleteController', ['$scope', '$uibModalInstance', 'AdminService', function ($scope, $uibModalInstance, AdminService) {
    $scope.message = '';
    $scope.delete = false;
    $scope.ok = function () {
        $scope.delete = true;
        $uibModalInstance.close($scope.delete);
        /*
        var qualification = Restangular.one('jobSeekers', username).one('qualifications', _qualification._id);
        qualification.remove().then(function () {
            $scope.messages = 'Qualification successfully deleted';
        }, function () {
            $scope.messages = 'An error occured while deleting qualification';
        })
        */
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);

jobSeekerModalsModule.controller('CVdeleteController', ['$scope', '$uibModalInstance', 'AdminService', function ($scope, $uibModalInstance, AdminService) {
    $scope.message = '';
    $scope.delete = false;
    $scope.ok = function () {
        $scope.delete = true;
        $uibModalInstance.close($scope.delete);
        /*
        var qualification = Restangular.one('jobSeekers', username).one('qualifications', _qualification._id);
        qualification.remove().then(function () {
            $scope.messages = 'Qualification successfully deleted';
        }, function () {
            $scope.messages = 'An error occured while deleting qualification';
        })
        */
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);

jobSeekerModalsModule.controller('AttachmentDeleteController', ['$scope', '$uibModalInstance', 'AdminService', function ($scope, $uibModalInstance, AdminService) {
    $scope.message = '';
    $scope.delete = false;
    $scope.ok = function () {
        $scope.delete = true;
        $uibModalInstance.close($scope.delete);
        /*
        var qualification = Restangular.one('jobSeekers', username).one('qualifications', _qualification._id);
        qualification.remove().then(function () {
            $scope.messages = 'Qualification successfully deleted';
        }, function () {
            $scope.messages = 'An error occured while deleting qualification';
        })
        */
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}])