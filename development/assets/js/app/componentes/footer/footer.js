aulaApp.directive("avFooter", [
	"versionApp",
	"$rootScope",
	function (versionApp, $rootScope) {
		return {
			restrict: "EA",
			scope: {
				enlace: "@"
			},
			controllerAs: "ctrl",
			// controller: 'MainCtrl',
			controller: function (
				$element,
				$scope,
				$state,
				$log,
				$sce,
				$rootScope,
				ModalService,
				datosCanvas
			) {
				// console.log($rootScope.datosCanvas[0].idCurso);
				$scope.tareasLoad = function () {
					$scope.quizzes =
						"https://areandina.instructure.com/courses/" +
						datosCanvas.idCurso +
						"/modules";
					// // window.postMessage("Hello", "https://cluster51-files.instructure.com");
					// window.parent.postMessage({message: 'assignmentsToModal'}, 'https://areandina.instructure.com');
					return $scope.quizzes;
				};

				// obtiene url de referente completo
				$scope.referenteCompleto = $rootScope.referenteCompleto;
				// modal
				$scope.pdfModal = function () {
					ModalService.showModal({
						controller: function (close, $sce, $rootScope) {
							this.close = close;
							this.link = $sce.trustAsResourceUrl(
								$rootScope.referenteCompleto
							);
						},
						controllerAs: "pdf",
						templateUrl: "modales.html",
						bodyClass: "modal-open"
					});
				};
				$scope.config = $rootScope.config;
				// determina los estados state

				$rootScope.currentPage = $(".areaContent").attr("id");
				$rootScope.previousState;
				$rootScope.currentState = $(".areaContent").attr("data-state");
				$rootScope.futureState;

				$rootScope.$on("$stateChangeSuccess", function (
					ev,
					to,
					toParams,
					from,
					fromParams
				) {
					$rootScope.currentPage = to.data.page.index;

					$rootScope.previousState = from.name;
					$rootScope.currentState = to.name;
				});

				// obtiene nombre del pdf para descargar
				if ($scope.referenteCompleto == null) {
					if (
						$rootScope.currentState !== "cierre" &&
						$rootScope.currentState !== "inicio"
					) {
						alert(
							"No has incluido el referente de pensamiento en el contenedor principal del " +
							" " +
							$rootScope.currentState
						);
					}
				} else {
					var enlaceCompleto = $scope.referenteCompleto;
					var enlaceDescargar = enlaceCompleto.split("/");
					$scope.enlaceDes = enlaceDescargar[enlaceDescargar.length - 1];
				}
				// encuentra basado en el estado actual el siguiente eje
				var actual = $rootScope.currentState;
				// var builderNav = [];
				// $rootScope.config.forEach(initRouter);

				// function builderNav(item, index, arr) {
				//    item;
				// }
				var externalButton = {
					type: 'external',
					link: $scope.tareasLoad(),
					typeLabel: 'Evaluación de desempeño',
					type_context: $scope.config[0].type_context
				}
				var activitiesButton = {
					type: 'external',
					icon: 'icon-graduation-hat',
					link: $scope.tareasLoad(),
					typeLabel: 'Mis actividades',
					type_context: $scope.config[0].type_context
				}

				$scope.getpage = function () {
					var config = $scope.config;
					var index = parseInt($(".areaContent").attr("id"));
					var navFooter = [];
					var prev = index - 1 < 0 ? false : index - 1;
					var next = index + 1 === config.length ? false : index + 1;
					var last = index + 1 === config.length
					var center = Math.floor(config.length / 2);

					navFooter.push(config[prev]);
					if (index === center && config[0].type_context) {
						navFooter.push(externalButton);
					}
					if (last) {
						navFooter.push(activitiesButton);
					}
					console.log(index + 1 === config.length)

					// if (index === center) {
					// 	console.log(center, index)
					// navFooter.push({
					// 	index: 2,
					// 	type: 'eje',
					// 	typeLabel: 'eje',
					// 	type_context: true,
					// 	assets:
					// 	{
					// 		context: "Conceptualicemos",
					// 		contextRaw: "Conceptualicemos",
					// 		background: "con <br> cep <br> tua<br> lice <br>mos",
					// 		context_open: "Conceptualicemos",
					// 		icon:
					// 			"./assets/images/home/conceptualicemos.png",
					// 		small_icon: "icon-libro",
					// 	}
					// });
					// }
					navFooter.push(config[next]);
					console.log(navFooter)
					return navFooter;
				};
				// $scope.future = function () {
				// 	if (actual == "inicio") {
				// 		return "eje1";
				// 	} else if (actual == "eje1") {
				// 		return "eje2";
				// 	} else if (actual == "eje2") {
				// 		return "eje3";
				// 	} else if (actual == "eje3") {
				// 		return "eje4";
				// 	} else if (actual == "eje4") {
				// 		return "cierre";
				// 	}
				// };
				// $scope.previous = function () {
				// 	if (actual == "inicio") {
				// 		return "null";
				// 	} else if (actual == "eje1") {
				// 		return "inicio";
				// 	} else if (actual == "eje2") {
				// 		return "eje1";
				// 	} else if (actual == "eje3") {
				// 		return "eje2";
				// 	} else if (actual == "eje4") {
				// 		return "eje3";
				// 	} else if (actual == "cierre") {
				// 		return "eje4";
				// 	}
				// };
				// $scope.labelPrevious = function () {
				// 	if (actual == "inicio") {
				// 		return "";
				// 	} else if (actual == "eje1") {
				// 		return "Inicio";
				// 	} else if (actual == "eje2") {
				// 		return "Eje 1";
				// 	} else if (actual == "eje3") {
				// 		return "Eje 2";
				// 	} else if (actual == "eje4") {
				// 		return "Eje 3";
				// 	} else if (actual == "cierre") {
				// 		return "Eje 4";
				// 	}
				// };
				// $scope.labelNext = function () {
				// 	if (actual == "inicio") {
				// 		return "Eje 1";
				// 	} else if (actual == "eje1") {
				// 		return "Eje 2";
				// 	} else if (actual == "eje2") {
				// 		return "Eje 3";
				// 	} else if (actual == "eje3") {
				// 		return "Eje 4";
				// 	} else if (actual == "eje4") {
				// 		return "Cierre";
				// 	} else if (actual == "cierre") {
				// 		return "Mis actividades";
				// 	}
				// };

				function scrollToTop(scrollDuration) {
					var cosParameter = window.scrollY / 2,
						scrollCount = 0,
						oldTimestamp = performance.now();
					function step(newTimestamp) {
						scrollCount +=
							Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
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

				// activa los enlaces del footer
				$scope.siguiente = function (value) {
					console.log(value);
					setTimeout(function () {
						$state.go(value);
					}, 510);
					scrollToTop(500);
				};

				$scope.anterior = function () {
					setTimeout(function () {
						$state.go($scope.previous());
					}, 510);
					scrollToTop(500);
				};

				//oculta botones dependiendo del eje
				$scope.hideReferente = function () {
					if (actual == "inicio" || actual == "cierre") {
						return false;
					} else {
						return true;
					}
				};
				$scope.hideAnterior = function () {
					if (actual == "inicio") {
						return false;
					} else {
						return true;
					}
				};

				$scope.hidecierre = function () {
					if (actual == "cierre") {
						return false;
					} else {
						return true;
					}
				};
				$scope.tareas = function () {
					if (actual == "cierre") {
						return true;
					} else {
						return false;
					}
				};
				$scope.modules = function () {
					if (actual == "eje3") {
						return true;
					} else {
						return false;
					}
				};
				$scope.noModules = function () {
					if (actual == "eje3") {
						return false;
					} else {
						return true;
					}
				};
			},
			link: function ($scope, $element, $rootScope) {
				if ($(".areaContent").attr("data-state") == "inicio") {
					$(".button-prev").addClass("disable");
				}
				if ($(".areaContent").attr("data-state") == "cierre") {
				}
			},
			templateUrl: function ($element, controller, $scope, attrs) {
				return versionApp.apiUrl + "views/footer.html";
			}
			// templateUrl:'footer.html',
		};
	}
]);
