	
visitControllers.controller('VisitCtrl', ['$scope', '$http','$rootScope','AllVisits','$localStorage',
  function ($scope, $http, $rootScope, AllVisits, $localStorage) {
    
	if($rootScope.selected!=null){
		var person_id = $rootScope.selected.id;
		$localStorage.current_patient_id = $rootScope.selected.id;
		$localStorage.current_patient_name = $rootScope.selected.name;
	}
	else if($rootScope.selected==null){
		var person_id = $localStorage.current_patient_id;
	}
    $scope.loading = true;
	$scope.loaded = false;
    AllVisits.query({ person_id: person_id }, function(data) {
    	$scope.loading = false;
		$scope.loaded = true;
    	$scope.visits = data;
    }, function(error) {
        console.log(error);
    });
    
    
    
    $scope.orderProp = 'date';
    
}]);