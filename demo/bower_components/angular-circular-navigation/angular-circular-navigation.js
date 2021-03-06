'use strict';

angular.module('angularCircularNavigation', [])
  .directive('circular',

    function ($compile) {

      return {
        restrict: 'EA',
        scope: {
          options: '='
        },
        template: '<button ng-click="toggleMenu()" class="cn-button {{options.button.size}}" ng-class="options.button.cssClass" style="background: {{options.button.background ? options.button.background : options.background}}; color: {{options.button.color ? options.button.color :options.color}};">{{options.content}}</button>' + 
                  '<div class="cn-wrapper {{options.size}} items-{{options.items.length}}" ng-class="{\'opened-nav\': options.isOpen}"><ul>' +
                    '<li ng-repeat="item in options.items">' +
                      '<a ng-hide="item.empty" ng-click="perform(options, item)" ng-class="{\'is-active\': item.isActive}" class="{{item.cssClass}}" style="background: {{item.background ? item.background : options.background}}; color: {{item.color ? item.color : options.color}};">' +
                        '<span>{{item.content}}</span>' +
                      '</a></li></ul></div>',
        controller: ['$scope', '$element', '$attrs',
          function ($scope, $element, $attrs) {

            $scope.toggleMenu = function () {
              $scope.options.isOpen = !$scope.options.isOpen;
            };

            $scope.perform = function (options, item) {
              if (typeof item.onclick === 'function') {
                item.onclick(options, item);
              }

              if ($scope.options.toggleOnClick) {
                $scope.toggleMenu();
              }
            };

          }
        ]
      };
    });