var adminServiceModule = angular.module('adminServiceModule',[]);

adminServiceModule.factory('AdminService', [function () {
    var searchBy = 'All';
    var searchTerm = '';
    var itemsPerPage = 4;
    var totalItems = 0;
    var currentPage = 1;
    var backNav = 'NO';
    var item = {};
    var items = []; 
    
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
        GetCurrentPage: function () {
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
           item = _item ;
        },
        GetItem: function () {
            return item;
        },
        DeleteItem: function (_item) {
            for (var i = 0; i < items.length; i++) {
                    if (items[i]._id == _items._id) {
                        items.splice(i, 1);
                    }
                }
            return;
        },
        SetItems: function (_items) {
            items = _items;
            return;
        },
        GetItems: function () {
            return items;
        },
        ClearItems: function () {
            items = [];
            totalItems = 0;
        }       
    }
}]);



adminServiceModule.factory('AdminJobAdsService', [function () {
    var item = {};
    var items = [];
    var searchBy = 'All';
    var searchTerm = '';
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
        GetCurrentPage: function () {
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
            return;
        },
        DeleteItem: function (_item) {
            for (var i = 0; i < items.length; i++) {
                if (items[i]._id == _item._id) {
                    items.splice(i, 1);
                }
            }
            return;
        },
        GetItems: function () {
            return items;
        },
        ClearItems: function () {
            items = [];
            totalItems = 0;
        }
    }
}]);

adminServiceModule.factory('AdminOrdersService', [function () {
    var item = {};
    var items = [];
    var searchBy = 'All';
    var searchTerm = '';
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
        GetCurrentPage: function () {
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
            return;
        },
        DeleteItem: function (_item) {
            for (var i = 0; i < items.length; i++) {
                if (items[i]._id == _item._id) {
                    items.splice(i, 1);
                }
            }
            return;
        },
        GetItems: function () {
            return items;
        },
        ClearItems: function () {
            items = [];
            totalItems = 0;
        }
    }
}]);

adminServiceModule.factory('AdminJobApplicationsService', [function () {
    var item = {};
    var items = [];
    var searchBy = 'All';
    var searchTerm = '';
    var itemsPerPage = 4;
    var totalItems = 0;
    var currentPage = 1;
    return {
        SetCurrentPage: function (_page) {
            currentPage = _page;
            return;
        },
        GetCurrentPage: function () {
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
            return;
        },
        DeleteItem: function (_item) {
            for (var i = 0; i < items.length; i++) {
                if (items[i]._id == _item._id) {
                    items.splice(i, 1);
                }
            }
            return;
        },
        GetItems: function () {
            return items;
        },
        ClearItems: function () {
            items = [];
            totalItems = 0;
        }
    }
}]);

adminServiceModule.factory('AdminJobSeekersService', [function () {
    var item = {};
    var items = [];
    var searchBy = 'All';
    var searchTerm = '';
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
        GetCurrentPage: function () {
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
            return;
        },
        DeleteItem: function (_item) {
            for (var i = 0; i < items.length; i++) {
                if (items[i]._id == _item._id) {
                    items.splice(i, 1);
                }
            }
            return;
        },
        GetItems: function () {
            return items;
        },
        ClearItems: function () {
            items = [];
            totalItems = 0;
        }
    }
}]);

adminServiceModule.factory('AdminRecruitersService', [function () {
    var item = {};
    var items = [];
    var searchBy = 'All';
    var searchTerm = '';
    var itemsPerPage = 4;
    var totalItems = 0;
    var currentPage = 1;
    return {
        SetCurrentPage: function (_page) {
            currentPage = _page;
            return;
        },
        GetCurrentPage: function () {
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
            return;
        },
        DeleteItem: function (_item) {
            for (var i = 0; i < items.length; i++) {
                if (items[i]._id == _item._id) {
                    items.splice(i, 1);
                }
            }
            return;
        },
        GetItems: function () {
            return items;
        },
        ClearItems: function () {
            items = [];
            totalItems = 0;
        }
    }
}]);

adminServiceModule.factory('AdminRecruiterCandidatesService', [function () {
    var item = {};
    var items = [];
    var searchBy = 'All';
    var searchTerm = '';
    var itemsPerPage = 4;
    var totalItems = 0;
    var currentPage = 1;
    return {
        SetCurrentPage: function (_page) {
            currentPage = _page;
            return;
        },
        GetCurrentPage: function () {
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
            return;
        },
        DeleteItem: function (_item) {
            for (var i = 0; i < items.length; i++) {
                if (items[i]._id == _item._id) {
                    items.splice(i, 1);
                }
            }
            return;
        },
        GetItems: function () {
            return items;
        },
        ClearItems: function () {
            items = [];
            totalItems = 0;
        }
    }
}]);

adminServiceModule.factory('AdminUsersService', [function () {
    var item = {};
    var items = [];
    var searchBy = 'All';
    var searchTerm = '';
    var itemsPerPage = 4;
    var totalItems = 0;
    var currentPage = 1;
    return {
        SetCurrentPage: function (_page) {
            currentPage = _page;
            return;
        },
        GetCurrentPage: function () {
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
            return;
        },
        DeleteItem: function (_item) {
            for (var i = 0; i < items.length; i++) {
                if (items[i]._id == _item._id) {
                    items.splice(i, 1);
                }
            }
            return;
        },
        GetItems: function () {
            return items;
        },
        ClearItems: function () {
            items = [];
            totalItems = 0;
        }
    }
}]);

adminServiceModule.factory('AdminPricesService', [function () {
    var item = {};
    var items = [];
    var searchBy = 'All';
    var searchTerm = '';
    var itemsPerPage = 4;
    var totalItems = 0;
    var currentPage = 1;
    return {
        SetCurrentPage: function (_page) {
            currentPage = _page;
            return;
        },
        GetCurrentPage: function () {
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
            return;
        },
        DeleteItem: function (_item) {
            for (var i = 0; i < items.length; i++) {
                if (items[i]._id == _item._id) {
                    items.splice(i, 1);
                }
            }
            return;
        },
        GetItems: function () {
            return items;
        },
        ClearItems: function () {
            items = [];
            totalItems = 0;
        }
    }
}]);