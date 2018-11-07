
angular
  .module('videoCapsula', ['videoCapsula'])
  .component('videoCapsula', {
    bindings: {
       video:'@',
       imagenVideo:'@',
       titulo:'@',
       texto:'@',
       creditos:'@',
      },
    controller: function($element, $scope, $sce) {
          setTimeout(function() {
            if ($($element).hasClass("slick-slide")) {
             $($element).find(".cap-texto").removeClass("col-md-5");
             $($element).find(".cap-video").removeClass("col-md-7");
            }
          }, 50);
          this.textu = $element.attr("texto").replace(/\n/g, "<br>")
          $scope.text = $sce.trustAsHtml(this.textu);
          // $( document ).ready(function() {
          //   $($element).text().replace(/\n/g, "<br>")
          //   // console.log($($element).text().replace(/\n/g, "<br>"))
          //   console.log(this.text = $element.attr("texto").replace(/\n/g, "<br>"))
          // });
      
           
          $scope.tipoVideo = function(){

            var tiposVideo = $element.attr("video");
            var selectVideo = tiposVideo.split('/')[2];

            if (selectVideo == "www.youtube.com") {
             return "youtube"
           }else if(selectVideo == "player.vimeo.com" || selectVideo == "vimeo.com"){
             return "vimeo"
           }
           else if(selectVideo != "player.vimeo.com" || selectVideo != "vimeo.com"){
            return "all";
          }
        }

         // console.log( $scope.tipoVideo());
        $scope.idVimeo = function(){
            var tiposVideo = $element.attr("video");
            var split = tiposVideo.split('/');
            var obtenerId = split[split.length-1]
            // console.log(obtenerId + " vimeo numero");
            return obtenerId
        }


       },
      templateUrl:function(versionApp){
        return versionApp.apiUrl + "views/video-capsula.html"
    },  
      // templateUrl:'video-capsula.html',   

  });
// ---- directiva para incrustar demas videos
aulaApp.directive('allIframe',[function () {
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
      var enlace = $scope.url;
      
      if ($scope.image == 0 || $scope.image == null){
        $($element).find('.allIframe').css("background-image", "url(https://contenidos.areandina.edu.co/repo/aulacanvas/2.0/prod/assets/images/img-iframe-back.jpg)");
      }else{
        $($element).find('.allIframe').css("background-image", 'url('+ $scope.image +')');
        // $($element).find('.video').attr('src', $scope.image);
     }
      
      
      $($element).find('.button-play').on('click', function(e) {
          e.preventDefault();
       
          $($element).find('.allIframe').replaceWith('<iframe class="yt-embed" src="' + enlace + '" autoplay=true width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');     
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
            <div class="allIframe">\
            <img class="video" src="" alt="" />\
            </div>\
          </div>\
        </div>\
      </div>'
  };
}]);
