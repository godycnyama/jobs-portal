var signupModule = angular.module('signupModule', []);

signupModule.controller('SignupJobSeekerController', ['$scope', '$rootScope', '$state', '$uibModal', '$uibModalStack', '$timeout', 'Restangular', 'store', 'Auth', 'ModalService', function ($scope, $rootScope, $state, $uibModal, $uibModalStack, $timeout, Restangular, store, Auth, ModalService) {
    $scope.message = '';
    $scope.signup = {};
    $scope.signup.email = null;
    $scope.signup.password = null;
    $scope.confirmPassword = null;
    $scope.signup.passwordRecoveryEmail = null;
    $scope.signup.role = 'jobseeker';
    $scope.save = function () {
        ModalService.SetTitle('Sign Up');
        ModalService.SetMessage('Signing up,please wait!');
        var modalInstance0 = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //post  to api/users/signUp
        var Users = Restangular.all('api/signUp');
        Users.post($scope.signup).then(function (response) {
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
                ModalService.SetTitle('Sign Up');
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/modals/messageModal.html',
                    controller: 'ModalController'
                });
                modalInstance.result.then(function () {
                    if (response.data.role === 'jobseeker') {
                        $state.go('profile.personalCreate');
                    }
                    if (response.data.role === 'recruiter') {
                        $state.go('recruiter.detailsCreate');
                    }
                });               
            }

        })
    }
}]);

signupModule.controller('SignupRecruiterController', ['$scope', '$rootScope', '$state', '$uibModal', '$uibModalStack', 'Restangular', 'ModalService', function ($scope, $rootScope, $state, $uibModal, $uibModalStack, Restangular, ModalService) {
    $scope.signup = {};
    $scope.signup.email = null;
    $scope.signup.password = null;
    $scope.confirmPassword = null;
    $scope.signup.passwordRecoveryEmail = null;
    $scope.signup.role = 'recruiter';
    $scope.save = function () {
        ModalService.SetTitle('Sign Up')
        ModalService.SetMessage('Signing up,please wait!');
        var modalInstance0 = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //post  to api/users/signUp
        var Users = Restangular.all('api/signUp');
        Users.post($scope.signup).then(function (response) {
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
                ModalService.SetTitle('Sign Up');
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/modals/messageModal.html',
                    controller: 'ModalController'
                });
                modalInstance.result.then(function () {
                    if (response.data.role === 'jobseeker') {
                        $state.go('profile.personalCreate');
                    }
                    if (response.data.role === 'recruiter') {
                        $state.go('recruiter.detailsCreate');
                    }

                });
            }

        })
    }
}]);

