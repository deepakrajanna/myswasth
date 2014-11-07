
	
visitControllers.controller('VisitCtrl', ['$scope', '$http','$rootScope','AllVisits',
  function ($scope, $http, $rootScope,AllVisits) {
    
    alert($rootScope.selected.id);
    
    var patient_id = 1;
    
    var responseAllVisits = AllVisits.query({patientId: patient_id});
    
    responseAllVisits.$promise.then(function(data){
	    var AllVisitData = angular.fromJson(angular.toJson(data)); 
	    $scope.visits = AllVisitData;
	});
    
    $scope.orderProp = 'date';
}]);
