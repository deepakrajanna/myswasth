
profileControllers.controller('ProfileCtrl', ['$scope', '$http', '$rootScope','$localStorage',
  function ($scope, $http, $rootScope, $localStorage) {
	if($rootScope.selected!=null){
		var patient_id = $rootScope.selected.id;
		$localStorage.current_patient_id = $rootScope.selected.id;
		$localStorage.current_patient_name = $rootScope.selected.name;
	}
	else if($rootScope.selected==null){
		var patient_id = $localStorage.current_patient_id;
	}
}]);
