testControllers.controller('TestCtrl', ['$scope', '$http','$rootScope','AllTests','$localStorage',
  function ($scope, $http,  $rootScope, AllTests, $localStorage) {
	
	$scope.loading = true;
	$scope.loaded = false;
	
	if($rootScope.selected!=null){
		var person_id = $rootScope.selected.id;
		$localStorage.current_patient_id = $rootScope.selected.id;
		$localStorage.current_patient_name = $rootScope.selected.name;
	}
	else if($rootScope.selected==null){
		var person_id = $localStorage.current_patient_id;
	}
	
	AllTests.query({ person_id: person_id }, function(data) {
    	$scope.loading = false;
		$scope.loaded = true;
    	$scope.tests = data;
    }, function(error) {
        console.log(error);
    });
    
    
    
    $scope.orderProp = 'date';
}]);

