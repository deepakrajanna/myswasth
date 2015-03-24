visitControllers.controller('VisitDetailCtrl', [ '$scope', '$routeParams',
		'$http', 'Visit', '$rootScope',
		function($scope, $routeParams, $http, Visit, $rootScope) {

			var visit_id = $routeParams.visitId;

			var patient_id = $rootScope.selected.id;
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