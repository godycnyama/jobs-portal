var personalModule = angular.module('personalModule',[]);

personalModule.controller('PersonalController', ['$scope', '$state', '$stateParams', '$uibModal', '$uibModalStack', '$timeout', 'Restangular', 'JobSeekerService', 'Auth', 'ModalService', 'Notification', function ($scope, $state, $stateParams, $uibModal, $uibModalStack, $timeout, Restangular, JobSeekerService, Auth, ModalService, Notification) {
    $scope.personal = $scope.iniPersonalDetail;
    $scope.requiredMinimumSalary = '';
    $scope.requiredMaximumSalary = '';
    $scope.genderOptions = ['Male', 'Female'];
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
    $scope.locationCountryOptions = ['Afghanistan','Albania','Algeria','Andorra','Angola','Antigua and Barbuda','Argentina','Armenia','Aruba','Australia',
        'Austria','Azerbaijan','Bahamas, The','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bhutan','Bolivia','Bosnia and Herzegovina',
        'Botswana','Brazil','Brunei', 'Bulgaria','Burkina Faso','Burma','Burundi','Cambodia','Cameroon','Canada','Cape Verde','Central African Republic',
        'Chad','Chile','China','Colombia','Comoros','Congo, Democratic Republic of the','Congo, Republic of the','Costa Rica',"Cote d'Ivoire",'Croatia',
        'Cuba','Curacao','Cyprus','Czech Republic','Denmark','Djibouti','Dominica','Dominican Republic','East Timor','Ecuador','Egypt','El Salvador',
        'Equatorial Guinea','Eritrea','Estonia','Ethiopia','Fiji','Finland','France','Gabon','Gambia, The','Georgia','Germany','Ghana','Greece','Grenada',
        'Guatemala','Guinea','Guinea-Bissau','Guyana','Haiti','Holy See','Honduras','Hong Kong','Hungary','Iceland','India','Indonesia','Iran','Iraq',
        'Ireland','Israel','Italy','Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kiribati','Kosovo','Kuwait','Kyrgyzstan',
        'Laos','Latvia','Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg', 'Macau','Macedonia','Madagascar','Malawi',
        'Malaysia','Maldives','Mali','Malta','Marshall Islands','Mauritania','Mauritius','Mexico','Micronesia','Moldova','Monaco','Mongolia','Montenegro',
        'Morocco','Mozambique','Namibia','Nauru','Nepal','Netherlands','Netherlands Antilles','New Zealand','Nicaragua','Niger','Nigeria','North Korea',
        'Norway', 'Oman','Pakistan','Palau','Palestinian Territories','Panama','Papua New Guinea','Paraguay','Peru','Philippines','Poland','Portugal',
        'Qatar','Romania','Russia','Rwanda','Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines','Samoa','San Marino','Sao Tome and Principe',
        'Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore','Sint Maarten','Slovakia','Slovenia','Solomon Islands','Somalia',
        'South Africa','South Korea','South Sudan','Spain','Sri Lanka','Sudan','Suriname','Swaziland','Sweden','Switzerland','Syria','Taiwan','Tajikistan',
        'Tanzania','Thailand','Timor-Leste','Togo','Tonga','Trinidad and Tobago','Tunisia','Turkey','Turkmenistan','Tuvalu','Uganda','Ukraine','United Arab Emirates',
        'United Kingdom', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam','Yemen','Zambia','Zimbabwe'];    
    $scope.noticeOptions = ['1 Week', '2 Weeks', '1 Month','3 Months'];   
    $scope.currencyOptions = [ 'AED','AFN','ALL','AMD','ANG','AOA','ARS','AUD','AWG','AZN','BAM','BBD','BDT','BGN','BHD','BIF','BMD','BND','BOB','BOV',
        'BRL','BSD','BTN','BWP','BYR','BZD','CAD','CDF','CHE','CHF','CHW','CLF','CLP','CNY','COP','COU','CRC','CUP','CVE','CYP','CZK','DJF','DKK','DOP',
        'DZD','EEK','EGP','ERN','ETB','EUR','FJD','FKP','GBP','GEL','GHS','GIP','GMD','GNF','GTQ','GYD','HKD','HNL','HRK','HTG','HUF','IDR','ILS','INR',
        'IQD','IRR','ISK','JMD','JOD','JPY','KES','KGS','KHR','KMF','KPW','KRW','KWD','KYD','KZT','LAK','LBP','LKR','LRD','LSL','LTL','LVL','LYD','MAD',
        'MDL','MGA','MKD','MMK','MNT','MOP','MRO','MTL','MUR','MVR','MWK','MXN','MXV','MYR','MZN','NAD','NGN','NIO','NOK','NPR','NZD','OMR','PAB','PEN',
        'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SSP', 'SEK', 'SGD', 'SHP', 'SKK', 'SLL', 'SOS', 'SRD', 'STD', 'SYP',
        'SZL','THB', 'TJS', 'TMM', 'TND', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'USN', 'USS', 'UYU', 'UZS', 'VEB', 'VND', 'VUV', 'WST', 'XAF', 'XCD', 'XOF', 'XPF',
        'YER', 'R', 'ZMK', 'ZWD'];    
    $scope.photoImage = null;
    /*
    $scope.currentFile = ''
    $scope.setFile = function (element) {
        $scope.currentFile = element.files[0];
        var reader = new FileReader();
        reader.onload = function (event) {
            $scope.personal.photo = event.target.result
            $scope.$apply()
        }
        // when the file is read it triggers the onload event above.
        reader.readAsDataURL(element.files[0]);
    };
    */
    $scope.openDatePicker = function ($event) {
        $scope.datePickerOpened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.personal.birthDate = new Date(year, month, day);
    };
    $scope.todayDate = function () {
        $scope.personal.birthDate = new Date();
    };
    $scope.clear = function () {
        $scope.personal.birthDate = '';
    };
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };
    
    $scope.save = function () {
        $scope.personal.requiredMinimumSalary = numeral().unformat($scope.requiredMinimumSalary);
        $scope.personal.requiredMaximumSalary = numeral().unformat($scope.requiredMaximumSalary);  
        ModalService.SetTitle('Add Personal Details')
        ModalService.SetMessage('Adding personal details,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //post  to /jobSeekers
        var JobSeekers = Restangular.all('api/jobSeekers');
        JobSeekers.post($scope.personal).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                Notification.success({ message: response.data.message, title: 'Add Personal Details' });
                $state.go('profile.master');
            }

        })
    };
    $scope.updatePersonalDetails = function () {
        var personal = {
            firstName: $scope.personal.firstName,
            middleName: $scope.personal.middleName,
            lastName: $scope.personal.lastName,
            gender: $scope.personal.gender,
            birthDate: $scope.personal.birthDate,
            nationality: $scope.personal.nationality,
            mainQualification: $scope.personal.mainQualification,
            profession: $scope.personal.profession,
            introduction: $scope.personal.introduction,
            homeTel: $scope.personal.homeTel,
            workTel: $scope.personal.workTel,
            mobile: $scope.personal.mobile,
            email: $scope.personal.email,
            address: $scope.personal.address,
            locationTown: $scope.personal.locationTown,
            locationCountry: $scope.personal.locationCountry,
            linkedInProfile: $scope.personal.linkedInProfile,
            website: $scope.personal.website,
            professionalAffiliations: $scope.personal.professionalAffiliations, 
            noticePeriod: $scope.personal.noticePeriod,
            requiredSalaryCurrency: $scope.personal.requiredSalaryCurrency,
            requiredMinimumSalary: $scope.personal.requiredMinimumSalary,
            requiredMaximumSalary: $scope.personal.requiredMaximumSalary,
            photo: $scope.personal.photo,
            preferredJobTitles: $scope.personal.preferredJobTitles,
            preferredJobTypes: $scope.personal.preferredJobTypes,
            preferredJobLocations: $scope.personal.preferredJobLocations
        };
        ModalService.SetTitle('Update Personal Details')
        ModalService.SetMessage('Updating personal details,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //put  to /jobSeekers/email
        var JobSeeker = Restangular.one('api/jobSeekers', $scope.personal.email);
        JobSeeker.customPUT(personal).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                Notification.success({ message: response.data.message, title: 'Update Personal Details' });
                $state.go('profile.master');
            }

        })       
    };

    $scope.iniPersonalDetail = {
        userID: Auth.GetUserID(),
        firstName: null,
        middleName: null,
        lastName: null,
        gender: 'Male',
        birthDate: null,
        profession: null,
        mainQualification: null,
        introduction: null,
        homeTel: null,
        workTel: null,
        mobile: null,
        email: Auth.GetUserEmail(),
        address: null,
        locationTown: null,
        locationCountry: 'South Africa',
        linkedInProfile: null,
        website: null,
        professionalAffiliations: null,
        nationality: 'South Africa',
        noticePeriod: '1 Month',
        requiredSalaryCurrency: 'R',
        requiredMinimumSalary: null,
        requiredMaximumSalary: null,
        preferredJobTitles: null,
        preferredJobTypes: null,
        preferredJobLocations: null,
        photo: null,
    };
    
}])

