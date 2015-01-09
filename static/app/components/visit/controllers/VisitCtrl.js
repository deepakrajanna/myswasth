
	
visitControllers.controller('VisitCtrl', ['$scope', '$http','$rootScope','AllVisits',
  function ($scope, $http, $rootScope, AllVisits) {
    
    var patient_id = $rootScope.selected.id;
    
    AllVisits.get({ patientId: patient_id }, function(data) {
    	console.log(data);
    	$scope.visits = data;
    }, function(error) {
        console.log(error);
    });
    
    
    
    $scope.orderProp = 'date';
    
}]);
