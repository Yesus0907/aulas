// Utilizar para dejar elementos por defecto si estan vacios
// $scope[data.name] = (data.value.length > 0) ? data.value: defaults[data.name];



//==================================================================
//-- inicio del modulo principal llama a los demas componentes
//==================================================================
var aulaApp = angular.module('aulaApp', [

    'ngAnimate',
    'ui.router',
    'hj.gsapifyRouter',
    'MainCtrl',
    'headerMenuMod',
    'ui.scrollpoint',
    'avSlider',
    'oblador.lazytube',
    // 'videovi',
    'videoCapsula',
    'angularModalService',
    // 'slickCarousel',
    'vAccordion',    
    // 'slickExampleApp',
    // 'ironVimeoEmbed',
    ]);
aulaApp.config(['$sceProvider',function($sceProvider) {
  // Completely disable SCE.  For demonstration purposes only!
  // Do not use in new projects or libraries.
  $sceProvider.enabled(false);
}]);

// aulaApp.config(function($sceDelegateProvider) {
//   $sceDelegateProvider.resourceUrlWhitelist([
//     // Allow same origin resource loads.
//     'self',
//     // Allow loading from our assets domain.  Notice the difference between * and **.
//     // 'https://operacionesvirtuales.com/aula-virtual/**'
//     ' http://contenidos.areandina.edu.co/**'
//     // 'http://srv*.assets.example.com/**'
//   ]);

//   // The blacklist overrides the whitelist so the open redirect here is blocked.
//   $sceDelegateProvider.resourceUrlBlacklist([
//     // 'http://operacionesvirtuales.com/aula-virtual/1.0.0/**'
//     'http://myapp.example.com/clickThru**'
//   ]);
// });

/*Envía evento y mensaje al iframe*/
//==================================================================
//-- Se define version - se usara como directorio para todas las plantillas
//==================================================================
aulaApp.constant('versionApp', {
    appName: 'AulaVirtual - AREANDINA', 
    appVersion: '2.0.3',

    apiUrl: 'https://contenidos.areandina.edu.co/repo/aulacanvas/2.0/prod/assets/'

    // apiUrl: './assets/'

});
//==================================================================
//-- consume datos de canvas
//==================================================================
aulaApp.run(['$rootScope', function($rootScope) {

  window.parent.postMessage({message: 'startAv'}, 'https://areandina.instructure.com');

  $rootScope.datosCanvas = [
    {idCurso:'curso'},
    {idUser:'user'},
    {nameUser:'Estudiante'},
  ];

    window.addEventListener('message', function(event, $rootscope) {
      if(event.origin === 'https://areandina.instructure.com')
      {
        console.log('Received message: ' + event.data.message);
        if (event.data.message == 'getIdCourse'){

          var idCurso = event.data.parameter;
          $rootScope.$apply(function () {
            $rootScope.datosCanvas[0].idCurso = idCurso;
          });

          // console.log(idCurso);
        } else if(event.data.message == 'getIdUser'){

          var idUser = event.data.parameter;
          // $rootScope.datosCanvas.push({idUser:idUser});
          $rootScope.$apply(function () {
            $rootScope.datosCanvas[1].idUser = idUser;
          });

          // console.log(idUser);
        } else if(event.data.message == 'getNameUser'){

          var nameUser = event.data.parameter;
          // $rootScope.datosCanvas.push({idUser:idUser});
          $rootScope.$apply(function () {
            $rootScope.datosCanvas[2].nameUser = nameUser;
          });

          // console.log($rootScope.datosCanvas[1].nameUser);
        }
      }
      else
      {
        console.log('Frame no recibe mensaje desde instructure');
      }
    }, true);


}]);

aulaApp.factory('datosCanvas', ['$rootScope', function($rootScope) { 


  return {
      idCurso: $rootScope.datosCanvas[0].idCurso,
      idUser: $rootScope.datosCanvas[1].idUser,
      nameUser: $rootScope.datosCanvas[2].nameUser
    };
}]);

