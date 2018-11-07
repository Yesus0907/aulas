aulaApp.directive("acordeon", ["versionApp", function (versionApp) {

return {
    restrict: 'EA',
    scope: {
      titulo: '@',
      texto:'@',
      id:'@',
      urlReferente:"@",
    },
    controllerAs: 'ctrl',
    bindToController: {

    },
    controller:function ($element, $scope, $sce, ModalService){
      // permite incluir espacios en el texto
      if ($scope.texto == null || $scope.texto == 0) {
      }else{
        this.textu = $element.attr("texto").replace(/\n/g, "<br>")
        $scope.text = $sce.trustAsHtml(this.textu);
      }
      //modal
      $scope.pdfModal = function() {
        ModalService.showModal({
                  controller: function(close, $sce){
                    this.close = close;
                    this.link = $sce.trustAsResourceUrl($scope.urlReferente);
                },
                controllerAs: "pdf",
                templateUrl: "modales.html",  
                bodyClass: "modal-open",
        });    
      };

      // oculta la seccion de referente si no hay contenido
        $scope.showReferente = function(){
          if ($scope.texto == null || $scope.texto == 0 || $scope.urlReferente == 0 || $scope.urlReferente == null ) {
            return false;
          }else{
            return true;
          }
        };

    }, 

    link: function ($scope, $element, $index) {

    },
    //  templateUrl:function($element, controller, $scope, attrs){
    //     return versionApp.apiUrl + "views/acordeon.html"
    // },
    templateUrl:'acordeon.html',
    transclude: true,
};

}]);