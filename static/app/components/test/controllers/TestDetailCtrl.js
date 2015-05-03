testControllers.controller('TestDetailCtrl', [ '$scope', '$routeParams',
		'$http', 'Test', '$rootScope','$localStorage',
		function($scope, $routeParams, $http, Test, $rootScope, $localStorage) {

			var visit_id = $routeParams.visit_id;

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

			Test.query({
				person_id : person_id,
				visit_id : visit_id
			}, function(data) {
				
				$scope.loading = false;
				$scope.loaded = true;
				$scope.test = data;
			}, function(error) {
				console.log(error);
			});
		} ]);