//==================================================================
//-- confuracion de rutas y animaciones
//==================================================================
 aulaApp.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 'gsapifyRouterProvider', 'versionApp',
      function ($stateProvider, $locationProvider, $urlRouterProvider, gsapifyRouterProvider, versionApp) {

        gsapifyRouterProvider.defaults = {
          enter: 'slideRight',
          leave: 'slideLeft',
        };

        gsapifyRouterProvider.transition('slideAbove', {
          duration: 1,
           
          ease: 'Quart.easeInOut',
          css: {
            y: '-100%',
          },
        });

        gsapifyRouterProvider.transition('slideBelow', {
          duration: 1,

          ease: 'Quart.easeInOut',
          css: {
            y: '100%',
            opacity:.5,
          },
        });

        gsapifyRouterProvider.transition('slideLeft', {
          duration:0.5,
          ease: 'Quint.easeInOut',
          css: {
            x: '-100%',
          },
        });

        gsapifyRouterProvider.transition('slideRight', {
          duration: 0.5,
          ease: 'Quint.easeInOut',
          css: {
            x: '100%',
          },
        });

        gsapifyRouterProvider.transition('fadeIn', {
          duration: 0.5,
          delay: 0.5,
          css: {
            opacity: 0,
          },
        });

        gsapifyRouterProvider.transition('fadeOut', {
          duration: 0.5,
          css: {
            opacity: 0,
          },
        });

        gsapifyRouterProvider.transition('scaleDown', {
          duration: 0.5,
          css: {
            scale: 0,
            opacity: 0,
          },
        });

        gsapifyRouterProvider.transition('css', {
          name: 'css',
        });

        // $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/');

// configuracion home

        $stateProvider.state('home', {
          url: '/',
          views: {
            main: {
              templateUrl:  versionApp.apiUrl + 'views/home.html',
              controller: 'homeCtrl',
            },
          },
          data: {
            'gsapifyRouter.main': {
              enter: {
                in: {

                  transition: 'slideAbove',
                  // transition:function () {
                  //   var transitions = Object.keys(gsapifyRouterProvider.transitions);
                  //   return transitions[transitions.length * Math.random() << 0];
                  // },
                  priority: 2,

                },
                out: {
                  transition: 'slideBelow',
                  priority: 2,
                },
              },
             leave: {
                in: {
                  transition: 'slideBelow',
                  priority: 2,
                },
                out: {
                  transition: 'slideAbove',
                  priority: 2,
                },
              }, 
            },
          },
        });
// configuracion inicio
        $stateProvider.state('inicio', {
          url: '/inicio',
          views: {
            main: {
              templateUrl: 'referentes/inicio.html',
              controller: 'inicioCtrl',
            },
          },
          data: {
            'gsapifyRouter.main': {
              enter: {
                in: {
                  transition: 'slideRight',
                  priority: 1,
                },
                out: {
                  transition: 'slideLeft',
                  priority: 1,
                },
              },
              leave: {
               in: {
                  transition: 'slideRight',
                  priority: 1,
                },
                out: {
                  transition: 'slideLeft',
                  priority: 1,
                },
              },
            },
          },
        });
// configuracion eje1
        $stateProvider.state('eje1', {
          url: '/eje1',
          views: {
            main: {
              templateUrl: 'referentes/eje1.html',
              controller: 'eje1Ctrl',
            },
          },
          data: {
            'gsapifyRouter.main': {
              enter: {
                in: {
                  transition: 'slideRight',
                  priority: 1,
                },
                out: {
                  transition: 'slideLeft',
                  priority: 1,
                },
              },
              leave: {
               in: {
                  transition: 'slideRight',
                  priority: 1,
                },
                out: {
                  transition: 'slideLeft',
                  priority: 1,
                },
              },
            },
          },
        });
// configuracion eje2
        $stateProvider.state('eje2', {
          url: '/eje2',
          views: {
            main: {
              templateUrl: 'referentes/eje2.html',
              controller: 'eje2Ctrl',
            },
          },
          data: {
            'gsapifyRouter.main': {
              enter: {
                in: {
                  transition: 'slideRight',
                  priority: 1,
                },
                out: {
                  transition: 'slideLeft',
                  priority: 1,
                },
              },
              leave: {
               in: {
                  transition: 'slideRight',
                  priority: 1,
                },
                out: {
                  transition: 'slideLeft',
                  priority: 1,
                },
              },
            },
          },
        });
// configuracion eje3
        $stateProvider.state('eje3', {
          url: '/eje3',
          views: {
            main: {
              templateUrl: 'referentes/eje3.html',
              controller: 'eje3Ctrl',
            },
          },
         data: {
            'gsapifyRouter.main': {
              enter: {
                in: {
                  transition: 'slideRight',
                  priority: 1,
                },
                out: {
                  transition: 'slideLeft',
                  priority: 1,
                },
              },
              leave: {
               in: {
                  transition: 'slideRight',
                  priority: 1,
                },
                out: {
                  transition: 'slideLeft',
                  priority: 1,
                },
              },
            },
          },
        });
// configuracion eje4
         $stateProvider.state('eje4', {
          url: '/eje4',
          views: {
            main: {
              templateUrl: 'referentes/eje4.html',
              controller: 'eje4Ctrl',
            },
          },
         data: {
            'gsapifyRouter.main': {
              enter: {
                in: {
                  transition: 'slideRight',
                  priority: 1,
                },
                out: {
                  transition: 'slideLeft',
                  priority: 1,
                },
              },
              leave: {
               in: {
                  transition: 'slideRight',
                  priority: 1,
                },
                out: {
                  transition: 'slideLeft',
                  priority: 1,
                },
              },
            },
          },
        });
// configuracion cierre
        $stateProvider.state('cierre', {
          url: '/cierre',
          views: {
            main: {
              templateUrl: 'referentes/cierre.html',
              controller: 'cierreCtrl',
            },
          },
           data: {
            'gsapifyRouter.main': {
              enter: {
                in: {
                  transition: 'slideRight',
                  priority: 1,
                },
                out: {
                  transition: 'slideLeft',
                  priority: 1,
                },
              },
              leave: {
               in: {
                  transition: 'slideRight',
                  priority: 1,
                },
                out: {
                  transition: 'slideLeft',
                  priority: 1,
                },
              },
            },
          },
        });
      },
    ]);

