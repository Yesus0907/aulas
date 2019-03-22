
aulaApp.directive('navegadorHorizontal', ['versionApp', function (versionApp) {

return {
    // require: '^myParentDirective',
    restrict: 'EA',
    scope: {
    },
    controllerAs: 'ctrl',
    controller: function(versionApp, $scope) {
    },  
    link: function ($scope, $element, $attrs) {
            $scope.identificador = 1;
            // $scope.$watch('$viewContentLoaded', function(){
            //    alert();
            // });

           $($element).on("click", ".dot", function () {
                var origen = "";
                origen = $(".areaContent").attr("id");
                var destino = $(this).attr("id");

                if (destino < origen){
                     $(".contenedorp").removeClass("left");
                   $(".contenedorp").addClass("right");
                   
                }else if(destino > origen){
                      $(".contenedorp").removeClass("right");
                    $(".contenedorp").addClass("left");  
                }              
           });

    
    },
    templateUrl:function($element, controller, $scope, attrs){
        return versionApp.apiUrl + "views/nav-h-circulos.html"
    },
     // templateUrl:'nav-h-circulos.html',
};
}]);