personalModule.controller('PersonalEditController', ['$scope', '$state', '$stateParams', '$uibModal', '$uibModalStack', '$timeout', 'Restangular', 'Upload', 'JobSeekerService', 'Auth', 'ModalService', 'Notification', function ($scope, $state, $stateParams, $uibModal, $uibModalStack, $timeout, Restangular, Upload, JobSeekerService, Auth, ModalService, Notification) {
    $scope.personal = JobSeekerService.GetJobSeeker();
    $scope.requiredMinimumSalary = $scope.personal.requiredMinimumSalary;
    $scope.requiredMaximumSalary = $scope.personal.requiredMaximumSalary;
    $scope.birthDate = new Date($scope.personal.birthDate);
    $scope.back = function () {
        window.history.back();
    };
    $scope.genderOptions = ['Male', 'Female'];
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
    $scope.noticeOptions = ['1 Week', '2 Weeks', '1 Month', '3 Months'];
    $scope.currencyOptions = ['AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BOV',
        'BRL', 'BSD', 'BTN', 'BWP', 'BYR', 'BZD', 'CAD', 'CDF', 'CHE', 'CHF', 'CHW', 'CLF', 'CLP', 'CNY', 'COP', 'COU', 'CRC', 'CUP', 'CVE', 'CYP', 'CZK', 'DJF', 'DKK', 'DOP',
        'DZD', 'EEK', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'INR',
        'IQD', 'IRR', 'ISK', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LTL', 'LVL', 'LYD', 'MAD',
        'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRO', 'MTL', 'MUR', 'MVR', 'MWK', 'MXN', 'MXV', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN',
        'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SSP', 'SEK', 'SGD', 'SHP', 'SKK', 'SLL', 'SOS', 'SRD', 'STD', 'SYP',
        'SZL', 'THB', 'TJS', 'TMM', 'TND', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'USN', 'USS', 'UYU', 'UZS', 'VEB', 'VND', 'VUV', 'WST', 'XAF', 'XCD', 'XOF', 'XPF',
        'YER', 'R', 'ZMK', 'ZWD'];
    $scope.photoImage = null;
    $scope.photo = null;
    /*
    $scope.currentFile = ''
    $scope.setFile = function (element) {
        $scope.currentFile = element.files[0];
        var reader = new FileReader();
        reader.onload = function (event) {
            $scope.personal.photo = event.target.result
            $scope.$apply()
        }
        // when the file is read it triggers the onload event above.
        reader.readAsDataURL(element.files[0]);
    };
    */
    $scope.openDatePicker = function ($event) {
        $scope.datePickerOpened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.birthDate = new Date(year, month, day);
    };
    $scope.todayDate = function () {
        $scope.birthDate = new Date();
    };
    $scope.clear = function () {
        $scope.birthDate = '';
    };
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.updatePersonalDetails = function () {
        if ($scope.photo) {
            $scope.personal.photo = $scope.photo
        };
        if ($scope.birthDate) {
            $scope.personal.birthDate = $scope.birthDate;
        };
        
        var personal = {
            firstName: $scope.personal.firstName,
            middleName: $scope.personal.middleName,
            lastName: $scope.personal.lastName,
            gender: $scope.personal.gender,
            birthDate: $scope.personal.birthDate,
            nationality: $scope.personal.nationality,
            mainQualification: $scope.personal.mainQualification,
            profession: $scope.personal.profession,
            introduction: $scope.personal.introduction,
            homeTel: $scope.personal.homeTel,
            workTel: $scope.personal.workTel,
            mobile: $scope.personal.mobile,
            email: $scope.personal.email,
            address: $scope.personal.address,
            locationTown: $scope.personal.locationTown,
            locationCountry: $scope.personal.locationCountry,
            linkedInProfile: $scope.personal.linkedInProfile,
            website: $scope.personal.website,
            professionalAffiliations: $scope.personal.professionalAffiliations,
            noticePeriod: $scope.personal.noticePeriod,
            requiredSalaryCurrency: $scope.personal.requiredSalaryCurrency,
            requiredMinimumSalary: numeral().unformat($scope.requiredMinimumSalary),
            requiredMaximumSalary: numeral().unformat($scope.requiredMaximumSalary),
            photo: $scope.photo || $scope.personal.photo,
            preferredJobTitles: $scope.personal.preferredJobTitles,
            preferredJobTypes: $scope.personal.preferredJobTypes,
            preferredJobLocations: $scope.personal.preferredJobLocations
        };
        ModalService.SetTitle('Update Personal Details')
        ModalService.SetMessage('Updating personal details,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //put  to /jobSeekers/email
        var JobSeeker = Restangular.one('api/jobSeekers', $scope.personal.email);
        JobSeeker.customPUT(personal).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                Notification.success({ message: response.data.message, title: 'Update Personal Details' });
                $state.go('profile.master');
            }

        })
    };
}])