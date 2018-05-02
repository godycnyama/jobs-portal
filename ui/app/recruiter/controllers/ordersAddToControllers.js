var ordersAddToModule = angular.module('ordersAddToModule', []);

ordersAddToModule.controller('OrdersAddToController', ['$scope', '$state', '$rootScope', 'AdminService', 'Restangular', '$uibModal', '$uibModalStack', '$timeout', 'Auth', 'JobAdsService', 'ModalService', 'JobAdOrderService', 'Notification','store', function ($scope, $state, $rootScope, AdminService, Restangular, $uibModal, $uibModalStack, $timeout, Auth, JobAdsService, ModalService, JobAdOrderService, Notification,store) {
    $scope.mode = JobAdOrderService.GetCreate();
    $scope.edit = JobAdOrderService.GetEdit();
    $scope.back = function () {
        window.history.back();
    };
    $scope.jobAd = JobAdsService.GetJobAd();
    $scope.orders = [];//AdminService.GetJobAds();
    $scope.totalOrders = 0;
    $scope.viewPerPageOptions = [5, 10, 20];
    $scope.ordersPerPage = $scope.viewPerPageOptions[0];
    $scope.pagination = {
        current: 1,
        last: 0
    };
    $scope.range = {
        lower: 0,
        upper: 0,
        total: 0
    };

    $scope.getPage = function (newPage) {
        var query = {
            pageNo: newPage,
            perPage: $scope.ordersPerPage,
            recruiterUserID: Auth.GetUserID()

        };
        $scope.getOrders(query);
    };
    $scope.viewOrder = function (_order) {
        $rootScope.order = _order;
        $state.go('recruiter.orderAddTo');
    };

    $scope.loadOrders = function () {
         ModalService.SetTitle('Order(s) Search')
         ModalService.SetMessage('Searching  for order(s),please wait!');
         var modalInstance = $uibModal.open({
             templateUrl: 'app/modals/modal.html',
             controller: 'ModalController'
         });
         var query = {
             pageNo: 1,
             perPage: $scope.ordersPerPage,
             recruiterUserID: Auth.GetUserID()
         };
         $scope.getOrders(query);

     };
    $scope.getOrders = function (query) {

        //get from api/jobAds/getJobAdsBy
        var Orders = Restangular.all('api/orders/getUnpaidOrders');
        Orders.getList(query).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                //AdminService.SetJobAds(response.data.jobAds);
                $scope.orders = response.data;
                $scope.totalOrders = response.data.total;
            };
        })
    };
    $scope.createJobAdAddToExistingOrder = function (_order) {
        ModalService.SetTitle('Create job Ad & Add to Order# ' + _order._id);
        ModalService.SetMessage('Create job Ad and adding to Order# '+ + _order._id + ',please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //post  
        var Orders = Restangular.one('api/orders/createJobAdAddToExistingOrder',_order._id);
        Orders.post($scope.jobAd).then(function (response) {
            if (!response.data.error) {
                store.set('cart', response.data.order);
                store.set('getString', response.data.getString);
                JobAdOrderService.ResetCreate();
                if (!response.data.error) {
                    $state.go('recruiter.checkOutOrder');
                };
                $uibModalStack.dismissAll();
                Notification.success({ message: response.data.message, title: 'Create job Ad & Add to Order# ' + _order._id });    
            }

        })
    };

    $scope.updateJobAdAddToExistingOrder = function (_order) {
        $scope.jobAd.jobAdID = $rootScope.jobAd._id;
        $scope.jobAd.recruiterUserID = $rootScope.jobAd.userID;
        if (typeof $scope.jobAd.minimumSalary === 'number') {
            $scope.jobAd.minimumSalary = numeral($scope.jobAd.minimumSalary).format('0,0.00');
        };
        if (typeof $scope.jobAd.maximumSalary === 'number') {
            $scope.jobAd.maximumSalary = numeral($scope.jobAd.maximumSalary).format('0,0.00');
        };
        ModalService.SetTitle('Update job Ad & Add to Order# ' + _order._id);
        ModalService.SetMessage('Updating job Ad and adding to order,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //post  
        var Orders = Restangular.one('api/orders/updateJobAdAddToExistingOrder', _order._id);
        Orders.customPUT($scope.jobAd).then(function (response) {
            if (!response.data.error) {
                store.set('cart', response.data.order);
                store.set('getString', response.data.getString);
                JobAdOrderService.ResetEdit();
                if (!response.data.error) {
                    $state.go('recruiter.checkOutOrder');
                };
                $uibModalStack.dismissAll();
                Notification.success({ message: response.data.message, title: 'Update job Ad & Add to Order# ' + _order._id });
            }

        })
    };

    $scope.updateJobAdAddToNewOrder = function () {
        $scope.jobAd.jobAdID = $rootScope.jobAd._id;
        $scope.jobAd.recruiterUserID = $rootScope.jobAd.userID;
        if (typeof $scope.jobAd.minimumSalary === 'number') {
            $scope.jobAd.minimumSalary = numeral($scope.jobAd.minimumSalary).format('0,0.00');
        };
        if (typeof $scope.jobAd.maximumSalary === 'number') {
            $scope.jobAd.maximumSalary = numeral($scope.jobAd.maximumSalary).format('0,0.00');
        };
        ModalService.SetTitle('Update jobAd & Add to new Order');
        ModalService.SetMessage('Updating job Ad and adding to order,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //post  
        var Orders = Restangular.all('api/orders/updateJobAdAddToNewOrder');
        Orders.customPUT($scope.jobAd).then(function (response) {
            if (!response.data.error) {
                store.set('cart', response.data.order);
                store.set('getString', response.data.getString);
                JobAdOrderService.ResetEdit();
                if (!response.data.error) {
                    $state.go('recruiter.checkOutOrder');
                };
                $uibModalStack.dismissAll();
                Notification.success({ message: response.data.message, title: 'Update jobAd & Add to new Order' });
            }

        })
    };

    $scope.addExistingJobAdToExistingOrder = function (_order) {
        console.log(_order);
        var jobAd = {
            orderID: _order._id,
            jobAdID: $scope.jobAd._id,
            jobTitle: $scope.jobAd.jobTitle,
            jobREF: $scope.jobAd.jobREF,
        }
        
        ModalService.SetTitle('Add job Ad to Order# ' + _order._id);
        ModalService.SetMessage('Adding job Ad to order,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //post  
        var Orders = Restangular.all('api/orders/addExistingJobAdToExistingOrder');
        Orders.post(jobAd).then(function (response) {
            if (!response.data.error) {
                store.set('cart', response.data.order);
                store.set('getString', response.data.getString);
                if (!response.data.error) {
                    $state.go('recruiter.checkOutOrder');
                };
                $uibModalStack.dismissAll();
                Notification.success({ message: response.data.message, title: 'Add job Ad to Order# ' + _order._id });             
            }

        })
    };

    $scope.addExistingJobAdToNewOrder = function () {
        var jobAd = {
            jobAdID: $scope.jobAd._id,
            jobREF: $scope.jobAd.jobREF,
            jobTitle: $scope.jobAd.jobTitle,
            recruiterUserID: Auth.GetUserID()
        };

        ModalService.SetTitle('Add job Ad ' + jobAd.jobREF + ' to new Order');
        ModalService.SetMessage('Adding job Ad ' + jobAd.jobREF +' to new order,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //post  to api/jobAds
        var Orders = Restangular.all('api/orders/addExistingJobAdAddToNewOrder');
        Orders.post(jobAd).then(function (response) {
            if (!response.data.error) {
                $uibModalStack.dismissAll();
                store.set('cart', response.data.order);
                store.set('getString', response.data.getString);
                if (!response.data.error) {
                    $state.go('recruiter.checkOutOrder');
                };
                Notification.success({ message: response.data.message, title: 'Add job Ad ' + jobAd.jobREF + ' to new Order' });           
            }

        })
    };

    $scope.createJobAdAddToNewOrder = function () {
        ModalService.SetTitle('Create job Ad & Add to new Order');
        ModalService.SetMessage('Creating and adding job Ad to new order,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //post 
        var Orders = Restangular.all('api/orders/createJobAdAddToNewOrder');
        Orders.post($scope.jobAd).then(function (response) {
            if (!response.data.error) {
                store.set('cart', response.data.order);
                store.set('getString', response.data.getString);
                JobAdOrderService.ResetCreate();
                if (!response.data.error) {
                    $state.go('recruiter.checkOutOrder');
                };
                $uibModalStack.dismissAll();
                Notification.success({ message: response.data.message, title: 'Create job Ad & Add to new Order' });      
            }

        })
    }

}])

ordersAddToModule.controller('OrderAddToController', ['$scope', '$rootScope', '$state', '$uibModal', '$uibModalStack', '$timeout', 'Restangular', 'AdminService', 'ModalService', 'JobAdsService', 'Auth', 'JobAdOrderService', 'Notification','store', function ($scope, $rootScope, $state, $uibModal, $uibModalStack, $timeout, Restangular, AdminService, ModalService, JobAdsService, Auth, JobAdOrderService, Notification,store) {
    $scope.mode = JobAdOrderService.GetCreate();
    $scope.edit = JobAdOrderService.GetEdit();
    $scope.back = function () {
        window.history.back();
    };
    $scope.jobAd = JobAdsService.GetJobAd();
    $scope.order = $rootScope.order;
    $scope.createJobAdAddToExistingOrder = function () {
        ModalService.SetTitle('Create job Ad & Add to Order# ' + $rootScope.order._id);
        ModalService.SetMessage('Creating job Ad and adding to order,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        
        var Orders = Restangular.one('api/orders/createJobAdAddToExistingOrder', $rootScope.order._id);
        Orders.post($scope.jobAd).then(function (response) {
            if (!response.data.error) {
                store.set('cart', response.data.order);
                store.set('getString', response.data.getString);
                JobAdOrderService.ResetCreate();
                if (!response.data.error) {
                    $state.go('recruiter.checkOutOrder');
                };
                $uibModalStack.dismissAll();
                Notification.success({ message: response.data.message, title: 'Create job Ad & Add to Order# ' + $rootScope.order._id });          
            }

        })
    };

    $scope.addExistingJobAdToExistingOrder = function () {
        var jobAd = {
            orderID: $scope.order._id,
            jobAdID: $scope.jobAd._id,
            jobTitle: $scope.jobAd.jobTitle,
            jobREF: $scope.jobAd.jobREF,
        }

        ModalService.SetTitle('Add job Ad ' + $scope.jobAd.jobREF + ' to Order# ' + $scope.order._id);
        ModalService.SetMessage('Adding job Ad '+ $scope.jobAd.jobREF + ' to Order# ' + $scope.order._id +',please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //post  
        var Orders = Restangular.all('api/orders/addExistingJobAdToExistingOrder');
        Orders.post(jobAd).then(function (response) {
            if (!response.data.error) {
                store.set('cart', response.data.order);
                store.set('getString', response.data.getString);
                if (!response.data.error) {
                    $state.go('recruiter.checkOutOrder');
                };
                $uibModalStack.dismissAll();
                Notification.success({ message: response.data.message, title: 'Add job Ad to Order' });        
            }

        })
    };

    $scope.addExistingJobAdToNewOrder = function () {
        var jobAd = {
            jobAdID: $scope.jobAd._id,
            jobREF: $scope.jobAd.jobREF,
            jobTitle: $scope.jobAd.jobTitle,
            recruiterUserID: Auth.GetUserID()
        };

        ModalService.SetTitle('Add job Ad to new Order');
        ModalService.SetMessage('Adding job Ad to new order,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //post  to api/jobAds
        var Orders = Restangular.all('api/orders/addExistingJobAdAddToNewOrder');
        Orders.post(jobAd).then(function (response) {
            if (!response.data.error) {
                $uibModalStack.dismissAll();
                store.set('cart', response.data.order);
                store.set('getString', response.data.getString);
                if (!response.data.error) {
                    $state.go('recruiter.checkOutOrder');
                };
                Notification.success({ message: response.data.message, title: 'Add job Ad to new Order' });
            }

        })
    };
    $scope.createJobAdAddToNewOrder = function () {
        ModalService.SetTitle('Create job Ad and add to new Order');
        ModalService.SetMessage('Creating job Ad and adding to new order,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });

        var Orders = Restangular.all('api/orders/createJobAdAddToNewOrder');
        Orders.post($scope.jobAd).then(function (response) {
            if (!response.data.error) {
                store.set('cart', response.data.order);
                store.set('getString', response.data.getString);
                JobAdOrderService.ResetCreate();
                if (!response.data.error) {
                    $state.go('recruiter.checkOutOrder');
                };
                $uibModalStack.dismissAll();
                Notification.success({ message: response.data.message, title: 'Create job Ad and add to new Order' });         
            }

        })
    };

    $scope.updateJobAdAddToExistingOrder = function () {
        $scope.jobAd.jobAdID = $rootScope.jobAd._id;
        $scope.jobAd.recruiterUserID = $rootScope.jobAd.userID;
        if (typeof $scope.jobAd.minimumSalary === 'number') {
            $scope.jobAd.minimumSalary = numeral($scope.jobAd.minimumSalary).format('0,0.00');
        };
        if (typeof $scope.jobAd.maximumSalary === 'number') {
            $scope.jobAd.maximumSalary = numeral($scope.jobAd.maximumSalary).format('0,0.00');
        };
        ModalService.SetTitle('Update job Ad and add to Order');
        ModalService.SetMessage('Updating job Ad and adding to order,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //post  
        var Orders = Restangular.one('api/orders/updateJobAdAddToExistingOrder', $scope.order._id);
        Orders.customPUT($scope.jobAd).then(function (response) {
            if (!response.data.error) {
                store.set('cart', response.data.order);
                store.set('getString', response.data.getString);
                JobAdOrderService.ResetEdit();
                if (!response.data.error) {
                    $state.go('recruiter.checkOutOrder');
                };
                $uibModalStack.dismissAll();
                Notification.success({ message: response.data.message, title: 'Update job Ad and add to Order' });
            }

        })
    };
    
    $scope.updateJobAdAddToNewOrder = function () {
        $scope.jobAd.jobAdID = $rootScope.jobAd._id;
        $scope.jobAd.recruiterUserID = $rootScope.jobAd.userID;
        if (typeof $scope.jobAd.minimumSalary === 'number') {
            $scope.jobAd.minimumSalary = numeral($scope.jobAd.minimumSalary).format('0,0.00');
        };
        if (typeof $scope.jobAd.maximumSalary === 'number') {
            $scope.jobAd.maximumSalary = numeral($scope.jobAd.maximumSalary).format('0,0.00');
        };
        ModalService.SetTitle('Update job Ad and add to new Order');
        ModalService.SetMessage('Updating job Ad and adding to order,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //post  
        var Orders = Restangular.all('api/orders/updateJobAdAddToNewOrder');
        Orders.customPUT($scope.jobAd).then(function (response) {
            if (!response.data.error) {
                store.set('cart', response.data.order);
                store.set('getString', response.data.getString);
                JobAdOrderService.ResetEdit();
                if (!response.data.error) {
                    $state.go('recruiter.checkOutOrder');
                };
                $uibModalStack.dismissAll();
                Notification.success({ message: response.data.message, title: 'Update job Ad and add to new Order' });        
            }

        })
    };
    
}])