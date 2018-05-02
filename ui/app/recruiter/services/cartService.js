var cartServiceModule = angular.module('cartServiceModule', []);

cartServiceModule.factory('CartService', ['$localStorage', function ($localStorage) {
    var orderMode = true;
    var searchOrderMode = true;
    var orderPaid = {}
    $localStorage.cart = [];  
    $localStorage.order = {};
    $localStorage.searchOrder = {};
    $localStorage.orderPaid = {};
    $localStorage.getString = '';
    return {
        SetOrderCreate: function () {
            orderMode = true;
        },
        GetOrderMode: function () {
            return orderMode;
        },
        SetOrderEdit: function () {
            orderMode = false;
        },
        SetSearchOrderCreate: function () {
            searchOrderMode = true;
        },
        GetSearchOrderMode: function () {
            return searchOrderMode;
        },
        SetSearchOrderEdit: function () {
            searchOrderMode = false;
        },
        SaveOrder: function (_order) {
            $localStorage.order = _order;
        },
        GetOrder: function () {
           return $localStorage.order;
        },
        SaveSearchOrder: function (_order) {
            $localStorage.searchOrder = _order;
        },
        SaveOrderPaid: function (_order) {
            $localStorage.orderPaid = _order;
        },
        GetOrderPaid: function () {
            return $localStorage.orderPaid;
        },
        GetSearchOrder: function () {
           return $localStorage.searchOrder;
        },
        SaveGetString: function (_string) {
            $localStorage.getString = _string;
        },
        GetGetString: function () {
           return $localStorage.getString;
        },
        AddToCart: function (item) {
            $localStorage.cart.push(item);
        },
        RemoveFromCart: function (index) {
            $localStorage.cart.splice(index, 1);
        },
        ClearCart: function () {
            $localStorage.cart.splice(0, $localStorage.cart.length);
        },
        SetCart: function (_cart) {
            $localStorage.cart = _cart;
        },
        ResetToken: function () {
            Auth = null;
        },
        GetCart: function () {
            return $localStorage.cart;
        },
        GetCartItemsTotal: function () {
            return $localStorage.cart.length;
        },
        GetCartTotalAmount: function () {
            return $localStorage.cart * 20;
        },
        SetOrderPaid: function (_order) {
            orderPaid = _order;
        },
        GetOrderPaid: function () {
            return orderPaid;
        }

    }
}]);
