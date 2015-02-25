visitControllers.controller('VisitDetailCtrl', [ '$scope', '$routeParams',
		'$http', 'Visit', '$rootScope',
		function($scope, $routeParams, $http, Visit, $rootScope) {

			var visit_id = $routeParams.visitId;

			var patient_id = $rootScope.selected.id;

			Visit.query({
				patientId : patient_id,
				visitId : visit_id
			}, function(data) {
				console.log(data);
				$scope.visit = data;
			}, function(error) {
				console.log(error);
			});
		} ]);