signupModule.controller('SignupRecruiterControllerx', ['$scope', '$rootScope', '$state', '$uibModal', '$uibModalStack', 'store', 'Restangular', 'ModalService', 'Upload', 'RecruiterService', function ($scope, $rootScope, $state, $uibModal, $uibModalStack, store, Restangular, ModalService, Upload, RecruiterService) {
    $scope.signup = {};
    $scope.signup.username = null;
    $scope.signup.password = null;
    $scope.confirmPassword = null;
    $scope.signup.passwordRecoveryEmail = null;
    $scope.signup.securityQuestion = null;
    $scope.securityQuestionOptions = ['What is the name of your first grade teacher?','What is the name of your first school?','What is your dream job?','What was your first car?','What is the maiden name of your mother?','What was your favourate place to visit as a child?','Where did you meet your spouse?'];
    $scope.signup.securityQuestionAnswer = null;
    $scope.signup.role = 'recruiter';
    $scope.signup.companyName = null;
    $scope.recruiterTypeOptions = ['Employer', 'Agency']
    $scope.signup.recruiterType = null;
    $scope.companySectorOptions = ['Academic', 'Accounting and Auditing', 'Actuarial Science', 'Admin', 'Advertising', 'Agriculture', 'Architecture', 'Automotive', 'Aviation', 'Banking', 'Business Management',
        'Call Centre', 'Chemical', 'Clothing', 'Construction', 'Consulting', 'Cruise Ship', 'Defence', 'Design Services', 'E-Commerce', 'Education',
        'Engineering', 'Entertainment', 'Environmental', 'Fashion', 'Finance', 'FMCG', 'General', 'Government & Parastatals','Healthcare', 'Health & Safety', 'Health Fitness & Beauty',
        'Hospitality', 'Human Resources', 'Import & Export', 'Insurance', 'Internet', 'Investment', 'IT', 'Legal', 'Logistics', 'Management', 'Manufacturing',
        'Market Research', 'Marketing', 'Media', 'Medical', 'Mining', 'Motoring', 'NGO & Non-profit', 'Petrochemical', 'Pharmaceutical', 'PR & Communication',
        'Procurement', 'Property', 'Purchasing', 'Real Estate', 'Recruitment', 'Research', 'Retail', 'Sales', 'Security', 'Social Services', 'Sports', 'Stockbroking',
        'Technical', 'Technology', 'Telecommunications', 'Trades & Services', 'Travel & Tourism', 'Warehousing', 'Other'];
    $scope.signup.companySector = null;
    $scope.signup.yearFounded = null;
    $scope.employeeOptions = ['1-10','10-20','21-50','51-100','101-500','500-1 000','1 001-10 000','10 000 +'];
    $scope.signup.numberOfemployees = null;
    $scope.signup.introduction = null;
    $scope.signup.physicalAddress = null;
    $scope.signup.postalAddress = null;
    $scope.signup.email = null;
    $scope.signup.tel = null;
    $scope.signup.mobile = null;
    $scope.signup.fax = null;
    $scope.signup.website = null;
    $scope.companyLogoFile = '';
    $scope.signup.companyLogo = '';
    $scope.save = function () {
        console.log($scope.signup.companyLogo);
        ModalService.SetTitle('Sign Up');
        ModalService.SetMessage('Signing up,please wait!');
        var modalInstance0 = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //post  to api/users/signUp
        var Users = Restangular.all('api/auth/recruiterSignup');
        Users.post($scope.signup).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                store.set('id_token', response.data.user.id_token);
                store.set('userEmail', response.data.user.userEmail);
                store.set('userID', response.data.user.userID);
                store.set('passwordTemporary', response.data.user.passwordTemporary);
                store.set('passwordTemporaryTTL', response.data.user.passwordTemporaryTTL);
                store.set('role', response.data.user.role);
                store.set('loggedIn', true);
                ModalService.SetMessage(response.data.user.message);
                ModalService.SetTitle('Sign Up');
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/modals/messageModal.html',
                    controller: 'ModalController'
                });
                RecruiterService.SetRecruiter(response.data.recruiter);
                $rootScope.$broadcast('loggedin');
                $state.go('recruiter.details');
            }
        })
    }
}])

