

homeControllers.controller('HomePageCtrl', ['$scope', '$http','$rootScope','$modal','$log','AllPatientIds','getPatientId','getHomeIcons',
  function ($scope, $http, $rootScope, $modal, $log, AllPatientIds, getPatientId, getHomeIcons) {
	
	getPatientId.query(function(data) {
    	$rootScope.selected = data;
    	
    	AllPatientIds.query({ patientId: $rootScope.selected.id }, function(data) {
        	$rootScope.items = data;
        });
    });
    
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

  	getHomeIcons.query(function(data) {
  		$scope.homeicons = data;
	 });
   
}]);


