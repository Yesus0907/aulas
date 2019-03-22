
//==================================================================
//---- header
//==================================================================
angular
  .module('headerMenuMod', ['headerMenuMod'])
  .component('headerMenu', {
    controller: function($scope, versionApp, $rootScope) {
        var vm = this;

        $scope.nombreUsuario = $rootScope.datosCanvas[2].nameUser;

        var vista = $(".areaContent").attr("data-state");

        if (vista == "inicio") {
            $(".guiadot , .headerMenu").addClass("oscuro");
            $scope.eje = "INICIO";
            $scope.nombreEje = "Pregunta";

        }else if (vista == "eje1"){
            $(".guiadot , .headerMenu").removeClass("oscuro");
            $scope.eje = "EJE 1";
            $scope.nombreEje = "Conceptualicemos";

        }else if (vista == "eje2"){
            $(".guiadot , .headerMenu").removeClass("oscuro");
            $scope.eje = "EJE 2";
            $scope.nombreEje = "Analicemos";

        }else if (vista == "eje3"){
            $(".guiadot , .headerMenu").removeClass("oscuro");
            $scope.eje = "EJE 3";
            $scope.nombreEje = "Pongamos en práctica";

        }else if (vista == "eje4"){
            $(".guiadot , .headerMenu").removeClass("oscuro");
            $scope.eje = "EJE 4";
            $scope.nombreEje = "Propongamos";

        }else if (vista == "cierre"){
            $(".guiadot , .headerMenu").addClass("oscuro");
            $scope.eje = "CIERRE";
            $scope.nombreEje = "Evaluémonos";
        }
        $scope.ifCierre = function(){
            if (vista == "cierre") {
                return true
            }else{
                return false
            }
        };
       },
       bindings: {
        imagen: "@",
        titulo: "@",
        autorFoto:"@",
        autorNombre:"@",
        autorDescripcion:"@",
      },
   // templateUrl:function(versionApp){
   //      return versionApp.apiUrl + "views/header-menu.html"
   //  },
       templateUrl:'header-menu.html',
  });



///====================================
///=== Boton para el menu pincipal interno
///====================================


aulaApp.directive("buttonPrincipalMenu", ["versionApp", "$rootScope", function (versionApp, $rootScope) {

return {
    restrict: 'EA',
    scope: {

    },
    controllerAs: 'ctrl',
     bindToController: {
    },
    controller: function($element, $scope, $sce, $rootScope, ModalService) {

       $scope.tareasLoad = function(){
        $scope.tareas = 'https://areandina.instructure.com/courses/'+ $rootScope.datosCanvas[0].idCurso +'/assignments';
        return $scope.tareas;
       };


    // modal conoce tu plataforma
           $scope.pdfModal = function() {
              ModalService.showModal({
                  controller: function(close, $sce, $rootScope){
                    this.close = close;
                    this.link = $sce.trustAsResourceUrl('https://player.vimeo.com/video/232370608');

                },
                controllerAs: "pdf",
                templateUrl: "modalConocePlataforma.html",  
                bodyClass: "modal-open",
            });
          };

     
    },  
    link: function ($scope, $element) {
    
        $("body").on("click", ".menu-button", function () {
             $(".menu-button").toggleClass('menu-button--open');
              $("body").toggleClass('open-body');
        });
        $("body").on("click", ".trigg", function () {
             $(".menu-button").removeClass('menu-button--open');
             $("body").removeClass('open-body');

            function scrollToTop(scrollDuration) {
                var cosParameter = window.scrollY / 2,
                    scrollCount = 0,
                    oldTimestamp = performance.now();
                function step (newTimestamp) {
                    scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
                    if (scrollCount >= Math.PI) window.scrollTo(0, 0);
                    if (window.scrollY === 0) return;
                    window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
                    oldTimestamp = newTimestamp;
                    window.requestAnimationFrame(step);
                }
                window.requestAnimationFrame(step);
            }
            scrollToTop(1000);
        });
    },
     templateUrl:function(){
        return versionApp.apiUrl + "views/top-buttons.html"
    },
     // templateUrl:'top-buttons.html',
};
}]);

