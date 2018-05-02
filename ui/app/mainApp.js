var myApp = angular.module('myApp', ['ui.router', 'ngAnimate', 'asideModule', 'ui-notification', '720kb.fx', 'angular-price-format', 'textAngular', 'angularTrix', 'restangular', 'btford.socket-io', 'ui.bootstrap', 'vAccordion',
    'ngMessages', 'ngFileUpload', 'ngImgCrop', 'validation.match', 'jkuri.checkbox', 'intellectual-tech.UIControls', 'angular-jwt', 'ui.utils.masks', 'ui.mask','ngFileSaver',
    'angular-storage', 'ngStorage', 'bootstrap.fileField', 'simplePagination', 'angularUtils.directives.dirPagination', 'startControllerModule', 'modalModule', 'modalServiceModule', 'jobsServiceModule', 'jobsModule', 'jobsModalsModule', 'jobModule', 'jobApplyModule',
    'adminJobAdsModule', 'adminJobAdModule', 'adminJobSeekersModule', 'adminJobSeekerModule','adminRecruitersModule', 'adminRecruiterModule', 'adminOrdersModule','adminRecruiterCandidatesModule',
    'adminModalsModule', 'pricesModule', 'setPriceModule', 'editPriceModule', 'adminServiceModule','adminUsersModule','adminJobApplicationsModule',
    'signupModule', 'signinModule', 'passwordChangeModule', 'passwordResetModule', 'loginModalModule', 'authServiceModule', 'signInUpModalsModule', 'profileModule',
    'cvModule','attachmentModule','qualificationModule','jobSeekerModalsModule',
    'employmentModule', 'languageModule', 'personalModule', 'skillModule', 'refereeModule', 'vaccordionModule', 'jobSeekerServiceModule',
    'jobAdsModule', 'jobAdModule', 'previewJobAdModule', 'previewEditJobAdModule', 'jobAdsServiceModule', 'jobAdsRESTserviceModule', 'socketIOservice', 'checkOutModule',
    'recruiterDetailsModule','ordersAddToModule', 'recruiterServiceModule', 'cartServiceModule', 'candidatesModule', 'mycandidatesModule', 'candidatesServiceModule', 'candidateModule',
    'candidatePrintModule', 'recruiterOrdersModule', 'questionnairesModule', 'questionnaireModule', 'searchOrderModule', 'jobApplicationsModule', 'jobApplicationsServiceModule', 'jobAdOrderServiceModule', 'masterDetailServiceModule']);
