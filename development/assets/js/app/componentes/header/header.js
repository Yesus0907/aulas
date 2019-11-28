//==================================================================
//---- header
//==================================================================
angular.module("headerMenuMod", ["headerMenuMod"]).component("headerMenu", {
	controller: function ($scope, versionApp, $rootScope, $sce) {
		var vm = this;

		$scope.nombreUsuario = $rootScope.datosCanvas.nameUser;

		var vista = $(".areaContent").attr("data-state");
		var config = $rootScope.config;

		var page = $.grep(config, function (item, i) {
			var create =
				item.index === 0 || item.index === config.length - 1
					? item.type
					: item.type + item.index;
			return vista === create;
		});

		$scope.page = page[0];

		if (page[0].assets.color === "oscuro") {
			$(".guiadot , .headerMenu").addClass("oscuro");
		} else {
			$(".guiadot , .headerMenu").removeClass("oscuro");
		}

		$scope.eje = page[0].type;
		$scope.nombreEje = page[0].assets.contextRaw;
		console.log("page", page);
		// if (vista == page[0].type) {

		// 	$scope.eje = page[0].type;
		// 	$scope.nombreEje = "Pregunta";

		// } else if (vista == page[0].type + "1") {
		// 	$(".guiadot , .headerMenu").removeClass("oscuro");
		// 	$scope.eje = "EJE 1";
		// 	$scope.nombreEje = "Conceptualicemos";

		// } else if (vista == page[0].type + "2") {
		// 	$(".guiadot , .headerMenu").removeClass("oscuro");
		// 	$scope.eje = "EJE 2";
		// 	$scope.nombreEje = "Analicemos";

		// } else if (vista == page[0].type + "3") {
		// 	$(".guiadot , .headerMenu").removeClass("oscuro");
		// 	$scope.eje = "EJE 3";
		// 	$scope.nombreEje = "Pongamos en práctica";

		// } else if (vista == page[0].type + "4") {
		// 	$(".guiadot , .headerMenu").removeClass("oscuro");
		// 	$scope.eje = "EJE 4";
		// 	$scope.nombreEje = "Propongamos";

		// } else if (vista == page[0].type) {
		// 	$(".guiadot , .headerMenu").addClass("oscuro");
		// 	$scope.eje = "CIERRE";
		// 	$scope.nombreEje = "Evaluémonos";
		// }
		$scope.ifCierre = function () {
			if (vista == "cierre") {
				return true;
			} else {
				return false;
			}
		};
	},
	bindings: {
		imagen: "@",
		titulo: "@",
		autorFoto: "@",
		autorNombre: "@",
		autorDescripcion: "@"
	},
	templateUrl: function (versionApp) {
		return versionApp.apiUrl + "views/header-menu.html";
	}
	// templateUrl: 'header-menu.html',
});

///====================================
///=== Boton para el menu pincipal interno
///====================================

aulaApp.directive("buttonPrincipalMenu", [
	"versionApp",
	"$rootScope",
	function (versionApp, $rootScope) {
		return {
			restrict: "EA",
			scope: {},
			controllerAs: "ctrl",
			bindToController: {},
			controller: function (
				$element,
				$scope,
				$sce,
				$rootScope,
				ModalService
			) {
				var root = $rootScope.datosCanvas;
				$scope.canvas = $rootScope.config[0].type_context
				console.log("header", $rootScope)

				$scope.tareasLoad = function () {
					$scope.tareas =
						"https://areandina.instructure.com/courses/" +
						root.idCurso +
						"/assignments";
					return $scope.tareas;
				};

				$scope.bibliotecaLink = function () {
					$scope.biblioteca =
						"https://servicios.areandina.edu.co/services/canvas/biblioteca/index.php?username=" +
						root.mailUser +
						"&iduser=" +
						root.idUser;
					return $scope.biblioteca;
				};

				// modal conoce tu plataforma
				$scope.pdfModal = function () {
					ModalService.showModal({
						controller: function (close, $sce, $rootScope) {
							this.close = close;
							this.link = $sce.trustAsResourceUrl(
								"https://player.vimeo.com/video/232370608"
							);
						},
						controllerAs: "pdf",
						templateUrl: "modalConocePlataforma.html",
						bodyClass: "modal-open"
					});
				};
			},
			link: function ($scope, $element) {
				$("body").on("click", ".menu-button", function () {
					$(".menu-button").toggleClass("menu-button--open");
					$("body").toggleClass("open-body");
				});
				$("body").on("click", ".trigg", function () {
					$(".menu-button").removeClass("menu-button--open");
					$("body").removeClass("open-body");

					function scrollToTop(scrollDuration) {
						var cosParameter = window.scrollY / 2,
							scrollCount = 0,
							oldTimestamp = performance.now();
						function step(newTimestamp) {
							scrollCount +=
								Math.PI /
								(scrollDuration / (newTimestamp - oldTimestamp));
							if (scrollCount >= Math.PI) window.scrollTo(0, 0);
							if (window.scrollY === 0) return;
							window.scrollTo(
								0,
								Math.round(
									cosParameter + cosParameter * Math.cos(scrollCount)
								)
							);
							oldTimestamp = newTimestamp;
							window.requestAnimationFrame(step);
						}
						window.requestAnimationFrame(step);
					}
					scrollToTop(1000);
				});
			},
			templateUrl: function () {
				return versionApp.apiUrl + "views/top-buttons.html";
			}
			// templateUrl:'top-buttons.html',
		};
	}
]);
