var masterDetailServiceModule = angular.module('masterDetailServiceModule', []);

masterDetailServiceModule.factory('MasterDetailService', [function () {
    var item = {};
    var items = [];
    var searchTerm = '';
    var searchBy = 'All';
    var itemsPerPage = 4;
    var totalItems = 0;
    var currentPage = 1;
    var backNav = 'NO';
    return {
        SetBackNav: function () {
            backNav = 'YES';
            return;

        },
        ReSetBackNav: function () {
            backNav = 'NO';
            return;
        },
        GetBackNav: function () {
            return backNav;
        },
        SetCurrentPage: function (_page) {
            currentPage = _page;
            return;
        },
        GetCurrentPage: function (_page) {
            return currentPage;
        },
        SetSearchTerm: function (_searchTerm) {
            return searchTerm = _searchTerm;
        },
        GetSearchTerm: function () {
            return searchTerm;
        },
        SetSearchBy: function (_searchBy) {
            return searchBy = _searchBy;
        },
        GetSearchBy: function () {
            return searchBy;
        },
        SetItemsPerPage: function (_itemsPerPage) {
            return itemsPerPage = _itemsPerPage;
        },
        GetItemsPerPage: function () {
            return itemsPerPage;
        },
        SetTotalItems: function (_totalItems) {
            return totalItems = _totalItems;
        },
        GetTotalItems: function () {
            return totalItems;
        },
        SetItem: function (_item) {
            item = _item;
        },
        GetItem: function () {
            return item;
        },
        SetItems: function (_items) {
            items = _items;
        },
        GetItems: function (_items) {
           return items;
        },
        ClearItems: function () {
            items = [];
            totalItems = 0;
        },
        DeleteItem: function (_item) {
            for (var i = 0; i < items.length; i++) {
                if (items[i]._id == _item._id) {
                    items.splice(i, 1);
                }
            }
            return;
        }
    }
}]);