myApp.config(['$stateProvider', '$urlRouterProvider', 'RestangularProvider', '$httpProvider', 'jwtOptionsProvider', '$locationProvider', 'paginationTemplateProvider', 'NotificationProvider', function ($stateProvider, $urlRouterProvider, RestangularProvider, $httpProvider, jwtOptionsProvider, $locationProvider, paginationTemplateProvider, NotificationProvider) {
    //set html5mode to true
    //$locationProvider.html5Mode(true);
    //
    // For any unmatched url, redirect to /start
    $urlRouterProvider.otherwise("/start");
    //  
    // Now set up the states
    $stateProvider
      .state('start', {
          url: "/start",
          templateUrl: "app/start.html",
          controller: "StartController",
          data: {
              requireLogin: false
          }
      })
      .state('contact', {
          url: "/contact",
          templateUrl: "app/common/contact.html",
          data: {
              requireLogin: false
          }
      })
      .state('howitworks', {
          url: "/howitworks",
          templateUrl: "app/common/howitworks.html",
          data: {
              requireLogin: false
          }
      })
      .state('admin', {
          url: "/admin",
          abstract: true,
          template: '<div class="app-view" ui-view></div>',
          data: {
              requireLogin: true
          }
      })
      .state('admin.Master', {
          url: "",
          templateUrl: "app/admin/views/adminMaster.html"
      })
      .state('admin.jobAds', {
          url: "/admin-jobads",
          templateUrl: "app/admin/views/adminJobAds.html",
          controller: "AdminJobAdsController"
      })
      .state('admin.jobAd', {
          url: "/admin-jobad",
          templateUrl: "app/admin/views/adminJobAd.html",
          controller: "AdminJobAdController"
      })
      .state('admin.jobSeekers', {
          url: "/admin-jobseekers",
          templateUrl: "app/admin/views/adminJobSeekers.html",
          controller: "AdminJobSeekersController"
      })
      .state('admin.jobSeeker', {
          url: "/admin-jobseeker",
          templateUrl: "app/admin/views/adminJobSeeker.html",
          controller: "AdminJobSeekerController"
      })
      .state('admin.users', {
          url: "/admin-users",
          templateUrl: "app/admin/views/adminUsers.html",
          controller: "AdminUsersController"
      })
      .state('admin.recruiters', {
          url: "/admin-recruiters",
          templateUrl: "app/admin/views/adminRecruiters.html",
          controller: "AdminRecruitersController"
      })
      .state('admin.viewRecruiter', {
          url: "/admin-recruiter",
          templateUrl: "app/admin/views/adminRecruiter.html",
          controller: "AdminRecruiterController"
      })
      .state('admin.prices', {
          url: "/admin-prices",
          templateUrl: "app/admin/views/adminPrices.html",
          controller: "PricesController"
      })
      .state('admin.setPrice', {
          url: "/admin-set-price",
          templateUrl: "app/admin/views/setAdvertPrice.html",
          controller: "SetPriceController"
      })
      .state('admin.editPrice', {
          url: "/admin-edit-price",
          templateUrl: "app/admin/views/editAdvertPrice.html",
          controller: "EditPriceController"
      })
      .state('admin.orders', {
          url: "/admin-orders",
          templateUrl: "app/admin/views/adminOrders.html",
          controller: "AdminOrdersController"
      })
      .state('admin.order', {
          url: "/admin-order",
          templateUrl: "app/admin/views/adminOrder.html",
          controller: "AdminOrderController"
      })
      .state('admin.jobApplications', {
          url: "/admin-job-applications",
          templateUrl: "app/admin/views/adminJobApplications.html",
          controller: "AdminJobApplicationsController"
      })
      .state('admin.jobApplication', {
          url: "/admin-job-application",
          templateUrl: "app/admin/views/adminJobApplication.html",
          controller: "AdminJobApplicationController"
      })
      .state('admin.recruiterCandidates', {
          url: "/admin-recruiter-candidates",
          templateUrl: "app/admin/views/adminRecruiterCandidates.html",
          controller: "RecruiterCandidatesController"
      })
      .state('auth', {
          url: "/auth",
          abstract: true,
          template: '<div class="app-view" ui-view></div>',
          data: {
              requireLogin: false
          }
      })
      .state('auth.signin', {
          url: "",
          templateUrl: "app/auth/views/signin.html",
          controller: "SigninController"
      })
      .state('auth.signupRecruiter0', {
          url: "/signup-recruiter",
          templateUrl: "app/auth/views/recruiterSignup0.html",
          controller: "SignupRecruiterControllerx"
      })
      .state('auth.signupJobseeker0', {
          url: "/signup-jobseeker",
          templateUrl: "app/auth/views/jobSeekerSignup.html",
          controller: "SignupJobSeekerControllerx"
      })
      .state('auth.changePassword', {
          url: "/change-password",
          templateUrl: "app/auth/views/changePassword.html",
          controller: "PasswordChangeController"
      })
      .state('auth.resetPasswordS', {
          url: "/reset-password",
          templateUrl: "app/auth/views/resetPasswordS.html",
          controller: "PasswordResetWithQuestionController"
      })
      .state('auth.terms', {
          url: "/terms",
          templateUrl: "app/auth/views/terms.html"
      })
      .state('auth.privacy', {
          url: "/privacy",
          templateUrl: "app/auth/views/privacy.html"
      })
      .state('jobs', {
          url: "/jobs",
          abstract: true,
          template: '<div class="app-view" ui-view></div>',
          data: {
              requireLogin: false
          }
      })
      .state('jobs.master', {
          url: "",
          templateUrl: "app/jobs/views/jobsMaster.html",
          controller: "JobsController",
          data: {
              requireLogin: false
          }
      })
      .state('jobs.job', {
          url: "/job",
          templateUrl: "app/jobs/views/job.html",
          controller: "JobController",
          data: {
              requireLogin: false
          }
      })
      .state('jobs.jobApply', {
          url: "/job-apply",
          templateUrl: "app/jobs/views/jobApply.html",
          controller: "JobApplyController",
          data: {
              requireLogin: true
          }
      })
      .state('jobs.jobApplySuccess', {
          url: "/job-apply-success",
          templateUrl: "app/jobs/views/jobApplySuccess.html",
          data: {
              requireLogin: true
          }
      })
        .state('jobs.jobApplyError', {
            url: "/job-apply-error",
            templateUrl: "app/jobs/views/jobApplyError.html",    //show in modal,
            data: {
                requireLogin: true
            }
        })
      .state('profile', {
          url: "/profile",
          abstract: true,
          template: '<div class="app-view" ui-view></div>',
          data: {
              requireLogin: true
          }
      })
      .state('profile.master', {
          url: "",
          templateUrl: "app/jobSeekers/views/profileMaster.html",
          controller: "ProfileController"
      })
      .state('profile.personalCreate', {
          url: "/personal-create",
          templateUrl: "app/jobSeekers/views/personalCreate.html",
          controller: "PersonalController"
      })
      .state('profile.personalEdit', {
          url: "/personal-edit",
          templateUrl: "app/jobSeekers/views/personalEdit.html",
          controller: "PersonalController"
      })
      .state('profile.qualificationCreate', {
          url: "/qualification-create",
          templateUrl: "app/jobSeekers/views/qualificationCreate.html",
          controller: "QualificationController"
      })
      .state('profile.qualificationEdit', {
          url: "/qualification-edit",
          templateUrl: "app/jobSeekers/views/qualificationEdit.html",
          controller: "QualificationController"
      })
      .state('profile.skillCreate', {
          url: "/skill-create",
          templateUrl: "app/jobSeekers/views/skillCreate.html",
          controller: "SkillController"
      })
      .state('profile.skillEdit', {
          url: "/skill-edit",
          templateUrl: "app/jobSeekers/views/skillEdit.html",
          controller: "SkillController"
      })
      .state('profile.employmentCreate', {
          url: "/employment-create",
          templateUrl: "app/jobSeekers/views/employmentCreate.html",
          controller: "EmploymentController"
      })
      .state('profile.employmentEdit', {
          url: "/employment-edit",
          templateUrl: "app/jobSeekers/views/employmentEdit.html",
          controller: "EmploymentController"
      })
      .state('profile.languageCreate', {
          url: "/language-create",
          templateUrl: "app/jobSeekers/views/languageCreate.html",
          controller: "LanguageController"
      })
      .state('profile.languageEdit', {
          url: "/language-edit",
          templateUrl: "app/jobSeekers/views/languageEdit.html",
          controller: "LanguageController"
      })
      .state('profile.refereeCreate', {
          url: "/referee-create",
          templateUrl: "app/jobSeekers/views/refereeCreate.html",
          controller: "RefereeController"
      })
      .state('profile.refereeEdit', {
          url: "/referee-edit",
          templateUrl: "app/jobSeekers/views/refereeEdit.html",
          controller: "RefereeEditController"
      })
      .state('profile.cv', {
          url: "/cv",
          templateUrl: "app/jobSeekers/views/cv.html",
          controller: "CVController"
      })
      .state('profile.attachment', {
          url: "/attachment",
          templateUrl: "app/jobSeekers/views/attachment.html",
          controller: "AttachmentController"
      })
      .state('advertPrices', {
          url: "/advert-prices",
          templateUrl: "app/recruiter/views/advertisingPrices.html",
          data: {
              requireLogin: false
          }
      })
      .state('recruiter', {
          url: "/recruiter",
          abstract: true,
          template: '<div class="app-view" ui-view></div>',
          data: {
              requireLogin: true
          }
      })
      .state('recruiter.details', {
          url: "",
          templateUrl: "app/recruiter/views/recruiterDetails.html",
          controller: "RecruiterDetailsController"
      })
      .state('recruiter.detailsCreate', {
          url: "/recruiter-details-create",
          templateUrl: "app/recruiter/views/recruiterDetailsCreate.html",
          controller: "RecruiterDetailsCreateController"
      })
      .state('recruiter.detailsEdit', {
          url: "/recruiter-details-edit",
          templateUrl: "app/recruiter/views/recruiterDetailsEdit.html",
          controller: "RecruiterDetailsController"
      })
      .state('recruiter.jobAdsMaster', {
          url: "/job-ads-master",
          templateUrl: "app/recruiter/views/jobAdsMaster.html",
          controller: "JobAdsController"
      })
      .state('recruiter.createJobAd', {
          url: "/create-jobad",
          templateUrl: "app/recruiter/views/createJobAd.html",
          controller: "JobAdController"
      })
      .state('recruiter.viewJobAd', {
          url: "/view-jobad",
          templateUrl: "app/recruiter/views/viewJobAd.html",
          controller: "JobAdViewController"
      })
      .state('recruiter.editJobAd', {
          url: "/edit-jobad",
          templateUrl: "app/recruiter/views/editJobAd.html",
          controller: "JobAdEditController"
      })
      .state('recruiter.previewJobAd', {
          url: "/preview-jobad",
          templateUrl: "app/recruiter/views/previewJobAd.html",
          controller: "JobAdController"
      })
      .state('recruiter.previewEditJobAd', {
          url: "/preview-edit-jobad",
          templateUrl: "app/recruiter/views/previewEditJobAd.html",
          controller: "PreviewEditJobAdController"
      })
      .state('recruiter.questionnairesMaster', {
          url: "/questionnaires-master",
          templateUrl: "app/recruiter/views/questionnairesMaster.html",
          controller: "QuestionnairesController"
      })
      .state('recruiter.editQuestionnaire', {
          url: "/edit-questionnaire",
          templateUrl: "app/recruiter/views/editQuestionnaire.html",
          controller: "QuestionnaireController"
      })
      .state('recruiter.createQuestionnaire', {
          url: "/create-questionnaire",
          templateUrl: "app/recruiter/views/createQuestionnaire.html",
          controller: "CreateQuestionnaireController"
      })
      .state('recruiter.previewQuestionnaire', {
          url: "/preview-questionnaire",
          templateUrl: "app/recruiter/views/previewQuestionnaire.html"
      })
      .state('recruiter.searchOrderCreate', {
          url: "/search-order-create",
          templateUrl: "app/recruiter/views/searchOrderCreate.html",
          controller: "SearchOrderController"

      })
      .state('recruiter.ordersAddTo', {
          url: "/add-to-orders",
          templateUrl: "app/recruiter/views/ordersAddTo.html",
          controller: "OrdersAddToController"
      })
      .state('recruiter.orderAddTo', {
          url: "/add-to-order",
          templateUrl: "app/recruiter/views/orderAddTo.html",
          controller: "OrderAddToController"
      })
      .state('recruiter.orders', {
          url: "/recruiter-orders",
          templateUrl: "app/recruiter/views/recruiterOrders.html",
          controller: "RecruiterOrdersController"
      })
      .state('recruiter.order', {
          url: "/recruiter-order",
          templateUrl: "app/recruiter/views/order.html",
          controller: "RecruiterOrderController"
      })
      .state('recruiter.searchOrderEdit', {
          url: "/search-order-edit",
          templateUrl: "app/recruiter/views/searchOrderEdit.html",
          controller: "SearchOrderController"
      })
      .state('recruiter.checkOutOrder', {
          url: "/checkout-order",
          templateUrl: "app/recruiter/views/checkOutOrder.html",
          controller: "CheckOutOrderController"

      })
      .state('recruiter.checkOutSearchOrder', {
          url: "/checkout-searchorder",
          templateUrl: "app/recruiter/views/checkOutSearchOrder.html",
          controller: "CheckOutSearchOrderController"

      })
      .state('recruiter.orderSuccess', {
          url: "/order-success",
          templateUrl: "app/recruiter/views/orderSuccess.html",
          controller: "OrderSuccessController",
          data: {
              requireLogin: false
          }

      })
      .state('recruiter.candidates', {
          url: "/candidates",
          templateUrl: "app/recruiter/views/candidates.html",
          controller: "CandidatesController"
      })
      .state('recruiter.myCandidates', {
          url: "/myCandidates",
          templateUrl: "app/recruiter/views/myCandidates.html",
          controller: "MyCandidatesController"
      })
      .state('recruiter.candidateProfile', {
          url: "/candidates-profile",
          templateUrl: "app/recruiter/views/profile.html",
          controller: "CandidateController"
      })
      .state('recruiter.candidateProfilePrint', {
          url: "/candidates-profile-print",
          templateUrl: "app/recruiter/views/profilePrint.html",
          controller: "CandidateController"
      })
      .state('recruiter.myCandidateProfile', {
          url: "/myCandidates-profile",
          templateUrl: "app/recruiter/views/profileMyCandidate.html",
          controller: "MyCandidateController"
      })
      .state('recruiter.myCandidateProfilePrint', {
          url: "/myCandidates-profile-print",
          templateUrl: "app/recruiter/views/profilePrintMyCandidate.html",
          controller: "MyCandidateController"
      })
      .state('recruiter.jobApplications', {
          url: "/recruiter-job-applications",
          templateUrl: "app/recruiter/views/jobApplications.html",
          controller: "JobApplicationsController"
      })
      .state('recruiter.jobApplication', {
          url: "/recruiter-job-application",
          templateUrl: "app/recruiter/views/jobApplication.html",
          controller: "JobApplicationController"
      });
   
    RestangularProvider.setFullResponse(true);
    RestangularProvider.setRestangularFields({
        id: "_id"
    });
    // add a response interceptor
    RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
        var extractedData;
        // .. to look for getList operations
        if (operation === "getList") {
            // .. and handle the data and meta data
            extractedData = data.data;
            extractedData.total = data.total;
            extractedData.perPage = data.perPage;
            extractedData.pageNo = data.pageNo;

        } else {
            extractedData = data;
        }
        return extractedData;
    });
    var domainHost = window.location.origin;
    jwtOptionsProvider.config({
        tokenGetter: ['store', function (store) {
            return store.get('id_token');
        }],
        /*
        unauthenticatedRedirector: ['$state', function ($state) {
            $state.go('auth.signin');
        }],
        */
        whiteListedDomains: [domainHost]
    });

    $httpProvider.interceptors.push('jwtInterceptor');
    $httpProvider.interceptors.push(function ($timeout, $q, $injector) {
        var loginModalService, $http, $state;

        // this trick must be done so that we don't receive
        // `Uncaught Error: [$injector:cdep] Circular dependency found`
        $timeout(function () {
            loginModalService = $injector.get('loginModalService');
            $http = $injector.get('$http');
            $state = $injector.get('$state');
            $uibModalStack = $injector.get('$uibModalStack');
            Notification = $injector.get('Notification');
        });

        return {
            responseError: function (rejection) {
                if (rejection.status !== 401) {
                    $uibModalStack.dismissAll();
                    Notification.error({ message: rejection.data.message, title: 'Error' });
                    return rejection;
                }

                var deferred = $q.defer();

                loginModalService()
                  .then(function () {
                      rejection.status = 200;
                      deferred.resolve($http(rejection.config));
                  })
                  .catch(function (response) {                    
                     // $state.go('start');
                      deferred.reject(rejection);
                  });

                return deferred.promise;
            }
        };
    });
    paginationTemplateProvider.setPath('app/common/customPagination.tpl.html');
    NotificationProvider.setOptions({
        delay: 5000,
        startTop: 30,
        startRight: 10,
        verticalSpacing: 20,
        horizontalSpacing: 20,
        positionX: 'center',
        positionY: 'top'
    });
}]);

