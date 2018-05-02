var employmentModule = angular.module('employmentModule',[]);

employmentModule.controller('EmploymentController', ['$scope', '$stateParams', '$uibModal', '$uibModalStack', '$timeout', 'Restangular', 'JobSeekerService', 'ModalService', 'Auth', 'Notification', function ($scope, $stateParams, $uibModal, $uibModalStack, $timeout, Restangular, JobSeekerService, ModalService, Auth, Notification) {
    $scope.employment = $scope.iniEmployment;
    $scope.back = function () {
        window.history.back();
    };
    $scope.jobLevelOptions = ['None', 'Junior', 'Skilled', 'Senior', 'Management', 'Executive'];
    $scope.jobTypeOptions = ['Permanent', 'Contract', 'Temporary', 'Part-Time', 'Seasonal', 'Internship', 'Volunteer'];
    $scope.companySectorOptions = ['Academic', 'Accounting and Auditing', 'Actuarial Science', 'Admin', 'Advertising', 'Agriculture', 'Architecture', 'Automotive', 'Aviation', 'Banking', 'Business Management',
        'Call Centre', 'Chemical', 'Clothing', 'Construction', 'Consulting', 'Cruise Ship', 'Defence', 'Design Services', 'E-Commerce', 'Education',
        'Engineering', 'Entertainment', 'Environmental', 'Fashion', 'Finance', 'FMCG', 'General', 'Government & Parastatals', 'Health & Safety', 'Health Fitness & Beauty',
        'Hospitality', 'Human Resources', 'Import & Export', 'Insurance', 'Internet', 'Investment', 'IT', 'Legal', 'Logistics', 'Management', 'Manufacturing',
        'Market Research', 'Marketing', 'Media', 'Medical', 'Mining', 'Motoring', 'NGO & Non-profit', 'Petrochemical', 'Pharmaceutical', 'PR & Communication',
        'Procurement', 'Property', 'Purchasing', 'Real Estate', 'Recruitment', 'Research', 'Retail', 'Sales', 'Security', 'Social Services', 'Sports', 'Stockbroking',
        'Technical', 'Technology', 'Telecommunications', 'Trades & Services', 'Travel & Tourism', 'Warehousing', 'Other'];
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
    $scope.currencyOptions = ['AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BOV',
        'BRL', 'BSD', 'BTN', 'BWP', 'BYR', 'BZD', 'CAD', 'CDF', 'CHE', 'CHF', 'CHW', 'CLF', 'CLP', 'CNY', 'COP', 'COU', 'CRC', 'CUP', 'CVE', 'CYP', 'CZK', 'DJF', 'DKK', 'DOP',
        'DZD', 'EEK', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'INR',
        'IQD', 'IRR', 'ISK', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LTL', 'LVL', 'LYD', 'MAD',
        'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRO', 'MTL', 'MUR', 'MVR', 'MWK', 'MXN', 'MXV', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN',
        'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SSP', 'SEK', 'SGD', 'SHP', 'SKK', 'SLL', 'SOS', 'SRD', 'STD', 'SYP',
        'SZL', 'THB', 'TJS', 'TMM', 'TND', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'USN', 'USS', 'UYU', 'UZS', 'VEB', 'VND', 'VUV', 'WST', 'XAF', 'XCD', 'XOF', 'XPF',
        'YER', 'R', 'ZMK', 'ZWD'];
    
    $scope.createEmploymentRecord = function () {
        ModalService.SetTitle('Add Employment Record')
        ModalService.SetMessage('Adding employment record,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //post  to /jobSeekers/{email}/employment
        var Employment = Restangular.one('api/jobSeekers', Auth.GetUserEmail()).all('employment');
        Employment.post($scope.employment).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                JobSeekerService.SetJobSeeker(response.data.jobSeeker);
                Notification.success({ message: response.data.message, title: 'Add Employment Record' });
                window.history.back();
            }

        })
    };
    
    $scope.iniEmployment = {
        email: Auth.GetUserEmail(),
        jobTitle: null,
        jobLevel: 'None',
        jobType: 'Permanent',
        companyName: null,
        companySector: 'Academic',
        locationTown: null,
        locationCountry: 'South Africa',
        startMonth: 'January',
        startYear: null,
        endMonth: 'January',
        endYear: null,
        duties: null,
        isCurrent: false,
        reasonsForLeaving: null,
    };
}]);

