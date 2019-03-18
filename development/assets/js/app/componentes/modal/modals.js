aulaApp.directive("modal", ["versionApp", "$timeout", function (versionApp, $timeout) {

  return {
    // require: '^myParentDirective',
    restrict: 'EA',
    scope: {
      url: '@',
      texto: '@',
      tipo: '@',
    },
    controllerAs: 'ctrl',
    bindToController: {
    },
    controller: function ($scope, $rootScope, ModalService, $element, $sce, datosCanvas) {




      // $scope.prueba = datosCanvas.idUser;
      // console.log($scope.prueba + "  ID USER");
      //  $scope.prueba2 = datosCanvas.idCurso;
      // console.log($scope.prueba2 + "  ID curso");
      //  $scope.prueba3 = datosCanvas.nameUser;
      // console.log($scope.prueba3 + "  nombre user");






      $scope.pdfModal = function () {
        ModalService.showModal({
          controller: function (close, $sce) {
            this.close = close;
		  this.link = $sce.trustAsResourceUrl($scope.url);

          },
          controllerAs: "pdf",
          templateUrl: "modales.html",
          bodyClass: "modal-open",
        });
      };
      $scope.clase = function () {
        if ($scope.tipo == "large") {
          return "btn-large";
        } else {
          return "btn-cuadrado";
        }
      }
      
      $scope.botonModal = function(){
        var d = [
          {
            "nombre": "default",
            "icono": "icon-film-play",
            "class": "default"
          },
          {
            "nombre": "videorelato",
            "icono": "icon-camera-video",
            "class": "videorelato"
          },
          {
            "nombre": "prueba objetiva",
            "icono": "icon-eye",
            "class": "pruebaObjetiva"
          },
          // ====
          // ==== SE AGREGAN ESTOS NUEVOS A PETICIÓN DE REUNIÓN 30/11/2018 ===
          // ====
          {
            "nombre": "videorresumen i",
            "icono": "icon-camera-video",
            "class": "videoresumen"
          },
          {
            "nombre": "videorresumen ii",
            "icono": "icon-camera-video",
            "class": "videoresumen"
          },
          {
            "nombre": "videorresumen iii",
            "icono": "icon-camera-video",
            "class": "videoresumen"
          },
          //--==--==--==--==--==--==--==--//
          {
            "nombre": "videorrelato",
            "icono": "icon-camera-video",
            "class": "videorelato"
          },
          //=========================================================
          //=========================================================
          {
            "nombre": "videoresumen",
            "icono": "icon-camera-video",
            "class": "videoresumen"
          },
          {
            "nombre": "nube de palabras",
            "icono": "icon-cloud",
            "class": "nubePalabras"
          },
          {
            "nombre": "multimedia",
            "icono": "icon-film-play",
            "class": "multimedia"
          },
          {
            "nombre": "pdf",
            "icono": "icon-file-add",
            "class": "pdf"
          },
          {
            "nombre": "infografía",
            "icono": "icon-map",
            "class": "infografia"
          },
          {
            "nombre": "memonota",
            "icono": "icon-layers",
            "class": "memonota"
          },
          {
            "nombre": "crucigrama",
            "icono": "icon-dice",
            "class": "crucigrama"
          },
          {
            "nombre": "sopa de letras",
            "icono": "icon-dice",
            "class": "sopaLetras"
          },
          {
            "nombre": "organizador gráfico",
            "icono": "icon-list",
            "class": "organizadorGrafico"
          },
          {
            "nombre": "control de lectura",
            "icono": "icon-file-empty",
            "class": "controlLectura"
          },
          {
            "nombre": "caso simulado",
            "icono": "icon-user",
            "class": "casoSimulado"
          },
          {
            "nombre": "caso modelo",
            "icono": "icon-user",
            "class": "casoModelo"
          },
          {
            "nombre": "actividad de repaso",
            "icono": "icon-flag",
            "class": "actividadRepaso"
          },
          {
            "nombre": "emparejamiento",
            "icono": "icon-dice",
            "class": "emparejamiento"
          },
          {
            "nombre": "juego de roles",
            "icono": "icon-user",
            "class": "juegoRoles"
          },
          {
            "nombre": "podcast",
            "icono": "icon-mic",
            "class": "podcast"
          },
          {
            "nombre": "zonas activas",
            "icono": "multimedia",
            "class": "zonasActivas"
          },
          {
            "nombre": "demostración de roles",
            "icono": "icon-smile",
            "class": "demostracionRoles"
          },
          {
            "nombre": "actividad",
            "icono": "icon-rocket",
            "class": "actividad"
          },
          {
            "nombre": "galería",
            "icono": "icon-picture",
            "class": "galeria"
          },
        ];
        // error- buscar solucion para esto, afecta el compilado
        $scope.ide = function () {
          var nombreBoton = $($element).attr("texto").toLowerCase();
          // var obtenerId = d.findIndex(d, function(o) { return o.nombre === nombreBoton; });
          var obtenerId = d.findIndex(x => x.nombre === nombreBoton);
          // var obtenerId = "";
          // var obtenerId = d.find(function(d, i){
          //   if(d.nombre === nombreBoton){
          //     return i;
          //   }
          // });            
          
    //   var inventario = [
    //     {nombre: 'manzanas', cantidad: 2},
    //     {nombre: 'bananas', cantidad: 0},
    //     {nombre: 'cerezas', cantidad: 5}
    // ];
    
        // function esCereza(id) { 
        //     return id.nombre === nombreBoton;
        // }
    
        //    console.log(d.find(esCereza.icono));
    // { nombre: 'cerezas', cantidad: 5 }
          // var icono = "";
          // var clase = "";

        //   d.forEach(function(element) {
        //     if(element.nombre === nombreBoton){
        //       icono = element.icono;
        //       clase = element.clase;
        //     }else{
        //       icono = "default";
        //       clase = element.clase;
        //     }
            
        // });

          if (obtenerId < 1) {
            return 0
          } else {
            return obtenerId
          }
        }
        var id = $scope.ide();
  
        var icono = d[id].icono;
        var clase = d[id].class;

        return {
          icono: icono,
          clase: clase
        };

        
      }
    },
    // template:'<button class="{{clase()}} {{icono()}} magenta" ng-click="pdfModal()"><p>{{texto}}</p><span class="lnr icon-file-empty"></span></button>',
    template: '<button class="{{clase()}} {{botonModal().clase}}  magenta" ng-click="pdfModal()"><span class="right"></span><span class="lnr {{botonModal().icono}}"></span><p>{{texto}}<span>Ver recurso</span></p>',
    transclude: true,
  };
}]);
