module.exports = function(grunt) {

  grunt.initConfig({
  	watch: {
  		sass:{
  			files:['development/assets/scss/**/*.scss'],
  			tasks:['sass'],
  		}
  	},
  	//-------------------------------------------------------
  	sass: {
	      dev: {
	          options: {
	            style: 'expanded',
	            compass: true
	          },
	          files: {
	            'development/assets/css/av.css':'development/assets/scss/main.scss'
	          }
	        },//sass dev
	      dist: {
	        options: {
	          style: 'compressed',
	          compass: true
	        },//sass dist
	        files: {
	          'build/assets/css/av.min.css':'development/assets/scss/main.scss'
	        }
	      }
	},
   //-------------------------------------------------------
    processhtml:{
      dist:{
        options: {
          process: true,
        },
        files: [
        {
          expand: true,
          cwd: './development/assets/views/',
          src: ['*.html'],
          dest: 'build/assets/views/',
          ext: '.html'
        },
         {
          expand: true,
          cwd: './development/referentes/',
          src: ['*.html'],
          dest: 'build/referentes/',
          ext: '.html'
        },
        {
          expand: true,
          cwd: './development/',
          src: ['index.html'],
          dest: 'build/',
          ext: '.html'
        },
        ],
    }
      // dist:{
      //   files:{
      //     'build/views/*.html' : 'development/assets/views/*.html',
      //   }
      // }
    },//processhtml
    //-------------------------------------------------------
  	//-------------------------------------------------------
  	concat: { 
      js : {// compila plugins para aula virtual
        src : [ 
        // vendor
         'development/assets/js/vendor/jquery/jquery-3.2.1.min.js',
         'development/assets/js/vendor/angular/angular.min.js',
         'development/assets/js/vendor/angular-animate/angular-animate.min.js',
         'development/assets/js/vendor/angular-ui-router/angular-ui-router.js',
         'development/assets/js/vendor/gsap/src/minified/TweenMax.min.js',
         'development/assets/js/vendor/gsapify-router/angular-gsapify-router.js',

         'development/assets/js/vendor/scrollpoints/scrollpoints.js',
         'development/assets/js/vendor/match-height/match-height.js',
         'development/assets/js/vendor/lazzytube/angular-lazytube.js',
         'development/assets/js/vendor/slick-slider/slick-jquery.min.js',

         'development/assets/js/vendor/slick-slider/slick.js',
         'development/assets/js/vendor/v-accordion-master/dist/v-accordion.js',

        //principal
        'development/assets/js/app/app.js',
        'development/assets/js/app/cache-templates/templates-cache.js',
 
        // interfaz
      'development/assets/js/app/componentes/sliders/slider.js',
     	'development/assets/js/app/componentes/header/header.js',
      'development/assets/js/app/componentes/footer/footer.js',
     	'development/assets/js/app/componentes/nav-h-circulos/nav-h-circulos.js',
     	'development/assets/js/app/componentes/contenido/contenido.js',
     	// componentes
     	'development/assets/js/app/componentes/helpers-components/helper.js',
     	'development/assets/js/app/componentes/vimeo/vimeo-iframe.js',
     	'development/assets/js/app/componentes/acordeon/acordeon.js',
      'development/assets/js/app/componentes/video-capsula/video-capsula.js',
      'development/assets/js/app/componentes/lecturas-recomendadas/lecturas-recomendadas.js',
      'development/assets/js/app/componentes/modal/modal-service.js',
      'development/assets/js/app/componentes/modal/modals.js',
      'development/assets/js/app/componentes/iframe/iframe.js',
	 'development/assets/js/app/componentes/rubrica-tiempo-estimado/rubrica-tiempo-estimado.js',
	 'development/assets/js/app/componentes/modal-notification/modal-notification.js',
	 'development/assets/js/app/componentes/cierre/cierre.js',

        ],
        dest :'build/assets/js/av.min.js',
      },
   	},// concat
   	//-------------------------------------------------------
   	uglify:{
      js:{
        files:{
          'build/assets/js/av.min.js':['build/assets/js/av.js'],
        },
         options: {
            report: 'min',
            mangle: false
        }
      }
    },//uglify
   
  });
   // cargar los plugin
  	  grunt.loadNpmTasks('grunt-contrib-watch');
	  grunt.loadNpmTasks('grunt-contrib-concat');
	  grunt.loadNpmTasks('grunt-contrib-uglify'); 
	  grunt.loadNpmTasks('grunt-processhtml');
	  grunt.loadNpmTasks('grunt-contrib-sass');
	  grunt.loadNpmTasks('grunt-contrib-compass');

	  grunt.registerTask('default', ['watch']);
    grunt.registerTask('all', ['concat:js','processhtml','sass']);
    // grunt.registerTask('all', ['concat:js','uglify','processhtml','sass']);
};