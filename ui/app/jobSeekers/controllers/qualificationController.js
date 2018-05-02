var qualificationModule = angular.module('qualificationModule', []);

qualificationModule.controller('QualificationController', ['$scope', '$stateParams', '$uibModal', '$uibModalStack', '$timeout', 'Restangular', 'JobSeekerService', 'ModalService', 'Auth', 'Notification', function ($scope, $stateParams, $uibModal, $uibModalStack, $timeout, Restangular, JobSeekerService, ModalService, Auth, Notification) {

    $scope.qualification = $scope.iniQualification;
    $scope.back = function () {
        window.history.back();
    };
    $scope.levelOptions = ['Certificate', 'Higher Certificate', 'Diploma', 'Advanced Diploma', 'Graduate Diploma', 'Post Graduate Diploma', 'BTech Degree', 'Bachelors Degree', 'Honours Degree', 'Masters Degree', 'Doctorate Degree'];
    $scope.locationCountryOptions = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia',
        'Austria', 'Azerbaijan', 'Bahamas, The', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina',
        'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic',
        'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo, Democratic Republic of the', 'Congo, Republic of the', 'Costa Rica', "Cote d'Ivoire", 'Croatia',
        'Cuba', 'Curacao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador',
        'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia, The', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada',
        'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Holy See', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq',
        'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kosovo', 'Kuwait', 'Kyrgyzstan',
        'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi',
        'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro',
        'Morocco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea',
        'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestinian Territories', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
        'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe',
        'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia',
        'South Africa', 'South Africa-Gauteng', 'South Africa-Western Cape', 'South Africa-Eastern Cape', 'South Africa-Northern Cape', 'South Africa-KwaZulu-Natal', 'South Africa-Free State',
        'South Africa-Mpumalanga', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan',
        'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates',
        'United Kingdom', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'];
    $scope.startMonthOptions = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    $scope.endMonthOptions = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    $scope.statusOptions = ['Complete', 'In Complete', 'In Progress'];
    $scope.createQualification = function () {
        ModalService.SetTitle('Add Qualification')
        ModalService.SetMessage('Adding qualification,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //post  to /jobSeekers/{email}/qualifications
        var Qualifications = Restangular.one('api/jobSeekers', Auth.GetUserEmail()).all('qualifications');
        Qualifications.post($scope.qualification).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                JobSeekerService.SetJobSeeker(response.data.jobSeeker);              
                Notification.success({ message: response.data.message, title: 'Add Qualification' });
                window.history.back();
            }

        })
    };
    
    $scope.iniQualification = {
        email: Auth.GetUserEmail(),
        title: null,
        level: 'Certificate',
        institution: null,
        locationTown: null,
        locationCountry: 'South Africa',
        startMonth: 'January',
        startYear: null,
        endMonth: 'January',
        endYear: null,
        status: 'Complete',
        majors: null,
    };

}]);

qualificationModule.controller('QualificationEditController', ['$scope', '$stateParams', '$uibModal', '$uibModalStack', '$timeout', 'Restangular', 'JobSeekerService', 'ModalService', 'Auth', 'Notification', function ($scope, $stateParams, $uibModal, $uibModalStack, $timeout, Restangular, JobSeekerService, ModalService, Auth, Notification) {

    $scope.qualification = JobSeekerService.GetQualificationForEdit();
    $scope.back = function () {
        window.history.back();
    };
    $scope.levelOptions = ['Certificate', 'Higher Certificate', 'Diploma', 'Advanced Diploma', 'Graduate Diploma', 'Post Graduate Diploma', 'BTech Degree', 'Bachelors Degree', 'Honours Degree', 'Masters Degree', 'Doctorate Degree'];
    $scope.locationCountryOptions = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia',
        'Austria', 'Azerbaijan', 'Bahamas, The', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina',
        'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic',
        'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo, Democratic Republic of the', 'Congo, Republic of the', 'Costa Rica', "Cote d'Ivoire", 'Croatia',
        'Cuba', 'Curacao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador',
        'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia, The', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada',
        'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Holy See', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq',
        'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kosovo', 'Kuwait', 'Kyrgyzstan',
        'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi',
        'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro',
        'Morocco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea',
        'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestinian Territories', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
        'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe',
        'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia',
        'South Africa', 'South Africa-Gauteng', 'South Africa-Western Cape', 'South Africa-Eastern Cape', 'South Africa-Northern Cape', 'South Africa-KwaZulu-Natal', 'South Africa-Free State',
        'South Africa-Mpumalanga', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan',
        'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates',
        'United Kingdom', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'];
    $scope.startMonthOptions = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    $scope.endMonthOptions = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    $scope.statusOptions = ['Complete', 'In Complete', 'In Progress'];
    $scope.updateQualification = function () {
        var qualification = {
            title: $scope.qualification.title,
            level: $scope.qualification.level,
            institution: $scope.qualification.institution,
            locationTown: $scope.qualification.locationTown,
            locationCountry: $scope.qualification.locationCountry,
            startMonth: $scope.qualification.startMonth,
            endMonth: $scope.qualification.endMonth,
            startYear: $scope.qualification.startYear,
            endYear: $scope.qualification.endYear,
            status: $scope.qualification.status,
            majors: $scope.qualification.majors
        };
        ModalService.SetTitle('Update Qualification')
        ModalService.SetMessage('Updating qualification,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //put  to /jobSeekers/{email}/qualifications/{qualificationID}
        var Qualifications = Restangular.one('api/jobSeekers', Auth.GetUserEmail()).one('qualifications', $scope.qualification._id);
        Qualifications.customPUT(qualification).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                JobSeekerService.SetJobSeeker(response.data.jobSeeker);
                Notification.success({ message: response.data.message, title: 'Update Qualification' });
                window.history.back();
            }

        })
    };
    $scope.deletequalification = function () {
        ModalService.SetTitle('Delete Qualification')
        ModalService.SetMessage('Deleting qualification,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //Delete  /jobSeekers/{email}/qualifications/{qualificationID}
        var Qualification = Restangular.one('api/jobSeekers', Auth.GetUserEmail()).one('qualifications', $scope.qualification._id);
        Qualification.remove().then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                JobSeekerService.SetJobSeeker(response.data.jobSeeker);
                Notification.success({ message: response.data.message, title: 'Delete Qualification' });
                window.history.back();
            }
        })
    };
}])