// Utilizar para dejar elementos por defecto si estan vacios
// $scope[data.name] = (data.value.length > 0) ? data.value: defaults[data.name];

//==================================================================
//-- inicio del modulo principal llama a los demas componentes
//==================================================================
var aulaApp = angular.module("aulaApp", [
	"ngAnimate",
	"ui.router",
	"hj.gsapifyRouter",
	"MainCtrl",
	"headerMenuMod",
	"ui.scrollpoint",
	"avSlider",
	"oblador.lazytube",
	// 'videovi',
	"videoCapsula",
	"angularModalService",
	// 'slickCarousel',
	"vAccordion"
	// 'slickExampleApp',
	// 'ironVimeoEmbed',
]);

aulaConfig = createRoutes(config_global);
aulaApp.config([
	"$sceProvider",
	function ($sceProvider) {
		// Completely disable SCE.  For demonstration purposes only!
		// Do not use in new projects or libraries.
		$sceProvider.enabled(false);
	}
]);

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
aulaApp.constant("versionApp", {
	appName: "AulaVirtual - AREANDINA",
	appVersion: "2.0.3",

	apiUrl: 'https://contenidos.areandina.edu.co/repo/aulavirtual/assets/',
	// apiUrl: "./assets/"
});

//==================================================================
//-- consume datos de canvas
//==================================================================
aulaApp.run([
	"$rootScope",
	"$sce",
	function ($rootScope, $sce) {
		window.parent.postMessage(
			{ message: "startAv" },
			"https://areandina.instructure.com"
		);

		$rootScope.datosCanvas = {
			idCurso: "curso",
			idUser: "user",
			nameUser: "Estudiante",
			mailUser: "user@mail.com"
		};

		window.addEventListener(
			"message",
			function (event, $rootscope) {
				if (event.origin === "https://areandina.instructure.com") {
					console.log("Received message: " + event.data.message);
					if (event.data.message == "getIdCourse") {
						var idCurso = event.data.parameter;
						$rootScope.$apply(function () {
							$rootScope.datosCanvas.idCurso = idCurso;
						});

						// console.log(idCurso);
					} else if (event.data.message == "getIdUser") {
						var idUser = event.data.parameter;
						// $rootScope.datosCanvas.push({idUser:idUser});
						$rootScope.$apply(function () {
							$rootScope.datosCanvas.idUser = idUser;
						});

						// console.log(idUser);
					} else if (event.data.message == "getNameUser") {
						var nameUser = event.data.parameter;
						// $rootScope.datosCanvas.push({idUser:idUser});
						$rootScope.$apply(function () {
							$rootScope.datosCanvas.nameUser = nameUser;
						});

						// console.log($rootScope.datosCanvas[1].nameUser);
					} else if (event.data.message == "getMailUser") {
						var mailUser = event.data.parameter;
						// $rootScope.datosCanvas.push({idUser:idUser});
						$rootScope.$apply(function () {
							$rootScope.datosCanvas.mailUser = mailUser;
						});

						// console.log($rootScope.datosCanvas[1].nameUser);
					}
				} else {
					console.log("Frame no recibe mensaje desde instructure");
				}
			},
			true
		);
	}
]);

aulaApp.factory("datosCanvas", [
	"$rootScope",
	function ($rootScope) {
		return {
			idCurso: $rootScope.datosCanvas.idCurso,
			idUser: $rootScope.datosCanvas.idUser,
			nameUser: $rootScope.datosCanvas.nameUser,
			mailUser: $rootScope.datosCanvas.mailUser
		};
	}
]);

