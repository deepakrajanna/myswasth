visitControllers.controller('VisitDetailCtrl', [ '$scope', '$routeParams',
		'$http', 'Visit', '$rootScope','$localStorage',
		function($scope, $routeParams, $http, Visit, $rootScope, $localStorage) {

			var visit_id = $routeParams.visitId;

			if($rootScope.selected!=null){
				var patient_id = $rootScope.selected.id;
				$localStorage.current_patient_id = $rootScope.selected.id;
				$localStorage.current_patient_name = $rootScope.selected.name;
			}
			else if($rootScope.selected==null){
				var patient_id = $localStorage.current_patient_id;
			}
			$scope.loading = true;
			$scope.loaded = false;

			Visit.query({
				patientId : patient_id,
				visitId : visit_id
			}, function(data) {
				$scope.loading = false;
				$scope.loaded = true;
				$scope.visit = data;
			}, function(error) {
				console.log(error);
			});
		} ]);