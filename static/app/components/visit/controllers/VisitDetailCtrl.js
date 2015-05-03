visitControllers.controller('VisitDetailCtrl', [ '$scope', '$routeParams',
		'$http', 'Visit', '$rootScope','$localStorage',
		function($scope, $routeParams, $http, Visit, $rootScope, $localStorage) {

			var visit_id = $routeParams.visitId;

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

			Visit.query({
				person_id : patient_id,
				visit_id : visit_id
			}, function(data) {
				$scope.loading = false;
				$scope.loaded = true;
				$scope.visit = data;
			}, function(error) {
				console.log(error);
			});
		} ]);