employmentModule.controller('EmploymentEditController', ['$scope', '$stateParams', '$uibModal', '$uibModalStack', '$timeout', 'Restangular', 'JobSeekerService', 'ModalService', 'Auth', 'Notification', function ($scope, $stateParams, $uibModal, $uibModalStack, $timeout, Restangular, JobSeekerService, ModalService, Auth, Notification) {
    $scope.employment = JobSeekerService.GetEmploymentForEdit();
    $scope.back = function () {
        window.history.back();
    };
    $scope.jobLevelOptions = ['None', 'Junior', 'Skilled', 'Senior', 'Management', 'Executive'];
    $scope.jobTypeOptions = ['Permanent', 'Contract', 'Temporary', 'Part-Time', 'Seasonal', 'Internship', 'Volunteer'];
    $scope.companySectorOptions = ['Academic', 'Accounting and Auditing', 'Actuarial Science', 'Admin', 'Advertising', 'Agriculture', 'Architecture', 'Automotive', 'Aviation', 'Banking', 'Business Management',
        'Call Centre', 'Chemical', 'Clothing', 'Construction', 'Consulting', 'Cruise Ship', 'Defence', 'Design Services', 'E-Commerce', 'Education',
        'Engineering', 'Entertainment', 'Environmental', 'Fashion', 'Finance', 'FMCG', 'General', 'Government & Parastatals', 'Health & Safety', 'Health Fitness & Beauty',
        'Hospitality', 'Human Resources', 'Import & Export', 'Insurance', 'Internet', 'Investment', 'IT', 'Legal', 'Logistics', 'Management', 'Manufacturing',
        'Market Research', 'Marketing', 'Media', 'Medical', 'Mining', 'Motoring', 'NGO & Non-profit', 'Petrochemical', 'Pharmaceutical', 'PR & Communication',
        'Procurement', 'Property', 'Purchasing', 'Real Estate', 'Recruitment', 'Research', 'Retail', 'Sales', 'Security', 'Social Services', 'Sports', 'Stockbroking',
        'Technical', 'Technology', 'Telecommunications', 'Trades & Services', 'Travel & Tourism', 'Warehousing', 'Other'];
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
    $scope.currencyOptions = ['AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BOV',
        'BRL', 'BSD', 'BTN', 'BWP', 'BYR', 'BZD', 'CAD', 'CDF', 'CHE', 'CHF', 'CHW', 'CLF', 'CLP', 'CNY', 'COP', 'COU', 'CRC', 'CUP', 'CVE', 'CYP', 'CZK', 'DJF', 'DKK', 'DOP',
        'DZD', 'EEK', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'INR',
        'IQD', 'IRR', 'ISK', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LTL', 'LVL', 'LYD', 'MAD',
        'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRO', 'MTL', 'MUR', 'MVR', 'MWK', 'MXN', 'MXV', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN',
        'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SSP', 'SEK', 'SGD', 'SHP', 'SKK', 'SLL', 'SOS', 'SRD', 'STD', 'SYP',
        'SZL', 'THB', 'TJS', 'TMM', 'TND', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'USN', 'USS', 'UYU', 'UZS', 'VEB', 'VND', 'VUV', 'WST', 'XAF', 'XCD', 'XOF', 'XPF',
        'YER', 'R', 'ZMK', 'ZWD'];
    $scope.updateEmploymentRecord = function () {
        var employment = {
            jobTitle: $scope.employment.jobTitle,
            jobLevel: $scope.employment.jobLevel,
            jobType: $scope.employment.jobType,
            companyName: $scope.employment.companyName,
            companySector: $scope.employment.companySector,
            locationTown: $scope.employment.locationTown,
            locationCountry: $scope.employment.locationCountry,
            startMonth: $scope.employment.startMonth,
            endMonth: $scope.employment.endMonth,
            startYear: $scope.employment.startYear,
            endYear: $scope.employment.endYear,
            isCurrent: $scope.employment.isCurrent,
            duties: $scope.employment.duties,
            reasonsForLeaving: $scope.employment.reasonsForLeaving
        };
        ModalService.SetTitle('Update Employment Record')
        ModalService.SetMessage('Updating employment record,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //put  to /jobSeekers/{email}/employment/{employmentID}
        var Employment = Restangular.one('api/jobSeekers', Auth.GetUserEmail()).one('employment', $scope.employment._id);
        Employment.customPUT(employment).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                JobSeekerService.SetJobSeeker(response.data.jobSeeker);           
                Notification.success({ message: response.data.message, title: 'Update Employment Record' });
                window.history.back();
            }

        })
    };
    $scope.deleteEmployment = function () {
        ModalService.SetCloseModal(); // close modal
        ModalService.SetMessage('Are you sure you want to delete employment record?');
        ModalService.SetTitle('Delete Employment Record');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/messageModal.html',
            controller: 'ModalController'
        });
        modalInstance.result.then(function () {
            $uibModalStack.dismissAll();
            ModalService.SetTitle('Delete Employment Record')
            ModalService.SetMessage('Deleting employment record,please wait!');
            var modalInstance = $uibModal.open({
                templateUrl: 'app/modals/modal.html',
                controller: 'ModalController'
            });
            

            //Delete  /jobSeekers/{email}/employment/{employmentID}
            var Employment = Restangular.one('api/jobSeekers', Auth.GetUserEmail()).all('employment');
            Employment.customDELETE($scope.employment._id).then(function (response) {
                if (response.data) {
                    $uibModalStack.dismissAll();
                    JobSeekerService.SetJobSeeker(response.data.jobSeeker);
                    Notification.success({ message: response.data.message, title: 'Delete Employment Record' });
                    window.history.back();
                }

            })
        })

    };
}])