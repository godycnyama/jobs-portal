var candidateModule = angular.module('candidateModule', []);

candidateModule.controller('CandidateController', ['$scope', '$state', '$uibModal', '$uibModalStack', '$stateParams', '$http', 'CandidatesService', 'Notification', 'FileSaver', 'Blob', 'Auth', 'ModalService', 'Restangular', function ($scope, $state, $uibModal, $uibModalStack, $stateParams, $http, CandidatesService, Notification, FileSaver, Blob, Auth, ModalService, Restangular) {
    $scope.candidate = CandidatesService.GetCandidate();
    $scope.back = function () {
        window.history.back();
    };
    $scope.printView = function () {
        $state.go('recruiter.candidateProfilePrint');
    };
    $scope.addCV = function () {
        ModalService.SetTitle('Add CV')
        ModalService.SetMessage('Adding CV,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        var recruiterUserID = Auth.GetUserID();
        //post to '/api/recruiters/{recruiterID}/cvs'
        var Resumes = Restangular.all('/api/resumes');
        var resume = {
            recruiterUserID: recruiterUserID,
            candidateID: $scope.candidate._id,
            mainQualification: $scope.candidate.mainQualification,
            profession: $scope.candidate.profession,
            preferredJobTitles: $scope.candidate.preferredJobTitles
        }
        Resumes.post(resume).then(function (response) {
            if (!response.data.error) {
                $uibModalStack.dismissAll();
                Notification.success({ message: response.data.message, title: 'Add CV' });
            };
        })
    };
    $scope.downloadCV = function () {
        var url = window.location.origin + '/api/cvs/getCV/' + $scope.candidate.cv.fileID;
        $http.get(url, { cache: false, responseType: 'arraybuffer' }).then(function (response) {
            var blob = new Blob([response.data], { type: $scope.candidate.cv.content_type });
            FileSaver.saveAs(blob, $scope.candidate.cv.fileName);
        });
    };
}])

candidateModule.controller('MyCandidateController', ['$scope', '$state', '$uibModal', '$uibModalStack', '$stateParams', '$http', 'MyCandidatesService', 'Notification', 'FileSaver', 'Blob', 'Auth', 'ModalService', 'Restangular', function ($scope, $state, $uibModal, $uibModalStack, $stateParams, $http, MyCandidatesService, Notification, FileSaver, Blob, Auth, ModalService, Restangular) {
    $scope.candidate = MyCandidatesService.GetCandidate();
    $scope.back = function () {
        window.history.back();
    };
    $scope.printView = function () {
        $state.go('recruiter.myCandidateProfilePrint');
    };
    $scope.deleteCV = function (_cv) {
        ModalService.SetTitle('Delete CV')
        ModalService.SetMessage('Are you sure you want to delete CV from your bucket?');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/messageModal.html',
            controller: 'ModalController'
        });
        modalInstance.result.then(function () {
            $uibModalStack.dismissAll();
            ModalService.SetTitle('Delete CV')
            ModalService.SetMessage('Deleting CV,please wait!');
            var modalInstance0 = $uibModal.open({
                templateUrl: 'app/modals/modal.html',
                controller: 'ModalController'
            });

            var recruiterUserID = Auth.GetUserID();
            var query = {
                recruiterUserID: Auth.GetUserID(),
                resumeID: $scope.candidate._id
            }
            var Resumes = Restangular.all('api/resumes/recruiterDelete')
            Resumes.customDELETE('', query).then(function (response) {
                if (response) {
                    $uibModalStack.dismissAll();
                    MyCandidatesService.SetCandidates($scope.candidates);
                    Notification.success({ message: response.data.message, title: 'Delete CV' });
                }
            })
        });
    };
    $scope.downloadCV = function () {
        var url = window.location.origin + '/api/cvs/getCV/' + $scope.candidate.cv.fileID;
        $http.get(url, { cache: false, responseType: 'arraybuffer' }).then(function (response) {
            var blob = new Blob([response.data], { type: $scope.candidate.cv.content_type });
            FileSaver.saveAs(blob, $scope.candidate.cv.fileName);
        });
    };
}])