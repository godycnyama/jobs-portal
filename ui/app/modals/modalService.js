var modalServiceModule = angular.module('modalServiceModule', []);

modalServiceModule.factory('ModalService', [function () {
    var message = '';
    var title = '';
    var closeModal = false;
    return {       
        SetMessage: function (_message) {
            message = _message;
        },
        GetMessage: function () {
            return message;
        },
        SetTitle: function (_title) {
            title = _title;
        },
        GetTitle: function () {
            return title;
        },
        SetCloseModal: function () {
            closeModal = true;
            return;
        },
        ReSetCloseModal: function () {
            closeModal = false;
            return;
        },
        GetCloseModal: function () {           
            return closeModal;
        }
    }
}]);