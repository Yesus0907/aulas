
aulaApp.run(['$templateCache', '$rootScope', function($templateCache, $rootScope) {

///++++++++++++++++++++++++++++++
// Modal basico
///++++++++++++++++++++++++++++++

$templateCache.put('modales.html', '<div id="modal"><div id="overlay"><iframe ng-src="{{pdf.link}}"></iframe><a href class="btn-close" ng-click="pdf.close()"><span class="lnr icon-arrow-left"></span></a></div><div id="fade"><div class="preloader"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div></div>');


///++++++++++++++++++++++++++++++
// Modal conoce tu plataforma
///++++++++++++++++++++++++++++++

 $templateCache.put('modalConocePlataforma.html', 
  	'<div id="modal" class="conoce-plataforma">\
		    <div id="overlay">\
		        <iframe ng-src="{{pdf.link}}"></iframe>\
		        <a href class="btn-close" ng-click="pdf.close()">\
		            <span class="lnr icon-arrow-left"></span>\
		        </a>\
		    </div>\
		    <div id="fade">\
		        <div class="preloader">\
		            <div class="dot"></div>\
		            <div class="dot"></div>\
		            <div class="dot"></div>\
		        </div>\
		    </div>\
		</div>\
		');	
///++++++++++++++++++++++++++++++
// modal autor
///++++++++++++++++++++++++++++++
$templateCache.put('modal-autor.html', 
  	"<div id='modal' class='wrapper-autor'>\
	<div id='overlay' class='scrollm'>\
		<div class='modalautor' ng-if='pdf.showAutor1'>\
			<div class='autor1'>\
				<div class='foto'>\
					<img ng-src='{{pdf.foto}}' alt=''>\
				</div>\
				<div>\
					<h2 class='nombre'>{{pdf.nombre}}</h2>\
					<p ng-bind-html='pdf.descripcion'></p>\
				</div>\
			</div>\
		</div>\
		<div class='modalautor' ng-if='pdf.showAutor2'>\
			<div class='autor1 col-md-6'>\
				<div class='foto'>\
					<img ng-src='{{pdf.foto}}' alt=''>\
				</div>\
				<div>\
					<h2 class='nombre'>{{pdf.nombre}}</h2>\
					<p ng-bind-html='pdf.descripcion'></p>\
				</div>\
			</div>\
			<div class='autor2 col-md-6'>\
				<div class='foto'>\
					<img ng-src='{{pdf.foto2}}' alt=''>\
				</div>\
				<div>\
					<h2 class='nombre'>{{pdf.nombre2}}</h2>\
					<p ng-bind-html='pdf.descripcion2'></p>\
				</div>\
			</div>\
		</div>\
		<a href class='btn-close' ng-click='pdf.close()'><span class='lnr icon-arrow-left'></span></a>\
	</div> \
	<div id='fade' class='fadeautor'></div>\
</div>");  	
///++++++++++++++++++++++++++++++
// MODAL HOME NOTIFICACIÓN
///++++++++++++++++++++++++++++++
$templateCache.put('modal-notification.html',
"<div id='modal' class='wrapper-notification'>\
	<div id='overlay' class='modal-notification'>\
		<div class='cont' >\
			<a href class='btn-close-n' ng-click='pdf.close()'><span class='lnr icon-cross'></span></a>\
			<a target='_blank' ng-click='pdf.close()'  href='https://contenidos.areandina.edu.co/repo/aulacanvas/public/autoevaluacion.html' class='desktop'>\
				<img src='https://contenidos.areandina.edu.co/repo/aulacanvas/notifications/desktop.jpg'>\
			</a>\
			<a target='_blank' ng-click='pdf.close()' href='https://contenidos.areandina.edu.co/repo/aulacanvas/public/autoevaluacion.html' class='movil'>\
				<img src='https://contenidos.areandina.edu.co/repo/aulacanvas/notifications/movil.jpg'>\
			</a>\
		</div>\
	</div> \
	<div id='fade' class='fade-notification'>\
		<div class='preloader'>\
		    <div class='dot'></div>\
		    <div class='dot'></div>\
		    <div class='dot'></div>\
		</div>\
	</div>\
</div>");  
//====== componente

///++++++++++++++++++++++++++++++
// lecturas lecturas-recomendadas
///++++++++++++++++++++++++++++++

	$templateCache.put('lecturas-recomendadas.html', 
  	'<section class="lectura-recomendada row row-sm-equal-height">\
		<div class="cap-titulo col-xs-12 col-md-4 no-padding titulo">\
			<div>\
	            <p class="title-color-magenta">Lectura <span>recomendada</span></p>\
	        </div>\
		</div>\
		<div class="cap-texto col-xs-12 col-md-8 lectura">\
			<h2>{{titulo}}</h2>\
	        <p ng-bind-html="text"></p>\
	        <div class="wrapper-buttom">\
	        	<button class="btn-cuadrado magenta btn-modal" ng-click="pdfModal()" ng-if="interno()">Ver lectura</button>\
	            <a class="btn-cuadrado magenta btn-modal" href="{{url}}" ng-if="externo()" target="_blank">Ver lectura</a>\
	        </div>\
		</div>\
	</section>\
		');
///++++++++++++++++++++++++++++++
// top-buttons.html
///++++++++++++++++++++++++++++++

	 $templateCache.put('top-buttons.html', 
	  	'<div class="wrapper-navegador" ui-scrollpoint="+100px">\
			<div class="navegador-top">\
				<div class="container-btns col-xs-12  no-padding">\
					<button class="menu-button"><span>menu</span><p>MENU</p></button>\
					<button class="trigg home-button" ui-sref="home" ><span class="lnr icon-home"></span><span class="nombre">HOME</span></button>\
					<a href="{{tareasLoad()}}" target="_blank"><button class="tareas-button"><span class="lnr icon-graduation-hat"></span><span class="nombre">TAREAS</span></button></a>\
				</div>\
			</div>\
		</div>\
		<nav id="menuPrincipal">\
			<ul>\
				<li><span class="lnr icon-camera-video"></span><a href="" ng-click="pdfModal()" class="btn-conoce" >Conoce tu plataforma</a></li>\
				<li><span class="lnr icon-smile"></span><a href="https://contenidos.areandina.edu.co/repo/aulacanvas/public/mesadeayuda.estudiantes.html" target="blank_">Mesa de ayuda</a></li>\
				<li><span class="lnr icon-graduation-hat"></span><a href="https://contenidos.areandina.edu.co/repo/aulacanvas/CoCanvas/campusvirtual.php" target="blank_">Campus virtual</a></li>\
				<li><span class="lnr icon-book"></span><a href="https://contenidos.areandina.edu.co/repo/aulacanvas/CoCanvas/biblioteca.php" target="blank_">Biblioteca</a></li>\
				<li class="encuentroS"></li>\
			</ul>\
		</nav>\
		');
///++++++++++++++++++++++++++++++
//  nav-h-circulos.html
///++++++++++++++++++++++++++++++
	 $templateCache.put('nav-h-circulos.html', 
  	'<div class="guiadot">\
		<ul>\
			<li class="nav_tab">\
				<a ui-sref="inicio" ui-sref-active="active">\
					<span class="dot" id="1"></span>\
					<p>INICIO</p>\
				</a>\
			</li>\
			<li>\
				<a ui-sref="eje1" ui-sref-active="active">\
					<span class="dot" id="2"></span>\
					<p>EJE 1</p>\
				</a>\
			</li>\
			<li>\
				<a ui-sref="eje2" ui-sref-active="active">\
					<span class="dot" id="3"></span>\
					<p>EJE 2</p>\
				</a>\
			</li>\
			<li>\
				<a ui-sref="eje3" ui-sref-active="active">\
				<span class="dot" id="4"></span>\
				<p>EJE 3</p>\
			</a>\
			</li>\
			<li>\
				<a ui-sref="eje4" ui-sref-active="active">\
					<span class="dot" id="5"></span>\
					<p>EJE 4</p>\
				</a>\
			</li>\
			<li>\
				<a ui-sref="cierre" ui-sref-active="active">\
					<span class="dot" id="6"></span>\
					<p>CIERRE</p>\
				</a>\
			</li>\
		</ul>\
		<div >\
	</div>\
	');
///++++++++++++++++++++++++++++++
// cierre
///++++++++++++++++++++++++++++++
	$templateCache.put('cierre.html', 
	  	'<div class="cierre-wrapper">\
	  		<div>\
				<h2>Aprendizajes adquiridos en el módulo</h2>\
				<p>Al cierre de este módulo, después del trabajo realizado, es importante tener en cuenta los siguientes aprendizajes centrales:</p>\
			</div>\
			<hr>\
			<ol><li ng-repeat="actividad in actividades">{{actividad.title}}</li></ol>\
		</div>\
	');

	$templateCache.put('tiempo-estimado.html', 
	  	'<section class="rubrica" style="display: inline-block;">\
            <div class="componente-tablas tiempo-estimado">\
                <table>\
                  <thead>\
                    <tr>\
                      <th >TIPO DE ACTIVIDAD</th>\
                      <th >HORAS</th>\
                    </tr>\
                  </thead>\
                  <tbody>\
                    <tr ng-repeat="actividad in actividades">\
                         <td class="eje"><p><strong>{{actividad.title}}</strong></p></td>\
                         <td><p>{{actividad.number}}</p></td>\
                   </tr>\
                    <tr>\
                        <td  class="eje">\
                            <p class="texto-verde"><strong>Total horas</strong></p>\
                        </td>\
                        <td >\
                            <p class="texto-verde"><strong>{{total}}</strong></p>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td  class="eje">\
                            <p class="texto-verde"><strong>Total de créditos</strong></p>\
                        </td>\
                        <td >\
                            <p class="texto-verde"><strong>{{creditos}}</strong></p>\
                        </td>\
                    </tr>\
                  </tbody>\
                </table>\
            </div>\
		</section>\
	');	
	$templateCache.put('footer.html', 
	  	'<div class="row referente-footer row-md-equal-height" ng-if="hideReferente()">\
			<button class="col-sm-6 ver-referente" ng-click="pdfModal()"><span class="lnr icon-file-add" ></span>ver referente completo</button>\
			<a class="col-sm-6 descargar-referente" href="{{referenteCompleto}}" download="{{enlaceDes}}"><span class="lnr icon-download"></span>descargar referente</a>\
		</div>\
		<div class="row" ng-if="noModules()">\
			<div class="col-sm-6 no-padding button-prev" >\
				<button ng-click="anterior()" ng-if="hideAnterior()" class="{{previous()}}"><span class="icon-footer-left lnr icon-arrow-left"></span>{{labelPrevious()}}</button>\
			</div>\
			<div class="col-sm-6 no-padding button-next">\
				<button ng-click="siguiente()" ng-if="hidecierre()" class="{{future()}}">{{labelNext()}} <span class="icon-footer-right lnr icon-arrow-right"></span></button>\
				<a href="{{tareasLoad()}}" ng-if="tareas()" target="_blank"><button   class="tareas">{{labelNext()}} <span class="icon-footer-right lnr icon-graduation-hat"></span></button></a>\
			</div>\
		</div>\
		<div class="row" ng-if="modules()">\
			<div class="col-sm-4 no-padding button-prev">\
				<button ng-click="anterior()" class="{{previous()}}"><span class="icon-footer-left lnr icon-arrow-left"></span>{{labelPrevious()}}</button>\
			</div>\
			<div class="col-sm-4 no-padding button-next">\
				<a href="{{tareasLoad()}}" target="_blank"><button  class="tareas">Evaluación de desempeño</button>	</a>\
			</div>\
			<div class="col-sm-4 no-padding button-next">\
				<button ng-click="siguiente()" class="{{future()}}">{{labelNext()}} <span class="icon-footer-right lnr icon-arrow-right"></span></button>\
			</div>\
		</div>\
	');

	$templateCache.put('acordeon.html', 
	  	'<v-pane class="row acordeon" >\
	    <v-pane-header class="p" >\
  	    <h2>{{titulo}}</h2>\
        <h3 class="identificador">{{id}}</h3>\
  	    <div class="wrapper-text-acordeon">\
  	    </div>\
	    </v-pane-header >\
    <v-pane-content ng-class="{notReferente:showReferente}">\
      <div class="content">\
            <section class="referente row row-sm-equal-height"  ng-if="showReferente()">\
              <div class="descripcion col-xs-12 col-sm-8 ">\
                <span class="label"><span class="lnr icon-bubble"></span>Referente de pensamiento</span>\
                 <p ng-bind-html="text"></p>\
              </div>\
              <div class="col-xs-12 col-sm-4 no-padding " >\
                <div class="wrapper-class">\
                  <div class="buttom-referente"  ng-click="pdfModal()">\
                    <div class="element-center">\
                      <div>\
                       <span class="lnr icon-file-empty"></span><p>Ver PDF</p>\
                      </div>\
                    </div>\
                  </div>\
                </div>\
              </div>\
            </section>\
            <div ng-transclude></div>\
       </div>\
    </v-pane-content>\
 </v-pane>\
	');

	$templateCache.put('header-menu.html', 
		
	  	'<div class="wrapper-header">\
	<div class="headerMenu" style="background-image: url({{$ctrl.imagen}});" ng-if="!ifCierre()">\
		<span class="num-eje-deco"></span>\
		<div class="back"></div>\
		<div class="back2"></div>\
		<div class="wrapper-text">\
			<p class="num-eje">{{eje}}</p>\
			<p class="nombre-eje">{{nombreEje}}</p>\
			<h2 >{{$ctrl.titulo}}</h2>\
		</div>\
	</div>\
	<div class="headerMenu cierreHeader" style="background-image: url({{$ctrl.imagen}});" ng-if="ifCierre()">\
		<span class="num-eje-deco"></span>\
		<div class="back"></div>\
		<div class="back2"></div>\
		<div class="wrapper-text">\
			<p class="num-eje">{{eje}}</p>\
			<p class="nombre-eje">{{nombreEje}}</p>\
			<h1>¡ Felicidades !</h1>\
			<h2 >{{nombreUsuario}}</h2>\
			<p class="description">Has terminado el módulo <br> <span class="titulo">{{$ctrl.titulo}}</span></p>\
		</div>\
	</div>\
	<div class="logos"><img src="https://contenidos.areandina.edu.co/repo/aulacanvas/2.0/prod/assets/images/header-title/logos.svg" alt=""></div>\
</div>\
	');
	

	


	
}]);





