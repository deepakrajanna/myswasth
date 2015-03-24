testControllers.controller('TestCtrl', ['$scope', '$http','$rootScope','AllTests',
  function ($scope, $http,  $rootScope, AllTests) {
	
	$scope.loading = true;
	$scope.loaded = false;
	
	var patient_id = $rootScope.selected.id;
    AllTests.query({ patientId: patient_id }, function(data) {
    	$scope.loading = false;
		$scope.loaded = true;
    	$scope.tests = data;
    }, function(error) {
        console.log(error);
    });
    
    
    
    $scope.orderProp = 'date';
}]);