myApp.run(['authManager', '$http', '$state', 'Restangular', 'store', '$rootScope', 'loginModalService', '$templateRequest', '$window', '$location', function (authManager, $http, $state, Restangular, store, $rootScope, loginModalService, $templateRequest, $window, $location) {
    authManager.checkAuthOnRefresh();
   // authManager.redirectWhenUnauthenticated();
   // $http.defaults.headers.common.Authorization = "Bearer " + store.get('id_token');
    // Restangular.setDefaultHeaders({ Authorization: "Bearer " + store.get('id_token') })
    $window.ga('create', 'UA-100588482-1', 'auto');
    $rootScope.$on('$stateChangeSuccess', function (event) {
        $window.ga('send', 'pageview', $location.path());
    });
    $rootScope.stateChange = false;
    $rootScope.$on('$stateChangeStart',function(event,toState,toParams){
        var requireLogin = toState.data.requireLogin;
        if (requireLogin && !authManager.isAuthenticated()) {
            event.preventDefault();
            //get login modal
            loginModalService().then(function () {
          return $state.go(toState.name, toParams);
        })
        .catch(function () {
            return $state.go('start');
        });
      }
    });
    $rootScope.$on('$stateChangeStart', function () {
        $rootScope.stateChange = true;
    });
    $rootScope.$on('$stateChangeSuccess', function () {
        $rootScope.stateChange = false;
    });

    $templateRequest('/app/start.html', true);
    $templateRequest('/app/jobs/views/jobsMaster.html', true);
    $templateRequest('/app/jobs/views/job.html', true);
    $templateRequest('/app/jobs/views/jobApply.html', true);
    $templateRequest('/app/recruiter/views/advertisingPrices.html', true);
    $templateRequest('/app/auth/views/loginModal.html', true);
    $templateRequest('/app/modals/modal.html', true);
    $templateRequest('/app/modals/messageModal.html', true);
    $templateRequest('/app/common/customPagination.tpl.html', true);
    $templateRequest('/app/common/contact.html', true);
    $templateRequest('/app/auth/views/recruiterSignup0.html', true);
    $templateRequest('/app/auth/views/jobSeekerSignup.html', true);
    $templateRequest('/app/auth/views/changePassword.html', true);
    $templateRequest('/app/auth/views/resetPasswordS.html', true);
    $templateRequest('/app/auth/views/terms.html', true);
    $templateRequest('/app/auth/views/privacy.html', true); ////////
    $templateRequest('/app/jobSeekers/views/profileMaster.html', true);
    $templateRequest('/app/jobSeekers/views/personalCreate.html', true);
    $templateRequest('/app/jobSeekers/views/personalEdit.html', true);
    $templateRequest('/app/jobSeekers/views/qualificationCreate.html', true);
    $templateRequest('/app/jobSeekers/views/qualificationEdit.html', true);
    $templateRequest('/app/jobSeekers/views/skillCreate.html', true);
    $templateRequest('/app/jobSeekers/views/skillEdit.html', true);
    $templateRequest('/app/jobSeekers/views/employmentCreate.html', true);
    $templateRequest('/app/jobSeekers/views/employmentEdit.html', true);
    $templateRequest('/app/jobSeekers/views/languageCreate.html', true);
    $templateRequest('/app/jobSeekers/views/languageEdit.html', true);
    $templateRequest('/app/jobSeekers/views/refereeCreate.html', true);
    $templateRequest('/app/jobSeekers/views/refereeEdit', true);
    $templateRequest('/app/jobSeekers/views/cv.html', true);
    $templateRequest('/app/jobSeekers/views/attachment.html', true);////////
    $templateRequest('/app/recruiter/views/recruiterDetails.html', true);
    $templateRequest('/app/recruiter/views/recruiterDetailsEdit.html', true);
    $templateRequest('/app/recruiter/views/jobAdsMaster.html', true);
    $templateRequest('/app/recruiter/views/createJobAd.html', true);
    $templateRequest('/app/recruiter/views/viewJobAd.html', true);
    $templateRequest('/app/recruiter/views/editJobAd.html', true);
    $templateRequest('/app/recruiter/views/previewJobAd.html', true);
    $templateRequest('/app/recruiter/views/previewEditJobAd.html', true);
    $templateRequest('/app/recruiter/views/searchOrderCreate.html', true);
    $templateRequest('/app/recruiter/views/ordersAddTo.html', true);
    $templateRequest('/app/recruiter/views/orderAddTo.html', true);
    $templateRequest('/app/recruiter/views/recruiterOrders.html', true);
    $templateRequest('/app/recruiter/views/order.html', true);
    $templateRequest('/app/recruiter/views/searchOrderEdit.html', true);
    $templateRequest('/app/recruiter/views/checkOutOrder.html', true);
    $templateRequest('/app/recruiter/views/checkOutSearchOrder.html', true);
    $templateRequest('/app/recruiter/views/orderSuccess.html', true);
    $templateRequest('/app/recruiter/views/candidates.html', true);
    $templateRequest('/app/recruiter/views/myCandidates.html', true);
    $templateRequest('/app/recruiter/views/profile.html', true);
    $templateRequest('/app/recruiter/views/profilePrint.html', true);
    $templateRequest('/app/recruiter/views/jobApplications.html', true);
    $templateRequest('/app/recruiter/views/jobApplication.html', true);//////
    /*
    $templateRequest('/app/admin/views/adminMaster.html', true);
    $templateRequest('/app/admin/views/adminJobAds.html', true);
    $templateRequest('/app/admin/views/adminJobAd.html', true);
    $templateRequest('/app/admin/views/adminJobSeekers.html', true);
    $templateRequest('/app/admin/views/adminViewJobSeeker.html', true);
    $templateRequest('/app/admin/views/adminUsers.html', true);
    $templateRequest('/app/admin/views/adminRecruiters.html', true);
    $templateRequest('/app/admin/views/adminRecruiter.html', true);
    $templateRequest('/app/admin/views/adminPrices.html', true);
    $templateRequest('/app/admin/views/setAdvertPrice.html', true);
    $templateRequest('/app/admin/views/editAdvertPrice.html', true);
    $templateRequest('/app/admin/views/adminOrders.html', true);
    $templateRequest('/app/admin/views/adminJobApplications.html', true);
    $templateRequest('/app/admin/views/adminJobApplication.html', true);
    $templateRequest('/app/admin/views/adminRecruiterCandidates.html', true);
    */ 
}]);


