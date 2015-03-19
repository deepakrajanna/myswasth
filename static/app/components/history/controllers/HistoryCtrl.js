historyControllers.controller('HistoryCtrl', [
		'$scope',
		'$http',
		'$rootScope',
		'CommonComplaints',
		'AvailableCases',
		'Recommendations',
		function($scope, $http, $rootScope, CommonComplaints, AvailableCases,
				Recommendations) {
			
			var patient_id = $rootScope.selected.id;
			$scope.loading = true;
			CommonComplaints.get({
				patientId : patient_id,
			}, function(data) {
				$scope.summary = data.summary;
			}, function(error) {
				console.log(error);
			});

			$scope.cc = function() {
				
				
				AvailableCases.query({
					patientId : patient_id,
				}, function(data) {
					$scope.loading = false;
					$scope.cases = data;
				}, function(error) {
					console.log(error);
				});

			}

			$scope.recommendations = function() {

				Recommendations.query({
					patientId : patient_id,
				}, function(data) {
					$scope.rec = data;
				}, function(error) {
					console.log(error);
				});

			}	
			$scope.chart_Data = function(chart_key) {
				for (i = 0; i < $scope.cases.length; i++) {

						if ($scope.cases[i].code == chart_key) {
							var chart = c3.generate({
								bindto : '#history-chart',
								data : {
									x : 'x',
									json : $scope.cases[i].chart_data,
									mimeType : 'json',
									names : $scope.cases[i].chart_data_names,
									type : 'bar',
									types : $scope.cases[i].chart_data_types

								},
								color : $scope.cases[i].chart_data_colors,
								axis : $scope.cases[i].chart_data_axis
							});
						}
					}
				}
			}
		
	]);