signupModule.controller('SignupJobSeekerControllerx', ['$scope', '$rootScope', '$state', '$uibModal', '$uibModalStack', 'store', 'Restangular', 'ModalService', 'Upload', 'JobSeekerService', function ($scope, $rootScope, $state, $uibModal, $uibModalStack, store, Restangular, ModalService, Upload, JobSeekerService) {
    $scope.signup = {};
    $scope.signup.username = null;
    $scope.signup.password = null;
    $scope.confirmPassword = null;
    $scope.signup.passwordRecoveryEmail = null;
    $scope.signup.securityQuestion = null;
    $scope.securityQuestionOptions = ['What is the name of your first grade teacher?', 'What is the name of your first school?', 'What is your dream job?', 'What was your first car?', 'What is the maiden name of your mother?', 'What was your favourate place to visit as a child?', 'Where did you meet your spouse?'];
    $scope.signup.securityQuestionAnswer = null;
    $scope.signup.role = 'jobseeker';
    $scope.signup.firstName = null;
    $scope.signup.middleName= null;
    $scope.signup.lastName = null;
    $scope.genderOptions = ['Male', 'Female'];
    $scope.signup.gender = 'Male';
    $scope.signup.birthDate = null;
    $scope.signup.profession = null;
    $scope.signup.mainQualification = null;
    $scope.signup.introduction = null;
    $scope.signup.homeTel = null;
    $scope.signup.workTel = null;
    $scope.signup.mobile = null;
    $scope.signup.address = null;
    $scope.signup.locationTown = null;
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
        'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan',
        'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates',
        'United Kingdom', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'];
    $scope.signup.locationCountry = 'South Africa';
    $scope.signup.linkedInProfile = null;
    $scope.signup.website = null;
    $scope.signup.professionalAffiliations = null;
    $scope.nationalityOptions = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia',
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
        'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan',
        'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates',
        'United Kingdom', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'];
    
    $scope.signup.nationality = 'South Africa';
    $scope.noticeOptions = ['1 Week', '2 Weeks', '1 Month', '3 Months'];
    $scope.signup.noticePeriod = '1 Month';
    $scope.currencyOptions = ['AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BOV',
        'BRL', 'BSD', 'BTN', 'BWP', 'BYR', 'BZD', 'CAD', 'CDF', 'CHE', 'CHF', 'CHW', 'CLF', 'CLP', 'CNY', 'COP', 'COU', 'CRC', 'CUP', 'CVE', 'CYP', 'CZK', 'DJF', 'DKK', 'DOP',
        'DZD', 'EEK', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'INR',
        'IQD', 'IRR', 'ISK', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LTL', 'LVL', 'LYD', 'MAD',
        'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRO', 'MTL', 'MUR', 'MVR', 'MWK', 'MXN', 'MXV', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN',
        'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SSP', 'SEK', 'SGD', 'SHP', 'SKK', 'SLL', 'SOS', 'SRD', 'STD', 'SYP',
        'SZL', 'THB', 'TJS', 'TMM', 'TND', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'USN', 'USS', 'UYU', 'UZS', 'VEB', 'VND', 'VUV', 'WST', 'XAF', 'XCD', 'XOF', 'XPF',
        'YER', 'R', 'ZMK', 'ZWD'];
    $scope.signup.requiredSalaryCurrency = 'R';
    $scope.signup.requiredMinimumSalary = null;
    $scope.signup.requiredMaximumSalary = null;
    $scope.signup.preferredJobTitles = null;
    $scope.signup.preferredJobTypes = null;
    $scope.signup.preferredJobLocations = null;
    $scope.signup.photo = null;
    $scope.photoImage = null;
    $scope.openDatePicker = function ($event) {
        $scope.datePickerOpened = true;
    };
    $scope.setDate = function (year, month, day) {
        $scope.signup.birthDate = new Date(year, month, day);
    };
    $scope.todayDate = function () {
        $scope.signup.birthDate = new Date();
    };
    $scope.clear = function () {
        $scope.signup.birthDate = '';
    };
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };
    $scope.save = function () {
        ModalService.SetTitle('Sign Up')
        ModalService.SetMessage('Signing up,please wait!');
        var modalInstance0 = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //post  to api/users/signUp
        var Users = Restangular.all('api/auth/jobSeekerSignup');
        Users.post($scope.signup).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                store.set('id_token', response.data.user.id_token);
                store.set('userEmail', response.data.user.userEmail);
                store.set('userID', response.data.user.userID);
                store.set('passwordTemporary', response.data.user.passwordTemporary);
                store.set('passwordTemporaryTTL', response.data.user.passwordTemporaryTTL);
                store.set('role', response.data.user.role);
                store.set('loggedIn', true);
                ModalService.SetMessage(response.data.user.message);
                ModalService.SetTitle('Sign Up');
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/modals/messageModal.html',
                    controller: 'ModalController'
                });
                JobSeekerService.SetJobSeeker(response.data.jobSeeker);
                $rootScope.$broadcast('loggedin');
                $state.go('profile.master');
            }
        })
    }
}])