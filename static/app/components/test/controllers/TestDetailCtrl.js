testControllers.controller('TestDetailCtrl', [ '$scope', '$routeParams',
		'$http', 'Test', '$rootScope','$localStorage',
		function($scope, $routeParams, $http, Test, $rootScope, $localStorage) {

			var test_id = $routeParams.testId;

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

			Test.query({
				patientId : patient_id,
				testId : test_id
			}, function(data) {
				
				$scope.loading = false;
				$scope.loaded = true;
				$scope.test = data;
			}, function(error) {
				console.log(error);
			});
		} ]);