aulaApp.factory('Vimeo',['$http', '$q', function ($http, $q) {
  
  var service = {
    cargarChanel: function(channel) {
      
    },
    cargarImagen: function (id) {
      var deferred = $q.defer();
      
      //llama la api
      $http.jsonp('https://vimeo.com/api/v2/video/' + id + '.json?callback=JSON_CALLBACK').success(function (data) {
       // guarda los tamaño de imagen 
        var thumbs = [];
        thumbs.push(data[0]['thumbnail_small']);
        thumbs.push(data[0]['thumbnail_medium']);
        thumbs.push(data[0]['thumbnail_large']);
        deferred.resolve(thumbs);
      }).error(function(){
        //  notifica el proceso que hubo error
        deferred.reject();
      });
      
      // retornar el promise, notificarlo ya retornó
      return deferred.promise;
    }
    
  };
  
  return service;
}]);


aulaApp.directive('vimeo',['Vimeo', function (Vimeo) {
  return {
    restrict: 'EA',
    scope: {
      url: '@',
      image: '@'
    },
    controllerAs: 'ctrl',
    controller:function (){
     
      
    },
    
    link: function ($scope, $element) {
      var vimeoCode = $scope.url;
      
      if ($scope.image == 0 || $scope.image == null){
        Vimeo.cargarImagen(vimeoCode).then(function (data) {
         $($element).find('.video').attr('src', data[2]);
       }, function(reason) {
        $($element).replaceWith('<span>Vimeo error, intenta otra vez</span>');
      });
      }else{
        $($element).find('.video').attr('src', $scope.image);
     }
      
      
      $($element).find('.button-play').on('click', function(e) {
          e.preventDefault();
       
          $($element).find('.vimeo').replaceWith('<iframe class="yt-embed" src="//player.vimeo.com/video/'+vimeoCode + '?autoplay=1" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');     
           $(this).addClass('active');
      });



      
    },
    template:'<div class="box back-video">\
        <div class="center-v">\
          <div class="yt-responsive">\
            <button aria-label="Play Video" class="button-play">\
                <div class="iconPlay">\
                  <span class="SVGInline" style="width:100px;height:100px;">\
                    <svg class="SVGInline-svg" style="width: 100%;height: 100%;" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg"><title>Play</title><g fill="none" fill-rule="evenodd"><circle fill="#FFF" cx="36" cy="36" r="36"></circle><path fill="#3EC032" d="M28 47V25l22 11z"></path></g></svg>\
                  </span>\
                  <div class="play-pulse"></div>\
                </div>\
              </button>\
            <div class="vimeo">\
              <img  class="video">\
            </div>\
          </div>\
        </div>\
      </div>'
  };
}]);
