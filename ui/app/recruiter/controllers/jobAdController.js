var jobAdModule = angular.module('jobAdModule', []);

jobAdModule.controller('JobAdController', ['$scope', '$state', '$stateParams', 'JobAdsService', 'RecruiterService', 'Restangular', 'Auth', 'Notification', function ($scope, $state, $stateParams, JobAdsService, RecruiterService, Restangular, Auth, Notification) {
    $scope.jobAd = (JobAdsService.GetCopy() === true) ? $scope.copyJobAd : JobAdsService.GetJobAd();
    $scope.minimumSalary = '';
    $scope.maximumSalary = '';
    $scope.recruiterDetails = {};  
    $scope.getRecruiter = function () {
        var recruiter = Restangular.one('api/recruiters/getByUserID', Auth.GetUserID());
        recruiter.get().then(function (response) {
            if (response.data) {           
                $scope.recruiterDetails = response.data.recruiter;
                RecruiterService.SetRecruiter(response.data.recruiter);
            };
        })
    };
    $scope.copyJob = JobAdsService.GetJobAd();
    $scope.mode = JobAdsService.GetMode();
    $scope.jobLevelOptions = ['Management', 'Supervisory', 'Junior', 'Skilled', 'Senior', 'Executive','None'];
    $scope.jobTypeOptions = ['Permanent', 'Contract', 'Temporary', 'Part-Time', 'Seasonal', 'Internship', 'Volunteer'];
    $scope.companySectorOptions = ['Academic', 'Accounting and Auditing', 'Actuarial Science', 'Admin', 'Advertising', 'Agriculture', 'Architecture', 'Automotive', 'Aviation', 'Banking', 'Business Management',
        'Call Centre','Chemical','Clothing','Construction','Consulting','Cruise Ship','Defence','Design Services','E-Commerce','Education', 
        'Engineering','Entertainment','Environmental','Fashion','Finance','FMCG','General','Government & Parastatals','Health & Safety','Health Fitness & Beauty', 
        'Hospitality','Human Resources','Import & Export','Insurance','Internet','Investment','IT','Legal','Logistics','Management','Manufacturing', 
        'Market Research','Marketing','Media','Medical','Mining','Motoring','NGO & Non-profit','Petrochemical','Pharmaceutical','PR & Communication', 
        'Procurement','Property','Purchasing','Real Estate','Recruitment','Research','Retail','Sales','Security','Social Services','Sports','Stockbroking', 
        'Technical','Technology','Telecommunications','Trades & Services','Travel & Tourism','Warehousing','Other'];
    $scope.jobLocationCountryOptions = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia',
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
    $scope.renumerationTypeOptions = ['Basic Salary', 'Basic Salary Plus Benefits', 'Cost to Company', 'Cost to Company Incl Benefits', 'Commission Only', 'Commission Only Plus Benefits',
            'Basic Plus Commission','Basic Plus Commission and Benefits','On Target Earnings','On Target Earnings Plus Benefits'];
    $scope.salaryCurrencyOptions = ['AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BOV',
        'BRL', 'BSD', 'BTN', 'BWP', 'BYR', 'BZD', 'CAD', 'CDF', 'CHE', 'CHF', 'CHW', 'CLF', 'CLP', 'CNY', 'COP', 'COU', 'CRC', 'CUP', 'CVE', 'CYP', 'CZK', 'DJF', 'DKK', 'DOP',
        'DZD', 'EEK', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'INR',
        'IQD', 'IRR', 'ISK', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LTL', 'LVL', 'LYD', 'MAD',
        'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRO', 'MTL', 'MUR', 'MVR', 'MWK', 'MXN', 'MXV', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN',
        'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SSP', 'SEK', 'SGD', 'SHP', 'SKK', 'SLL', 'SOS', 'SRD', 'STD', 'SYP',
        'SZL', 'THB', 'TJS', 'TMM', 'TND', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'USN', 'USS', 'UYU', 'UZS', 'VEB', 'VND', 'VUV', 'WST', 'XAF', 'XCD', 'XOF', 'XPF',
        'YER', 'R', 'ZMK', 'ZWD'];
    $scope.salaryFrequencyOptions = ['Per Hour', 'Per Day', 'Per Week', 'Per Month', 'Per Year','Once off'];
    $scope.disabilityCandidatesOptions = ['Yes', 'No', 'Only'];
    $scope.previewJobAd = function () {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        if (today > $scope.jobAd.closingDate.setHours(0, 0, 0, 0)) {
            Notification.error({ message: 'Closing date must be in the future!', title: 'Closing date error' });
            return;
        }
        if (!$scope.jobAd.applyOnline && !$scope.jobAd.howToApply) {
            Notification.error({ message: 'Please add how to apply instructions!', title: 'How to apply error' });
            return;
        }
        $scope.jobAd.company = $scope.recruiterDetails._id;
        $scope.jobAd.recruiterUserID = $scope.recruiterDetails.userID; 
        JobAdsService.SetJobAd($scope.jobAd);
        console.log($scope.jobAd);
        $state.go('recruiter.previewJobAd')
    };
    $scope.openDatePicker = function ($event) {
        $scope.datePickerOpened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.jobAd.closingDate = new Date(year, month, day);
    };
    $scope.todayDate = function () {
        $scope.jobAd.closingDate = new Date();
    };
    $scope.clear = function () {
        $scope.jobAd.closingDate = null;
    };
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };
    $scope.back = function () {
        window.history.back();
    };
    $scope.iniJobAd = {
        jobTitle: null,
        jobREF: null,
        jobLevel: 'Management',
        jobType: 'Permanent',
        companySector: 'Academic',
        closingDate: null,
        applicationsLimit: null,
        jobLocationTown: null,
        jobLocationCountry: 'South Africa',
        renumerationType: 'Basic Salary',
        renumerationMarketRelated: false,
        renumerationBenefits: null,
        salaryCurrency: 'R',
        minimumSalary: null,
        maximumSalary: null,
        salaryNegotiable: false,
        hideSalary: false,
        salaryFrequency: 'Per Month',
        employmentEquityPosition: false,
        disabilityOption: 'Yes',
        introduction: null,
        jobDescription: null,
        jobRequirements: null,
        applyOnline: true,
        howToApply: null,
        recruiterUserID: null,
        company: null,
    };
    $scope.copyJobAd = {
        jobTitle: $scope.copyJob.jobTitle,
        jobREF: null,
        jobLevel: $scope.copyJob.jobLevel,
        jobType: $scope.copyJob.jobType,
        companySector: $scope.copyJob.companySector,
        closingDate: new Date(),
        jobLocationTown: $scope.copyJob.jobLocationTown,
        jobLocationCountry: $scope.copyJob.jobLocationCountry,
        renumerationType: $scope.copyJob.renumerationType,
        renumerationMarketRelated: $scope.copyJob.renumerationMarketRelated,
        renumerationBenefits: $scope.copyJob.renumerationBenefits,
        salaryCurrency: $scope.copyJob.salaryCurrency,
        minimumSalary: numeral().unformat($scope.copyJob.minimumSalary),
        maximumSalary: numeral().unformat($scope.copyJob.maximumSalary),
        salaryNegotiable: $scope.copyJob.salaryNegotiable,
        hideSalary: $scope.copyJob.hideSalary,
        salaryFrequency: $scope.copyJob.salaryFrequency,
        employmentEquityPosition: $scope.copyJob.employmentEquityPosition,
        disabilityOption: $scope.copyJob.disabilityOption,
        introduction: $scope.copyJob.introduction,
        jobDescription: $scope.copyJob.jobDescription,
        jobRequirements: $scope.copyJob.jobRequirements,
        applyOnline: $scope.copyJob.applyOnline,
        howToApply: $scope.copyJob.howToApply,
        recruiterUserID: null,
        company: null,
    };
}]);

