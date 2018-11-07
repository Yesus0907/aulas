

aulaApp.directive("lecturaRecomendada", ["versionApp","$rootScope", function (versionApp, $rootScope) {

return {
    restrict: 'EA',
    scope: {
      titulo: '@',
      texto:'@',
      url:'@',
      tipoArchivo:'@',
    },
    controllerAs: 'ctrl',
    bindToController: {

    },
    controller:function ($element, $scope, $sce , ModalService){
      // filtra el texto para detectar espacios
        this.textu = $element.attr("texto").replace(/\n/g, "<br>")
        $scope.text = $sce.trustAsHtml(this.textu);
      
         
            // $scope.template = '<div id="modal"><div id="overlay"><iframe src="'+url+'"></iframe><a href class="btn-close" ng-click="pdf.close()"><span class="lnr icon-arrow-left"></span></a></div><div id="fade"><div class="preloader"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div></div>';
            
             // modal lecturas recomendadas
             $scope.pdfModal = function() {
              ModalService.showModal({
                  controller: function(close, $sce){
                    this.close = close;
                    this.link = $sce.trustAsResourceUrl($scope.url);

                },
                controllerAs: "pdf",
                templateUrl: "modales.html",  
                bodyClass: "modal-open",
            });
          };
        // selecciona el tipo de enlace Interno externo
          $scope.externo = function(){
            if ($scope.tipoArchivo == "externo") {
               return true;
            }
            else{
               return false;
            }
        }
          $scope.interno = function(){
            if ($scope.tipoArchivo == "interno") {
               return true;
            }
            if ($scope.tipoArchivo == "" || $scope.tipoArchivo == null) {
               return true;
            }
            else{
                return false;
            }
          }
        
    }, 

    link: function ($scope, $element, $index) {
      
    },
    templateUrl: "lecturas-recomendadas.html",
    transclude: true,
};
}]);