//==================================================================
//-- confuracion de rutas y animaciones
//==================================================================
aulaApp.config([
	"$stateProvider",
	"$locationProvider",
	"$urlRouterProvider",
	"gsapifyRouterProvider",
	"versionApp",
	function (
		$stateProvider,
		$locationProvider,
		$urlRouterProvider,
		gsapifyRouterProvider,
		versionApp
	) {
		gsapifyRouterProvider.defaults = {
			enter: "slideRight",
			leave: "slideLeft"
		};

		gsapifyRouterProvider.transition("slideAbove", {
			duration: 1,

			ease: "Quart.easeInOut",
			css: {
				y: "-100%"
			}
		});

		gsapifyRouterProvider.transition("slideBelow", {
			duration: 1,

			ease: "Quart.easeInOut",
			css: {
				y: "100%",
				opacity: 0.5
			}
		});

		gsapifyRouterProvider.transition("slideLeft", {
			duration: 0.5,
			ease: "Quint.easeInOut",
			css: {
				x: "-100%"
			}
		});

		gsapifyRouterProvider.transition("slideRight", {
			duration: 0.5,
			ease: "Quint.easeInOut",
			css: {
				x: "100%"
			}
		});

		gsapifyRouterProvider.transition("fadeIn", {
			duration: 0.5,
			delay: 0.5,
			css: {
				opacity: 0
			}
		});

		gsapifyRouterProvider.transition("fadeOut", {
			duration: 0.5,
			css: {
				opacity: 0
			}
		});

		gsapifyRouterProvider.transition("scaleDown", {
			duration: 0.5,
			css: {
				scale: 0,
				opacity: 0
			}
		});

		gsapifyRouterProvider.transition("css", {
			name: "css"
		});

		// $locationProvider.html5Mode(true);

		$urlRouterProvider.otherwise("/");

		// configuracion home

		$stateProvider.state("home", {
			url: "/",
			views: {
				main: {
					templateUrl: versionApp.apiUrl + "views/home.html",
					controller: "homeCtrl"
				}
			},
			data: {
				"gsapifyRouter.main": {
					enter: {
						in: {
							transition: "slideAbove",
							// transition:function () {
							//   var transitions = Object.keys(gsapifyRouterProvider.transitions);
							//   return transitions[transitions.length * Math.random() << 0];
							// },
							priority: 2
						},
						out: {
							transition: "slideBelow",
							priority: 2
						}
					},
					leave: {
						in: {
							transition: "slideBelow",
							priority: 2
						},
						out: {
							transition: "slideAbove",
							priority: 2
						}
					}
				}
			}
		});

		initPagesRouters(aulaConfig, $stateProvider);
	}
]);
initControllers(aulaConfig);
//==================================================================
//-- define el controlador principal
//==================================================================

angular.module("MainCtrl", []).controller("MainCtrl", [
	"$element",
	"$scope",
	"$state",
	"$log",
	"versionApp",
	"$rootScope",
	"$sce",
	function ($element, $scope, $state, $log, versionApp, $rootScope, $sce) {
		console.log("****************************************");
		console.log("*******" + " " + versionApp.appName + " " + "********");
		console.log(
			"****************" +
			" " +
			versionApp.appVersion +
			" " +
			"*****************"
		);
		console.log("****************************************");

		//  $("body").on("click", ".btncurso", function () {
		//  console.log('envia mensaje aula virtual');
		//  // window.postMessage("Hello", "https://cluster51-files.instructure.com");
		//  window.parent.postMessage({message: 'assignmentsToModal'}, 'https://areandina.instructure.com');
		//  // window.parent.toModalLocal(href)
		// });
		$rootScope.config = createRoutes(config_global, $sce);
		aulaConfig = $rootScope.config;
		$scope.configuration = $rootScope.config;
		$scope.$on("gsapifyRouter:enterStart", function (
			event,
			element,
			$rootScope
		) { });

		$scope.$on("gsapifyRouter:enterSuccess", function (
			event,
			element,
			$rootScope
		) {
			$scope.cabezon = element.attr("ui-view");
			if ($state.history.length) {
			}
		});

		$scope.$on("gsapifyRouter:leaveStart", function (
			event,
			element,
			$rootScope
		) {
			$scope.cabezon = element.attr("ui-view");
			if ($state.history.length) {
			}
		});

		$scope.$on("gsapifyRouter:leaveSuccess", function (
			event,
			element,
			$rootScope
		) {
			if ($state.history.length) {
			}
		});
	}
]);

function initPagesRouters(aulaConfig, provider) {
	aulaConfig.forEach(initRouter);
	function initRouter(item, index, arr) {
		var page = buildConfig(item, arr.length);

		provider.state(page.route, {
			url: "/" + page.route,
			views: {
				main: {
					templateUrl: "referentes/" + page.template + ".html",
					controller: page.controller
				}
			},
			data: {
				"gsapifyRouter.main": {
					enter: {
						in: {
							transition: "slideRight",
							priority: 1
						},
						out: {
							transition: "slideLeft",
							priority: 1
						}
					},
					leave: {
						in: {
							transition: "slideRight",
							priority: 1
						},
						out: {
							transition: "slideLeft",
							priority: 1
						}
					}
				},
				page: {
					index: page.index
				}
			}
		});
	}
}

//==================================================================
//-- Controllador Home
//==================================================================

