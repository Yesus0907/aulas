aulaApp.directive("tiempoEstimado", ["versionApp","$rootScope", function (versionApp, $rootScope) {

return {
    restrict: 'EA',
    scope: {
    },
    controllerAs: 'ctrl',
    bindToController: {

    },
    controller:function ($element, $scope){
     
      $scope.actividades = [];
      var iterador = 12;
     
      for(var i=1;i<iterador;i++) {
        
        var itemsv = "actividad" + i;
        var numerosv = "hora" + i;
        var items = $($element).attr(itemsv);
        var numeros = $($element).attr(numerosv);

        if (items == null) {
          break; 
        }else{
          var title = items;
          var num = numeros;  
        }
       
        $scope.actividades.push({id:i, title: title, number: num});
        
      }; 
      // escucha y suma array actividades
      $scope.$watchCollection('actividades', function(array) {
        var total = 0;
        if (array) {
            angular.forEach(array, function(value) {
                total = parseInt(value.number) + parseInt(total);
            });
        }
        $scope.total = total;
        var credito = 48;
        var creditos = Math.round($scope.total / credito);
        $scope.creditos =  creditos;
      });

         }, 
    link: function ($scope, $element, $index) {
     
    },
    //  templateUrl:function($element, controller, $scope, attrs){
    //     return versionApp.apiUrl + "views/tiempo-estimado.html"
    // },
     templateUrl:'tiempo-estimado.html',
    transclude: true,
};
}]);



// aulaApp.directive("rubrica", ["versionApp","$rootScope", function (versionApp, $rootScope) {

// return {
//     restrict: 'EA',
//     scope: {
//     },
//     controllerAs: 'ctrl',
//     bindToController: {

//     },
//     controller:function ($element, $scope){
     
//       $scope.actividades = [];
//       var iterador = 12;
  
//       for(var i=1;i<iterador;i++) {
        
//         var itemsv = "actividad" + i;
//         var numerosv = "hora" + i;
//         var items = $($element).attr(itemsv);
//         var numeros = $($element).attr(numerosv);

//         if (items == null) {
//           break; 
//         }else{
//           var title = items;
//           var num = numeros;  
//         }
       
//         $scope.actividades.push({id:i, title: title, number: num});
        
//       }; 
//       // escucha y suma array actividades
//       $scope.$watchCollection('actividades', function(array) {
//         var total = 0;
//         if (array) {
//             angular.forEach(array, function(value) {
//                 total = parseInt(value.number) + parseInt(total);
//             });
//         }
//         $scope.total = total;
//         var credito = 48;
//         var creditos = Math.round($scope.total / credito);
//         $scope.creditos =  creditos;
//       });

//          }, 
//     link: function ($scope, $element, $index) {
     
//     },
//      templateUrl:function($element, controller, $scope, attrs){
//         return versionApp.apiUrl + "views/rubrica.html"
//     },
//     transclude: true,
// };
// }]);