//Restangular Global configuration
//set the base url for api calls on our RESTful services
  var baseUrl = window.location.protocol + window.location.host;
// Restangular.setBaseUrl(baseUrl);

  myApp.factory('SocketIO', ['socketFactory', function (socketFactory) {
    var myIOsocket = io.connect('localhost:3000');
    var mySocket = socketFactory({
        ioSocket: myIOsocket
    });
    mySocket.forward('paid');
    mySocket.forward('cancelled');
    mySocket.forward('error');
    return mySocket;
    }]);

myApp.controller('MainController', ['$scope', '$rootScope', '$state', '$uibModal', 'store', 'Auth', 'CartService', 'loginModalService', 'ModalService', 'authManager', function ($scope, $rootScope, $state, $uibModal, store, Auth, CartService, loginModalService, ModalService, authManager) {
    //$scope.stateChange = $rootScope.stateChange;
    //console.log($rootScope.stateChange);
    $scope.isCollapsed = false;
    $scope.isAuthenticated = function () {
        return authManager.isAuthenticated();
    };
    $scope.isJobSeeker = function () {
        return Auth.isJobSeeker();
    };
    $scope.isRecruiter = function () {
        return Auth.isRecruiter();
    };
    $scope.isAdmin = function () {
        return Auth.isAdmin();
    };
    //$scope.name = Auth.GetName();   order.orderType    SaveOrderPaid
    $scope.$on('socket:paid', function (ev, order) {
        CartService.SetOrderPaid(order);
        $rootScope.orderPaid = order;
        $state.go('recruiter.orderSuccess');
    });
    $scope.$on('socket:cancelled', function (ev, order) {
        switch (order.orderType) {
            case 'Job Ad':
                $state.go('recruiter.checkOutOrder');
                break;
            case 'CV Search':
                $state.go('recruiter.checkOutSearchOrder');
                break;
        };

    });
    $scope.navigateToCheckOut = function () {
        $state.go('recruiter.checkOutOrder')
    };
    $scope.id_token = store.get('id_token');
    $scope.signIn = function () {
        loginModalService().then(function () {
            return;
        })
        .catch(function () {
            return $state.go('start');
        });

    };
    $scope.signOut = function () {
        store.set('id_token', '');
        store.set('loggedIn', false);
        Auth.SetMessage('You have successfully signed out');
        Auth.SetTitle('Sign Out');
        ModalService.SetMessage('You have successfully signed out!');
        ModalService.SetTitle('Sign Out');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/messageModal.html',
            controller: 'ModalController'
        });
    };
}]);

