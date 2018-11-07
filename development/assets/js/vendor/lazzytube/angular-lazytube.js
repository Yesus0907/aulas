angular.module('oblador.lazytube', [
  'oblador.lazytube.templates', 
  'oblador.lazytube.config', 
  'oblador.lazytube.directive'
]);


angular.module('oblador.lazytube.config', []).
factory('obLazytubeConfig', function() {
  return {
    width: 560, 
    height: 315,
    responsive: true, 
    urlParams: { 
      autoplay: 1
    }
  };
});
angular.module("oblador.lazytube.templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("templates/lazytube/directive.html","<div class=\"back-video\"><div class=\"center-v\"><div class=\fix\"><div class=\"yt-wrap\" ng-class=\"{\'yt-responsive\' : responsive }\" ng-style=\"wrapperStyle\"><button aria-label=\"Play Video\" ng-click=\"showVideo($event)\" ng-class=\"{'active':active}\"  class=\"button-play\"><div class=\"iconPlay\"><span class=\"SVGInline\"><svg class=\"SVGInline-svg\"  viewBox=\"0 0 72 72\" xmlns=\"http://www.w3.org/2000/svg\"><title>Play</title><g fill=\"none\" fill-rule=\"evenodd\"><circle fill=\"#FFF\" cx=\"36\" cy=\"36\" r=\"36\"></circle><path fill=\"#3EC032\" d=\"M28 47V25l22 11z\"></path></g></svg></span><div class=\"play-pulse\"></div></div></button><div class=\"img-youtube\" ng-show=\"!active\" ng-style=\"placeholderStyle\"></div><iframe class=\"yt-embed\" ng-if=\"active\" width=\"{{width}}\" height=\"{{height}}\" ng-src=\"{{embedUrl}}\" frameborder=\"0\" allowfullscreen></iframe></div></div></div></div>");
$templateCache.put("templates/lazytube/styles.html");}]);

angular.module('oblador.lazytube.directive', ['oblador.lazytube.config']).
directive('avTube', ["$sce", "$window", "$templateCache", "obLazytubeConfig", function($sce, $window, $templateCache, obLazytubeConfig){
  
   // $(this).addClass('active');
    angular.element().find('button-play').addClass('active')

  //Inject base styles
  angular.element(document).find('head').prepend($templateCache.get('templates/lazytube/styles.html'));

  //Valid youtube URL pattern
  var urlPattern = /^(?:(https?:)?\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

  //Valid attributes that will be passed on to youtube via the query string
  var paramNames = 'autohide autoplay cc_load_policy color controls disablekb enablejsapi end fs iv_load_policy list listType loop modestbranding origin playerapiid playlist playsinline rel showinfo start theme'.split(' ');

  return {
    restrict: 'EA',
    templateUrl: 'templates/lazytube/directive.html',
    
    replace: true,
    transclude: true,
    scope: true,
    link: function($scope, $element, $attrs) {
      var id = $attrs.avTube;
      if(!id) {
        var url = $attrs.href || $attrs.src || $attrs.ngSrc;
        if(!url) {
          return;
        }
        var r = url.match(urlPattern);
        if (!r) {
          return;
        }
        id = r[2];
      }

      $scope.id = id;
      var protocol = $window.location.protocol === 'https:' ? 'https:' : 'http:';
      var width = $scope.width = $element.attr('width') || obLazytubeConfig.width;
      var height = $scope.height = $element.attr('height') || obLazytubeConfig.height;
      var responsive = $scope.responsive = angular.isDefined($attrs.noResponsive) ? false : obLazytubeConfig.responsive;

      $scope.wrapperStyle = {};
      $scope.placeholderStyle = {
      backgroundImage: $attrs.obPlaceholder ? 'url(' + $attrs.obPlaceholder + ')' : 'url(' + protocol + '//i.ytimg.com/vi/' + id + '/hqdefault.jpg)'
      };

      if(responsive) {
        $scope.wrapperStyle.paddingBottom = 100 * height/width + '%';
      } else {
        $scope.placeholderStyle.width = width + 'px';
        $scope.placeholderStyle.height = height + 'px';
      }

      $scope.showVideo = function($event) {
        //Build query params by checking for attributes
        var params = angular.copy(obLazytubeConfig.urlParams);
        angular.forEach(paramNames, function(key) {
          var val = $attrs[key];
          if(angular.isDefined(val)) {
            params[key] = val;
          }
        });
        var urlParams = [];
        angular.forEach(params, function(val, key) {
          urlParams.push(key + '=' + encodeURIComponent(val));
        });

        //We regex checked ID so url should be safe. 
        $scope.embedUrl = $sce.trustAsResourceUrl(protocol + '//www.youtube.com/embed/' + id + '/?' + urlParams.join('&'));
        $scope.active = true;
        $event.preventDefault();
      };
    }
  };
}]);
