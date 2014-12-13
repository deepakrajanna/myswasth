
	
visitControllers.controller('VisitCtrl', ['$scope', '$http','$rootScope','AllVisits',
  function ($scope, $http, $rootScope, AllVisits) {
    
    var patient_id = $rootScope.selected.id;
    
    AllVisits.query({ patientId: patient_id }, function(data) {
    	$scope.visits = data;
    });
    
    $scope.orderProp = 'date';
    
}]);
