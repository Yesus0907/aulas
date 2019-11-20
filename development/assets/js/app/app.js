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
aulaApp.config(['$sceProvider', function ($sceProvider) {
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

	// apiUrl: 'https://contenidos.areandina.edu.co/repo/aulacanvas/2.0/prod/assets/',
	apiUrl: './assets/'

});


//==================================================================
//-- consume datos de canvas
//==================================================================
aulaApp.run(['$rootScope', function ($rootScope) {

	window.parent.postMessage({ message: 'startAv' }, 'https://areandina.instructure.com');

	$rootScope.datosCanvas = {
		idCurso: 'curso',
		idUser: 'user',
		nameUser: 'Estudiante',
		mailUser: 'user@mail.com',
	};

	$rootScope.config = config_global


	window.addEventListener('message', function (event, $rootscope) {
		if (event.origin === 'https://areandina.instructure.com') {
			console.log('Received message: ' + event.data.message);
			if (event.data.message == 'getIdCourse') {

				var idCurso = event.data.parameter;
				$rootScope.$apply(function () {
					$rootScope.datosCanvas.idCurso = idCurso;
				});

				// console.log(idCurso);
			} else if (event.data.message == 'getIdUser') {

				var idUser = event.data.parameter;
				// $rootScope.datosCanvas.push({idUser:idUser});
				$rootScope.$apply(function () {
					$rootScope.datosCanvas.idUser = idUser;
				});

				// console.log(idUser);
			} else if (event.data.message == 'getNameUser') {

				var nameUser = event.data.parameter;
				// $rootScope.datosCanvas.push({idUser:idUser});
				$rootScope.$apply(function () {
					$rootScope.datosCanvas.nameUser = nameUser;
				});

				// console.log($rootScope.datosCanvas[1].nameUser);
			}
			else if (event.data.message == 'getMailUser') {

				var mailUser = event.data.parameter;
				// $rootScope.datosCanvas.push({idUser:idUser});
				$rootScope.$apply(function () {
					$rootScope.datosCanvas.mailUser = mailUser;
				});

				// console.log($rootScope.datosCanvas[1].nameUser);
			}
		}
		else {
			console.log('Frame no recibe mensaje desde instructure');
		}
	}, true);


}]);

aulaApp.factory('datosCanvas', ['$rootScope', function ($rootScope) {


	return {
		idCurso: $rootScope.datosCanvas.idCurso,
		idUser: $rootScope.datosCanvas.idUser,
		nameUser: $rootScope.datosCanvas.nameUser,
		mailUser: $rootScope.datosCanvas.mailUser
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
				opacity: .5,
			},
		});

		gsapifyRouterProvider.transition('slideLeft', {
			duration: 0.5,
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
		console.log(config_global)


		$stateProvider.state('home', {
			url: '/',
			views: {
				main: {
					templateUrl: versionApp.apiUrl + 'views/home.html',
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

		if (config_global) {
			$count = config_global.cant
			$types = config_global.type

			for (var i = 0; i < $count; i++) {
				var index = (i + 1)
				$stateProvider.state(
					$types + index,
					{
						url: '/' + $types + index,
						views: {
							main: {
								templateUrl: 'referentes/eje' + index + '.html',
								controller: $types + index + 'Ctrl'
							}
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
					})
			}
		}
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

angular.module('MainCtrl', []).controller('MainCtrl', ['$element', '$scope', '$state', '$log', 'versionApp',
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

aulaApp.controller('homeCtrl', ['$scope', '$sce',
	function ($scope, $sce) {
		$scope.pageClass = 'home';
		$scope.typeLabel = config_global.type_label
		$scope.type = config_global.type


		$count = config_global.cant
		var iterator = []

		$scope.listdefault = [
			{
				context: 'Nuestra pregunta',
				background: $sce.trustAsHtml('Nues <br> tra <br> pre <br> gun <br>ta'),
				context_open: $sce.trustAsHtml('Nuestra pregunta'),
				icon: 'https://contenidos.areandina.edu.co/repo/aulacanvas/1.0.0/prod/img/inicio.png',
				small_icon: 'icon-pregunta'
			},
			{
				context: 'Evaluémonos',
				background: $sce.trustAsHtml('eva <br> lue <br> mo <br> nos'),
				context_open: 'Evaluémonos',
				icon: 'https://contenidos.areandina.edu.co/repo/aulacanvas/1.0.0/prod/img/evaluemonos.png',
				small_icon: 'icon-lupa'
			}
		]
		$scope.list = [

			{
				context: 'Conceptualicemos',
				background: $sce.trustAsHtml('con <br> cep <br> tua<br> lice <br>mos'),
				context_open: $sce.trustAsHtml('Conceptualicemos'),
				icon: 'https://contenidos.areandina.edu.co/repo/aulacanvas/1.0.0/prod/img/conceptualicemos.png',
				small_icon: 'icon-libro'
			},
			{
				context: $sce.trustAsHtml('Analicemos la<br> situación'),
				background: $sce.trustAsHtml('ana <br> lice <br> mos<br> la si<br>tua <br>cíon'),
				context_open: $sce.trustAsHtml('Analicemos la<br> situación'),
				icon: 'https://contenidos.areandina.edu.co/repo/aulacanvas/1.0.0/prod/img/alanicemos-la-situacion.png',
				small_icon: 'icon-engranaje'
			},
			{
				context: $sce.trustAsHtml('Pongamos en<br> práctica'),
				background: $sce.trustAsHtml('pon <br> ga <br>mos <br> en <br> prác<br>tica '),
				context_open: $sce.trustAsHtml('Pongamos en<br> práctica'),
				icon: 'https://contenidos.areandina.edu.co/repo/aulacanvas/1.0.0/prod/img/pongamos-en-practica.png',
				small_icon: 'icon-lego'
			},
			{
				context: 'Propongamos',
				background: $sce.trustAsHtml('pro <br> pon <br> ga <br> mos '),
				context_open: $sce.trustAsHtml('Propongamos'),
				icon: 'https://contenidos.areandina.edu.co/repo/aulacanvas/1.0.0/prod/img/propongamos.png',
				small_icon: 'icon-bombillo'
			},

		]
		iterator.push(
			{
				index: 0,
				type: 'inicio',
				typeLabel: 'inicio',
				type_context: config_global.type_context,
				assets: $scope.listdefault[0]
			}
		)
		for (var i = 0; i < ($count); i++) {
			var index = (i + 1)

			iterator.push(
				{
					index,
					type: $scope.type,
					typeLabel: $scope.typeLabel,
					type_context: config_global.type_context,
					assets: $scope.list[i]
				}
			)



		}
		iterator.push(
			{
				index: iterator.length + 1,
				type: 'cierre',
				typeLabel: 'Cierre',
				type_context: config_global.type_context,
				assets: $scope.listdefault[1]
			}
		)
		console.log(iterator)
		$scope.alert = function (state, $event) {
			if (state == 'enter') {
				setTimeout(() => {
					$("[name=" + 'Abar' + ($event + 1) + "]").addClass('change');
					$("[name=" + 'Abar' + ($event) + "]").addClass('change');
				}, 200);

			} else {
				setTimeout(() => {
					$("[name=" + 'Abar' + ($event + 1) + "]").removeClass('change');
					$("[name=" + 'Abar' + ($event) + "]").removeClass('change');
				}, 200);
			}
		}


		$scope.homemenu = iterator

		console.log($scope.homemenu)
	},
]);

aulaApp.controller('inicioCtrl', ['$scope',
	function ($scope) {
		$scope.pageId = '1';
		$scope.pageClass = 'page-inicio';
		$scope.inicio = 'Nuestra pregunta - Inicio';

	},
]);

if (config_global) {
	$count = config_global.cant
	$types = config_global.type


	for (var i = 0; i < $count; i++) {
		var index = (i + 1)
		console.log(index)
		test(index)
	}
}
function prueba() {
	console.log('test')
}
function test() {
	aulaApp.controller($types + index + 'Ctrl', ['$scope', '$log',
		function ($scope) {
			$scope.pageId = index;
		},
	]);
}
// aulaApp.controller('eje1Ctrl', ['$scope', '$log',
// 	function ($scope, $log) {
// 		$scope.pageId = '2';
// 		$scope.pageClass = 'page-eje1';
// 		$scope.eje1 = 'Conceptualicemos - Eje 1';

// 	},
// ]);

// aulaApp.controller('eje2Ctrl', ['$scope', '$log',
// 	function ($scope, $log) {
// 		$scope.pageId = '3';
// 		$scope.pageClass = 'page-eje2';
// 		$scope.eje2 = 'Analicemos la situación - Eje 2';
// 	},
// ]);

// aulaApp.controller('eje3Ctrl', ['$scope', '$log',
// 	function ($scope, $log) {
// 		$scope.pageId = '4';
// 		$scope.pageClass = 'page-eje3';
// 		$scope.eje3 = 'Pongamos en práctica - Eje 3';

// 	},
// ]);

// aulaApp.controller('eje4Ctrl', ['$scope', '$log',
// 	function ($scope, $log) {
// 		$scope.pageId = '5';
// 		$scope.pageClass = 'page-eje3';
// 		$scope.eje3 = 'Pongamos en práctica - Eje 3';

// 	},
// ]);

aulaApp.controller('cierreCtrl', ['$scope', '$log',
	function ($scope, $log) {
		$scope.pageId = '6';
		$scope.pageClass = 'page-cierre';
		$scope.cierre = 'Evaluémonos - Cierre';

	},
]);