aulaApp.controller("homeCtrl", [
	"$scope",
	"$rootScope",
	function ($scope, $rootScope) {
		$scope.pageClass = "home";
		$scope.typeLabel = config_global.type_label;
		$scope.type = config_global.type;

		$scope.alert = function (state, $event) {
			if (state == "enter") {
				setTimeout(function () {
					$("[name=" + "Abar" + ($event + 1) + "]").addClass("change");
					$("[name=" + "Abar" + $event + "]").addClass("change");
				}, 200);
			} else {
				setTimeout(function () {
					$("[name=" + "Abar" + ($event + 1) + "]").removeClass("change");
					$("[name=" + "Abar" + $event + "]").removeClass("change");
				}, 200);
			}
		};

		$scope.homemenu = $rootScope.config;
	}
]);

//==================================================================
//-- INICIAR CONTROLADORES INTERNOS
//==================================================================
function initControllers(aulaConfig) {
	aulaConfig.forEach(initController);
	function initController(item, index, arr) {
		console.log("controller");
		var page = buildConfig(item, arr.length);
		aulaApp.controller(page.controller, [
			"$scope",
			function ($scope) {
				console.log("intocontroller", item);
				$scope.pageId = item.index;
			}
		]);
	}
}

//==================================================================
//-- INICIAR CONTROLADORES INTERNOS
//==================================================================
function buildConfig(item, total) {
	var index = item.index;
	var type = item.type;
	var controller =
		item.index === 0 || total === index + 1
			? type + "Ctrl"
			: type + index + "Ctrl";
	var route = item.index === 0 || total === index + 1 ? type : type + index;
	var template =
		item.index === 0 || total === index + 1 ? type : "eje" + index;

	return {
		index: index,
		type: type,
		controller: controller,
		route: route,
		template: template
	};
}

function createRoutes(data, $sce) {
	var $count = data.cant;
	var iterator = [];
	var listdefault = [
		{
			context: "Nuestra pregunta",
			contextRaw: "Nuestra pregunta",
			background: "Nues <br> tra <br> pre <br> gun <br>ta",
			context_open: "Nuestra pregunta",
			icon:
				"./assets/img/home/inicio.png",
			small_icon: "icon-pregunta",
			color: "oscuro"
		},
		{
			context: "Evaluémonos",
			contextRaw: "Evaluémonos",
			background: "eva <br> lue <br> mo <br> nos",
			context_open: "Evaluémonos",
			icon:
				"./assets/img/home/evaluemonos.png",
			small_icon: "icon-lupa",
			color: "oscuro"
		}
	];

	var list = [
		{
			context: "Conceptualicemos",
			contextRaw: "Conceptualicemos",
			background: "con <br> cep <br> tua<br> lice <br>mos",
			context_open: "Conceptualicemos",
			icon:
				"./assets/img/home/conceptualicemos.png",
			small_icon: "icon-libro"
		},
		{
			context: "Analicemos la<br> situación",
			contextRaw: "Analicemos la situación",
			background: "ana <br> lice <br> mos<br> la si<br>tua <br>cíon",
			context_open: "Analicemos la<br> situación",
			icon:
				"./assets/img/home/alanicemos-la-situacion.png",
			small_icon: "icon-engranaje"
		},
		{
			context: "Pongamos en<br> práctica",
			contextRaw: "Pongamos en práctica",
			background: "pon <br> ga <br>mos <br> en <br> prác<br>tica ",
			context_open: "Pongamos en<br> práctica",
			icon:
				"./assets/img/home/pongamos-en-practica.png",
			small_icon: "icon-lego"
		},
		{
			context: "Propongamos",
			contextRaw: "Propongamos",
			background: "pro <br> pon <br> ga <br> mos ",
			context_open: "Propongamos",
			icon:
				"./assets/img/home/propongamos.png",
			small_icon: "icon-bombillo"
		}
	];
	iterator.push({
		index: 0,
		type: "inicio",
		typeLabel: "inicio",
		type_context: data.type_context,
		assets: listdefault[0]
	});
	for (var i = 0; i < $count; i++) {
		var index = i + 1;

		iterator.push({
			index: index,
			type: data.type,
			typeLabel: data.type_label,
			type_context: config_global.type_context,
			assets: list[i]
		});
	}
	iterator.push({
		index: iterator.length,
		type: "cierre",
		typeLabel: "Cierre",
		type_context: data.type_context,
		assets: listdefault[1]
	});
	return iterator;
}
