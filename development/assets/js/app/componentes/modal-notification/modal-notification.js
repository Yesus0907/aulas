aulaApp.directive("modalNotification", ["versionApp", function (versionApp) {

    return {
        restrict: 'EA',
        // scope: {
        //   url:"@",
        //   tipo:"@"
        // },
        controllerAs: 'ctrl',
        controller: function ($element, $scope, $sce, ModalService) {
            // this.textu = $element.attr("texto").replace(/\n/g, "<br>")
            // $scope.text = $sce.trustAsHtml(this.textu);

            $scope.pdfModal = function () {
                ModalService.showModal({
                    controller: function (close, $sce, $element) {
                        this.close = close;
                        
                    },
                    controllerAs: "pdf",
                    templateUrl: versionApp.apiUrl + "views/modal-notification.html",
                    bodyClass: "modal-open",
                });
            };
		  setTimeout(function(){ $scope.pdfModal(); }, 500);
        },
    };

}]);