//==================================================================
//-- define el controlador principal
//==================================================================

  angular.module('MainCtrl', []).controller('MainCtrl', ['$element','$scope', '$state', '$log', 'versionApp',
    function ($element, $scope, $state, $log, versionApp) {
       console.log("****************************************");
       console.log("*******" + " " + versionApp.appName + " " + "********");
       console.log("****************" + " " + versionApp.appVersion + " " + "*****************");
       console.log("****************************************");

      
      //  $("body").on("click", ".btncurso", function () {
      //  console.log('envia mensaje aula virtual');
      //  // window.postMessage("Hello", "https://cluster51-files.instructure.com");
      //  window.parent.postMessage({message: 'assignmentsToModal'}, 'https://areandina.instructure.com');
      //  // window.parent.toModalLocal(href)
      // });

      $scope.$on('gsapifyRouter:enterStart', function (event, element, $rootScope) {
         
      });
      
      $scope.$on('gsapifyRouter:enterSuccess', function (event, element, $rootScope) {
        $scope.cabezon = element.attr('ui-view');
        if ($state.history.length) {
        
        }
      });

      $scope.$on('gsapifyRouter:leaveStart', function (event, element, $rootScope) {
        $scope.cabezon = element.attr('ui-view');
        if ($state.history.length) {
         
        }
      });

      $scope.$on('gsapifyRouter:leaveSuccess', function (event, element, $rootScope) {
        if ($state.history.length) {
         
        }
      });   
    },
  ]);
//==================================================================
//-- controladores de cada vista
//==================================================================

 aulaApp.controller('homeCtrl', ['$scope',
    function ($scope) {
      $scope.pageClass = 'home';
    },
  ]);

  aulaApp.controller('inicioCtrl', ['$scope',
    function ($scope) {
        $scope.pageId = '1';
        $scope.pageClass = 'page-inicio';
        $scope.inicio = 'Nuestra pregunta - Inicio';

    },
  ]);

  aulaApp.controller('eje1Ctrl', ['$scope', '$log',
    function ($scope, $log) {
    $scope.pageId = '2';
    $scope.pageClass = 'page-eje1';
    $scope.eje1 = 'Conceptualicemos - Eje 1';

    },
  ]);

  aulaApp.controller('eje2Ctrl', ['$scope', '$log', 
    function ($scope, $log) {
        $scope.pageId = '3';
    $scope.pageClass = 'page-eje2';
    $scope.eje2 = 'Analicemos la situación - Eje 2';
   

    },
  ]);

  aulaApp.controller('eje3Ctrl', ['$scope', '$log',
    function ($scope, $log) {
         $scope.pageId = '4';
    $scope.pageClass = 'page-eje3';
    $scope.eje3 = 'Pongamos en práctica - Eje 3';

    },
  ]);

  aulaApp.controller('eje4Ctrl', ['$scope', '$log',
    function ($scope, $log) {
          $scope.pageId = '5';
    $scope.pageClass = 'page-eje3';
    $scope.eje3 = 'Pongamos en práctica - Eje 3';

    },
  ]);

  aulaApp.controller('cierreCtrl', ['$scope', '$log',
    function ($scope, $log) {
          $scope.pageId = '6';
    $scope.pageClass = 'page-cierre';
    $scope.cierre = 'Evaluémonos - Cierre';

    },
  ]);

