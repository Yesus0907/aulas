aulaApp.directive('separador',  [function() {
return {
    restrict: 'EA',
    scope: {
        texto: '@',
    },
    template: '<div class="separador"><span>{{texto}}</span></div>'
    };
}]);