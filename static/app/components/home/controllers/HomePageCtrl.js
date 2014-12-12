

homeControllers.controller('HomePageCtrl', ['$scope', '$http','$rootScope','$modal','$log','AllPatientIds','getPatientId'
  function ($scope, $http, $rootScope, $modal, $log, AllPatientIds, getPatientId) {

    //$rootScope.selected = { id : "1", name: "Deepak" };
    
    var patientId = getPatientId.query();
    
    patientId.$promise.then(function(data){
	    var patientIdData = angular.fromJson(angular.toJson(data)); 
	    $rootScope.selected = patientIdData;
	});
    
    $rootScope.items = [
              { id : "1", name: "Deepak" }
             ,{ id : "2", name: "Manjari" }
             ,{ id : "3", name: "Shekhar" }
             ,{ id : "4", name: "Anant" }
             ,{ id : "5", name: "Shruti" }
             ];
    /*
    var patientIds = AllPatientIds.query({visitId: visit_id});
    
    patientIds.$promise.then(function(data){
	    var patientIdsData = angular.fromJson(angular.toJson(data)); 
	    $rootScope.items = patientIdsData;
	});
    */
    
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


