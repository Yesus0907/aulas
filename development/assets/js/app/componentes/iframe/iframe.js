aulaApp.directive("avIframe", ["versionApp", function (versionApp) {

return {
    restrict: 'EA',
    scope: {
      url:"@",
      tipo:"@"
    },
    controllerAs: 'ctrl',
    bindToController: {

    },
    controller:function ($element, $scope, $sce){
        // this.textu = $element.attr("texto").replace(/\n/g, "<br>")
        // $scope.text = $sce.trustAsHtml(this.textu);
        
        $scope.transcludeIn = false;
        $scope.transcludeIn = function(){
           if ($scope.url == null || $scope.url == 0) {
              return true;
            }
        };
        $scope.aspect = function(){
           if ($scope.tipo == "rise") {
              return "rise";
            }
        };

    }, 

    link: function ($scope, $element, $index) {

    },
     template:'<section class="row"><div class="video-responsive" ng-class="aspect()"><div ng-transclude ng-if="transcludeIn()"></div><object data="{{url}}" frameborder="0" allowfullscreen></object></div></section>',
    
    transclude: true,
};

}]);