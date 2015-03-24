	
visitControllers.controller('VisitCtrl', ['$scope', '$http','$rootScope','AllVisits',
  function ($scope, $http, $rootScope, AllVisits) {
    
    var patient_id = $rootScope.selected.id;
    $scope.loading = true;
	$scope.loaded = false;
    AllVisits.query({ patientId: patient_id }, function(data) {
    	$scope.loading = false;
		$scope.loaded = true;
    	$scope.visits = data;
    }, function(error) {
        console.log(error);
    });
    
    
    
    $scope.orderProp = 'date';
    
}]);