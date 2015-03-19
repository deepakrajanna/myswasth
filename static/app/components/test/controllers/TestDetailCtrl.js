testControllers.controller('TestDetailCtrl', [ '$scope', '$routeParams',
		'$http', 'Test', '$rootScope',
		function($scope, $routeParams, $http, Test, $rootScope) {

			var test_id = $routeParams.testId;

			var patient_id = $rootScope.selected.id;

			Test.query({
				patientId : patient_id,
				testId : test_id
			}, function(data) {
				console.log(data);
				$scope.test = data;
			}, function(error) {
				console.log(error);
			});
		} ]);