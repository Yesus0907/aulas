aulaApp.directive("cierre", ["versionApp", function (versionApp) {

return {
    // require: '^myParentDirective',
    restrict: 'EA',
    scope: {
       
      },
    controllerAs: 'ctrl',
    bindToController: {
    },
    controller:function ($scope, $rootScope, $element, $sce){
       
        

          // iIncluir listas dinamicamente para el cierre
          $scope.actividades = [];
          var iterador = 30;
         
          for(var i=1;i<iterador;i++) {
            
            var itemsv = "item" + i;
            var items = $($element).attr(itemsv);
     

            if (items == null) {
              break; 
            }else{
              var title = items;
            }
           
            $scope.actividades.push({id:i, title: title });
            
          }; 
          // // escucha y suma array actividades
          // $scope.$watchCollection('actividades', function(array) {
          //   var total = 0;
          //   if (array) {
          //       angular.forEach(array, function(value) {
          //           total = parseInt(value.number) + parseInt(total);
          //       });
          //   }
          //   $scope.total = total;
          //   var credito = 48;
          //   var creditos = Math.round($scope.total / credito);
          //   $scope.creditos =  creditos;
          // });

    },
     templateUrl:'cierre.html',
   
};
}]);
