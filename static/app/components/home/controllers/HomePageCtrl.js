homeControllers.controller('HomePageCtrl', [
		'$scope',
		'$http',
		'$rootScope',
		'$modal',
		'$log',
		'AllPatientIds',
		'getPatientId',
		'$localStorage',
		function($scope, $http, $rootScope, $modal, $log, AllPatientIds,
				getPatientId, $localStorage) {
			$scope.loading = true;
			$scope.loaded = false;
			
			localStorage.clear();
			
			if($localStorage.current_patient_id==null){
				getPatientId.query(function(data) {
					$rootScope.selected = data;
					AllPatientIds.query({
						patientId : $rootScope.selected.id
					}, function(data) {
						$scope.loading = false;
						$scope.loaded = true;
						$rootScope.items = data;
					});
				});
			}
			else if($localStorage.current_patient_id!=null){
				console.log("The code for local storage goes here");
				$rootScope.selected = {id: $localStorage.current_patient_id, name: $localStorage.current_patient_name};
				AllPatientIds.query({
					patientId : $rootScope.selected.id
				}, function(data) {
					$scope.loading = false;
					$scope.loaded = true;
					$rootScope.items = data;
				});
			}
			

			$rootScope.open = function(size) {

				var modalInstance = $modal.open({
					templateUrl : 'myModalContent.html',
					controller : ModalInstanceCtrl,
					size : size,
					resolve : {
						items : function() {
							return $rootScope.items;
						}
					}
				});

				modalInstance.result.then(function(selectedItem) {
					$rootScope.selected = selectedItem;
				}, function() {
					$log.info('Modal dismissed at: ' + new Date());
				});
			};

		} ]);
