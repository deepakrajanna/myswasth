

homeControllers.controller('HomePageCtrl', ['$scope', '$http','$rootScope','$modal','$log',
  function ($scope, $http, $rootScope, $modal, $log) {

    $rootScope.selected = { id : "cc1", name: "cc1-name" };
    $rootScope.items = [
              { id : "cc1", name: "cc1-name" }
             ,{ id : "cc2", name: "cc2-name" }
             ,{ id : "cc3", name: "cc3-name" }
             ,{ id : "cc4", name: "cc4-name" }
             ,{ id : "cc5", name: "cc5-name" }
             ];

    $rootScope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: ModalInstanceCtrl,
      size: size,
      resolve: {
        items: function () {
          return $rootScope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $rootScope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

    

    $http.get('data/homeicons.json').success(function(data) {
      $scope.homeicons = data;
    });
}]);


