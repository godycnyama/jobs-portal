var jobAdOrderServiceModule = angular.module('jobAdOrderServiceModule', []);

jobAdOrderServiceModule.factory('JobAdOrderService', [function () {
    var create = false;
    var edit = false;
    return {
        SetCreate: function () {
            create = true;
        },
        GetCreate: function () {
            return create;
        },
        ResetCreate: function () {
            create = false;
        },
        SetEdit: function () {
            edit = true;
        },
        GetEdit: function () {
            return edit;
        },
        ResetEdit: function () {
            create = false;
        }
    }
}]);