jobAdModule.controller('JobAdViewController', ['$scope', '$state', '$uibModal', '$uibModalStack', 'JobAdsService', function ($scope, $state, $uibModal, $uibModalStack, JobAdsService) {
    $scope.jobAd = JobAdsService.GetJobAd();
    console.log($scope.jobAd);
    $scope.calculateDaysRemaining = function (_date) {
        var oneDay = 24 * 60 * 60 * 1000;	// hours*minutes*seconds*milliseconds
        var todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);
        var expiryDate = new Date(_date);
        expiryDate.setHours(0, 0, 0, 0);

        var diffDays = Math.abs((expiryDate.getTime() - todayDate.getTime()) / (oneDay));
        return diffDays;
    };
    $scope.aboutRecruiter = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/aboutRecruiter.html',
            controller: 'AboutRecruiterModalController'
        });
    };
    $scope.back = function () {
        JobAdsService.SetBackNav();
        console.log(JobAdsService.GetBackNav());
        window.history.back();
    }
}])


jobAdModule.controller('JobAdEditController', ['$scope', '$rootScope', '$state', '$stateParams', 'JobAdsService', 'RecruiterService', 'Restangular', 'Auth', 'Notification', function ($scope, $rootScope, $state, $stateParams, JobAdsService, RecruiterService, Restangular, Auth, Notification) {
    $scope.recruiter = {};
    $scope.getRecruiter = function () {
        var recruiter = Restangular.one('api/recruiters/getByUserID', Auth.GetUserID());
        recruiter.get().then(function (response) {
            if (response.data) {
                $scope.recruiter = response.data.recruiter;
                RecruiterService.SetRecruiter(response.data.recruiter);
            };
        })
    }
    
    $scope.copyJob = JobAdsService.GetJobAd();
    $scope.jobAd = {
        jobAdID: $scope.copyJob._id,
        jobTitle: $scope.copyJob.jobTitle,
        jobREF: $scope.copyJob.jobREF,
        jobLevel: $scope.copyJob.jobLevel,
        jobType: $scope.copyJob.jobType,
        companySector: $scope.copyJob.companySector,
        closingDate: new Date($scope.copyJob.closingDate),
        jobLocationTown: $scope.copyJob.jobLocationTown,
        jobLocationCountry: $scope.copyJob.jobLocationCountry,
        renumerationType: $scope.copyJob.renumerationType,
        renumerationMarketRelated: $scope.copyJob.renumerationMarketRelated,
        renumerationBenefits: $scope.copyJob.renumerationBenefits,
        salaryCurrency: $scope.copyJob.salaryCurrency,
        minimumSalary: numeral().unformat($scope.copyJob.minimumSalary),
        maximumSalary: numeral().unformat($scope.copyJob.maximumSalary),
        salaryNegotiable: $scope.copyJob.salaryNegotiable,
        hideSalary: $scope.copyJob.hideSalary,
        salaryFrequency: $scope.copyJob.salaryFrequency,
        employmentEquityPosition: $scope.copyJob.employmentEquityPosition,
        disabilityOption: $scope.copyJob.disabilityOption,
        introduction: $scope.copyJob.introduction,
        jobDescription: $scope.copyJob.jobDescription,
        jobRequirements: $scope.copyJob.jobRequirements,
        applyOnline: $scope.copyJob.applyOnline,
        howToApply: $scope.copyJob.howToApply,
        recruiterUserID: $scope.copyJob.userID
    };
    console.log($scope.jobAd);
    $scope.mode = JobAdsService.GetMode();
    $scope.jobLevelOptions = ['Management', 'Supervisory', 'Junior', 'Skilled', 'Senior', 'Executive', 'None'];
    $scope.jobTypeOptions = ['Permanent', 'Contract', 'Temporary', 'Part-Time', 'Seasonal', 'Internship', 'Volunteer'];
    $scope.companySectorOptions = ['Academic', 'Accounting and Auditing', 'Actuarial Science', 'Admin', 'Advertising', 'Agriculture', 'Architecture', 'Automotive', 'Aviation', 'Banking', 'Business Management',
        'Call Centre', 'Chemical', 'Clothing', 'Construction', 'Consulting', 'Cruise Ship', 'Defence', 'Design Services', 'E-Commerce', 'Education',
        'Engineering', 'Entertainment', 'Environmental', 'Fashion', 'Finance', 'FMCG', 'General', 'Government & Parastatals', 'Health & Safety', 'Health Fitness & Beauty',
        'Hospitality', 'Human Resources', 'Import & Export', 'Insurance', 'Internet', 'Investment', 'IT', 'Legal', 'Logistics', 'Management', 'Manufacturing',
        'Market Research', 'Marketing', 'Media', 'Medical', 'Mining', 'Motoring', 'NGO & Non-profit', 'Petrochemical', 'Pharmaceutical', 'PR & Communication',
        'Procurement', 'Property', 'Purchasing', 'Real Estate', 'Recruitment', 'Research', 'Retail', 'Sales', 'Security', 'Social Services', 'Sports', 'Stockbroking',
        'Technical', 'Technology', 'Telecommunications', 'Trades & Services', 'Travel & Tourism', 'Warehousing', 'Other'];
    $scope.jobLocationCountryOptions = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia',
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
    $scope.renumerationTypeOptions = ['Basic Salary', 'Basic Salary Plus Benefits', 'Cost to Company', 'Cost to Company Incl Benefits', 'Commission Only', 'Commission Only Plus Benefits',
            'Basic Plus Commission', 'Basic Plus Commission and Benefits', 'On Target Earnings', 'On Target Earnings Plus Benefits'];
    $scope.salaryCurrencyOptions = ['AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BOV',
        'BRL', 'BSD', 'BTN', 'BWP', 'BYR', 'BZD', 'CAD', 'CDF', 'CHE', 'CHF', 'CHW', 'CLF', 'CLP', 'CNY', 'COP', 'COU', 'CRC', 'CUP', 'CVE', 'CYP', 'CZK', 'DJF', 'DKK', 'DOP',
        'DZD', 'EEK', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'INR',
        'IQD', 'IRR', 'ISK', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LTL', 'LVL', 'LYD', 'MAD',
        'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRO', 'MTL', 'MUR', 'MVR', 'MWK', 'MXN', 'MXV', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN',
        'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SSP', 'SEK', 'SGD', 'SHP', 'SKK', 'SLL', 'SOS', 'SRD', 'STD', 'SYP',
        'SZL', 'THB', 'TJS', 'TMM', 'TND', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'USN', 'USS', 'UYU', 'UZS', 'VEB', 'VND', 'VUV', 'WST', 'XAF', 'XCD', 'XOF', 'XPF',
        'YER', 'R', 'ZMK', 'ZWD'];
    $scope.salaryFrequencyOptions = ['Per Hour', 'Per Day', 'Per Week', 'Per Month', 'Per Year', 'Once off'];
    $scope.disabilityCandidatesOptions = ['Yes', 'No', 'Only'];
    $scope.previewJobAd = function () {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        if (today > $scope.jobAd.closingDate.setHours(0, 0, 0, 0)) {
            Notification.error({ message: 'Closing date must be in the future!', title: 'Closing date error' });
            return;
        }
        if (!$scope.jobAd.applyOnline && !$scope.jobAd.howToApply) {
            Notification.error({ message: 'Please add how to apply instructions!', title: 'How to apply error' });
            return;
        }
        JobAdsService.SetJobAd($scope.jobAd);
        console.log($scope.jobAd);
        $state.go('recruiter.previewEditJobAd');
    };
    
    $scope.openDatePicker = function ($event) {
        $scope.datePickerOpened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.jobAd.closingDate = new Date(year, month, day);
    };
    $scope.todayDate = function () {
        $scope.jobAd.closingDate = new Date();
    };
    $scope.clear = function () {
        $scope.jobAd.closingDate = null;
    };
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };
    $scope.back = function () {
        window.history.back();
    }
}])