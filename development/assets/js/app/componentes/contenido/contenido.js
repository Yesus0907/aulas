
aulaApp.directive("contenido", ["versionApp", "$rootScope", function (versionApp, $rootScope) {

	return {
		// require: '^myParentDirective',
		restrict: 'EA',
		scope: {
			imagenHeader: "@",
			tituloModulo: "@",
			videoId: "@",
			pregunta: "@",
			youtubeId: "@",
			referenteCompleto: "@",
			descripcionAutor: "@",
			nombreAutor: "@",
			fotoAutor: "@",
			nombreAutor2: "@",
			fotoAutor2: "@",
			descripcionAutor2: "@"
		},
		controllerAs: 'ctrl',
		bindToController: {
		},
		controller: function ($element, $scope, $sce, $rootScope, ModalService, datosCanvas) {
			// guarda el valor  del enlace del referente completo
			$rootScope.referenteCompleto = $scope.referenteCompleto;
			$scope.canvas = $rootScope.config[0].type_context
			// console.log("cpnt", $scope.canvas)
			//-----------------------------------------------------------------------------
			// obtiene el valor user y curso desde datosCanvas
			$scope.encuentroLink = "https://contenidos.areandina.edu.co/repo/aulacanvas/public/meeting.html?idcourse=" + datosCanvas.idCurso + "&" + "iduser=" + datosCanvas.idUser;
			$(".encuentroS").html('<span class="lnr icon-users"></span><a class="encuentroS" href="' + $scope.encuentroLink + '" target="_blank">Encuentro sincrónico</a>');
			//------------------------------------------------------------------------------------

			// permite inclir espacios 
			if ($scope.descripcionAutor == null || $scope.descripcionAutor == 0) {

			} else {
				this.textu = $element.attr("descripcion-autor").replace(/\n/g, "<br>");
				$scope.text = this.textu;
			}
			//---
			if ($scope.nombreAutor2 == null || $scope.nombreAutor2 == 0 || $scope.fotoAutor2 == null || $scope.fotoAutor2 == 0) {
				$scope.autor1 = true;
				$scope.autor2 = false;
			} else {
				$scope.autor1 = false;
				$scope.autor2 = true;
				this.textu = $element.attr("descripcion-autor2").replace(/\n/g, "<br>");

				$scope.text2 = this.textu;
			}
			// modal para tutor
			$scope.pdfModal = function () {
				ModalService.showModal({
					controller: function (close, $sce, $element) {
						this.close = close;
						this.foto = $sce.trustAsResourceUrl($scope.fotoAutor);
						this.nombre = $scope.nombreAutor;
						this.descripcion = $sce.trustAsHtml($scope.text);
						this.foto2 = $sce.trustAsResourceUrl($scope.fotoAutor2);
						this.nombre2 = $scope.nombreAutor2;
						this.descripcion2 = $sce.trustAsHtml($scope.text2);
						this.showAutor1 = $scope.autor1;
						this.showAutor2 = $scope.autor2;
					},
					controllerAs: "pdf",
					templateUrl: "modal-autor.html",
					bodyClass: "modal-open",
				});
			};



			// oculta elementos para el cierre
			$rootScope.currentState = $(".areaContent").attr('data-state');
			var actual = $rootScope.currentState;

			$scope.hideCierre = function () {
				if (actual == "cierre") {
					return false;
				}
				else {
					return true;
				}
			}

			// inserta imagen si el video principal esta vacio
			$scope.cambioImagen = function () {
				if (this.videoId == null || this.videoId == 0) {
					return false
				} else {
					return true
				}
			}
			// console.log($scope.videoId);


		},
		link: function ($scope, $rootScope) {
			$(document).ready(function () {
				$(".lista-desplegable dd").hide();
				$(".lista-desplegable dt").click(function (event) {
					// $(this).toggleClass('desplegable');
					var desplegable = $(this).next();
					var titulo = $(this);
					$('.lista-desplegable dd').not(desplegable).slideUp('fast');
					desplegable.slideToggle('fast');
					event.preventDefault();
					$('.lista-desplegable dt').not(titulo).removeClass('desplegable');
					titulo.toggleClass('desplegable');
					event.preventDefault();
				});

				setTimeout(function () {
					$('.box').matchHeight();
					$('.cap-texto').matchHeight({ property: 'min-height' });
					// $(function() {
					//    $('.slick-slide').matchHeight({
					//        target: $('.cap-texto')
					//    });
					//    });
				}, 500);

				//  $('.box').matchHeight({
				//      target: $('.back-video')
				// });
			});
		},
		templateUrl: function ($element, controller, $scope, attrs) {
			return versionApp.apiUrl + "views/contenido.html"
		},
		transclude: true,
	};
}]);