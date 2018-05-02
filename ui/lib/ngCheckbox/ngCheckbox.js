angular.module('jkuri.checkbox', [])

.directive('ngCheckbox', [function () {
    'use strict';

    var setScopeValues = function (scope, attrs) {
        scope.label = attrs.label || '';
        scope.theme = attrs.theme || '';
        scope.checked = scope.$eval(attrs.checked) || false;
        scope.icon_size = attrs.iconSize || '';
        scope.label_size = attrs.labelSize || '';
    };

    return {
        restrict: 'EA',
        require: '?ngModel',
        replace: true,
        scope: true,
        link: function (scope, element, attrs, ngModel) {
            setScopeValues(scope, attrs);

            ngModel.$setViewValue(scope.checked);

            scope.change = function () {
                scope.checked = !scope.checked;
                ngModel.$setViewValue(scope.checked);
            };
        },
        template:
		'<div class="ng-checkbox" ng-click="change()">' +
		  '<label ng-class="{\'sm\': label_size === \'sm\', \'md\': label_size === \'md\', \'lg\': label_size === \'lg\', \'x-lg\': label_size === \'x-lg\', \'xx-lg\': label_size === \'xx-lg\', \'xxx-lg\': label_size === \'xxx-lg\'}">' +
		    '<i ng-show="checked" class="fa fa-check-square-o" ng-class="{\'green\': theme === \'green\', \'red\': theme === \'red\', \'blue\': theme === \'blue\', \'sm\': icon_size === \'sm\', \'md\': icon_size === \'md\', \'lg\': icon_size === \'lg\', \'x-lg\': icon_size === \'x-lg\', \'xx-lg\': icon_size === \'xx-lg\', \'xxx-lg\': icon_size === \'xxx-lg\'}"></i> ' +
		    '<i ng-show="!checked" class="fa fa-square-o" ng-class="{\'green\': theme === \'green\', \'red\': theme === \'red\', \'blue\': theme === \'blue\', \'sm\': icon_size === \'sm\', \'md\': icon_size === \'md\', \'lg\': icon_size === \'lg\', \'x-lg\': icon_size === \'x-lg\', \'xx-lg\': icon_size === \'xx-lg\', \'xxx-lg\': icon_size === \'xxx-lg\'}"></i> ' +
		    '{{ label }}' +
		  '</label>' +
		'</div>'
    };

}]);