var recruiterDetailsModule = angular.module('recruiterDetailsModule', []);

recruiterDetailsModule.controller('RecruiterDetailsCreateController', ['$scope', '$uibModal', '$uibModalStack', '$timeout', 'Restangular', 'Upload', 'ModalService', 'RecruiterService', 'Auth', 'Notification', function ($scope, $uibModal, $uibModalStack, $timeout, Restangular, Upload, ModalService, RecruiterService, Auth, Notification) {
    $scope.recruiterDetails = {};
    $scope.recruiterDetails.userID = Auth.GetUserID();
    $scope.mode = "";
    $scope.recruiterDetails.email = null;
    $scope.recruiterDetails.companyName = null;
    $scope.recruiterTypeOptions = ['Employer', 'Agent']
    $scope.recruiterDetails.recruiterType = null;
    $scope.recruiterDetails.introduction = null;
    $scope.recruiterDetails.contactPerson = null;
    $scope.recruiterDetails.physicalAddress = null;
    $scope.recruiterDetails.postalAddress = null;
    $scope.recruiterDetails.tel = null;
    $scope.recruiterDetails.mobile = null;
    $scope.recruiterDetails.fax = null;
    $scope.recruiterDetails.website = null;
    $scope.companyLogoFile = '';
    $scope.recruiterDetails.companyLogo = '';
    /*
    $scope.currentFile = '';
    $scope.setFile = function (element) {
        $scope.currentFile = element.files[0];
        var reader = new FileReader();
        reader.onload = function (event) {
            $scope.recruiterDetails.companyLogo = event.target.result
            $scope.$apply()
        }
        // when the file is read it triggers the onload event above.
        reader.readAsDataURL(element.files[0]);
    };
    */
    $scope.$watch('companyLogoFile', function (newValue, oldValue) {
        Upload.base64DataUrl($scope.companyLogoFile).then(function (url) {
            if (url) {
                $scope.recruiterDetails.companyLogo = url;
            }
        })
    });
    $scope.createRecruiterDetails = function () {    
        ModalService.SetTitle('Create Recruiter Details');
        ModalService.SetMessage('Creating recruiter details,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //post  to api/recruiters
        var Recruiters = Restangular.all('api/recruiters');
        Recruiters.post($scope.recruiterDetails).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                Notification.success({ message: response.data.message, title: 'Create Recruiter Details' });
            }

        })       
    };

}]);

recruiterDetailsModule.controller('RecruiterDetailsController', ['$scope', '$state', '$uibModal', '$uibModalStack', 'Restangular', 'Auth', 'RecruiterService', 'ModalService', 'Notification', function ($scope, $state, $uibModal, $uibModalStack, Restangular, Auth, RecruiterService, ModalService, Notification) {
    $scope.recruiterDetails = RecruiterService.GetRecruiter();
    $scope.back = function () {
        window.history.back();
    };
    $scope.getRecruiterDetails = function () {
            ModalService.SetTitle('Load Recruiter Details');
            ModalService.SetMessage('Loading recruiter details,please wait!');
            var modalInstance = $uibModal.open({
                templateUrl: 'app/modals/modal.html',
                controller: 'ModalController'
            });
            var recruiter = Restangular.one('api/recruiters/getByUserID', Auth.GetUserID());
            recruiter.get().then(function (response) {
                if (response.data) {
                    $uibModalStack.dismissAll();
                    $scope.recruiterDetails = response.data.recruiter;
                    RecruiterService.SetRecruiter(response.data.recruiter);
                };
            })
            
    }
}]);

recruiterDetailsModule.controller('RecruiterDetailsEditController', ['$scope', '$state', '$uibModal', '$uibModalStack', '$timeout', 'Restangular', 'Upload', 'ModalService', 'RecruiterService', 'Auth', 'Notification', function ($scope, $state, $uibModal, $uibModalStack, $timeout, Restangular, Upload, ModalService, RecruiterService, Auth, Notification) {
    $scope.recruiterDetails = RecruiterService.GetRecruiter();
    $scope.back = function () {
        window.history.back();
    }
    $scope.recruiterTypeOptions = ['Employer', 'Agent'];
    $scope.companySectorOptions = ['Academic', 'Accounting and Auditing', 'Actuarial Science', 'Admin', 'Advertising', 'Agriculture', 'Architecture', 'Automotive', 'Aviation', 'Banking', 'Business Management',
        'Call Centre', 'Chemical', 'Clothing', 'Construction', 'Consulting', 'Cruise Ship', 'Defence', 'Design Services', 'E-Commerce', 'Education',
        'Engineering', 'Entertainment', 'Environmental', 'Fashion', 'Finance', 'FMCG', 'General', 'Government & Parastatals', 'Healthcare', 'Health & Safety', 'Health Fitness & Beauty',
        'Hospitality', 'Human Resources', 'Import & Export', 'Insurance', 'Internet', 'Investment', 'IT', 'Legal', 'Logistics', 'Management', 'Manufacturing',
        'Market Research', 'Marketing', 'Media', 'Medical', 'Mining', 'Motoring', 'NGO & Non-profit', 'Petrochemical', 'Pharmaceutical', 'PR & Communication',
        'Procurement', 'Property', 'Purchasing', 'Real Estate', 'Recruitment', 'Research', 'Retail', 'Sales', 'Security', 'Social Services', 'Sports', 'Stockbroking',
        'Technical', 'Technology', 'Telecommunications', 'Trades & Services', 'Travel & Tourism', 'Warehousing', 'Other'];
    $scope.employeeOptions = ['1-10', '10-20', '21-50', '51-100', '101-500', '500-1 000', '1 001-10 000', '10 000 +'];
    $scope.currentFile = '';
    $scope.setFile = function (element) {
        $scope.currentFile = element.files[0];
        var reader = new FileReader();
        reader.onload = function (event) {
            $scope.recruiterDetails.companyLogo = event.target.result
            $scope.$apply()
        }
        // when the file is read it triggers the onload event above.
        reader.readAsDataURL(element.files[0]);
    };
    $scope.companyLogoFile = '';
    $scope.updateRecruiterDetails = function () {
        var details = {
            email: $scope.recruiterDetails.email,
            companyName: $scope.recruiterDetails.companyName,
            recruiterType: $scope.recruiterDetails.recruiterType,
            companySector: $scope.recruiterDetails.companySector,
            yearFounded: $scope.recruiterDetails.yearFounded,
            numberOfemployees: $scope.recruiterDetails.numberOfemployees,
            introduction: $scope.recruiterDetails.introduction,
            contactPerson: $scope.recruiterDetails.contactPerson,
            physicalAddress: $scope.recruiterDetails.physicalAddress,
            postalAddress: $scope.recruiterDetails.postalAddress,
            tel: $scope.recruiterDetails.tel,
            mobile: $scope.recruiterDetails.mobile,
            fax: $scope.recruiterDetails.fax,
            website: $scope.recruiterDetails.website,
            companyLogo: $scope.recruiterDetails.companyLogo
        };
        ModalService.SetTitle('Update Recruiter Details');
        ModalService.SetMessage('Updating recruiter details,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });

        //post  to api/recruiters
        var Recruiters = Restangular.one('api/recruiters', $scope.recruiterDetails._id);
        Recruiters.customPUT(details).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                Notification.success({ message: response.data.message, title: 'Update Recruiter Details' });
                window.history.back();
            }

        })
    };
}]);

recruiterDetailsModule.controller('AdvertisingController', ['$scope','store', function ($scope, store) {
    $scope.role = store.get('role');
}])