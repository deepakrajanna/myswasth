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

				if (chart_key == "diabetes") {
					for (i = 0; i < $scope.cases.length; i++) {

						if ($scope.cases[i].code == chart_key) {
							var chart = c3.generate({
								bindto : '#history-chart',
								data : {
									x : 'x',
									json : $scope.cases[i].chart_data,
									mimeType : 'json',
									names : {
										data1 : 'Systolic',
										data2 : 'Diastolic',
										data3 : 'Target',
										data4 : 'Target'
									},
									type : 'bar',
									types : {
										data3 : 'line',
										data4 : 'line'
									}

								},
								color : {
									pattern : [ 'blue', 'green', 'blue',
											'green' ]
								},
								axis : {
									x : {
										type : 'category',
										tick : {
											rotate : 75,
											multiline : false
										}
									}
								}
							});
						}
					}
				}
				else if (chart_key == "bp") {
					for (i = 0; i < $scope.cases.length; i++) {

						if ($scope.cases[i].code == chart_key) {
							var chart = c3.generate({
								bindto : '#history-chart',
								data : {
									x : 'x',
									json : $scope.cases[i].chart_data,
									mimeType : 'json',
									names : {
										data1 : 'Systolic',
										data2 : 'Diastolic',
										data3 : 'Target',
										data4 : 'Target'
									},
									type : 'bar',
									types : {
										data3 : 'line',
										data4 : 'line'
									}

								},
								color : {
									pattern : [ 'blue', 'green', 'blue',
											'green' ]
								},
								axis : {
									x : {
										type : 'category',
										tick : {
											rotate : 75,
											multiline : false
										}
									}
								}
							});
						}
					}
				}
				else if(chart_key == "cholesterol"){
					for (i = 0; i < $scope.cases.length; i++) {

						if ($scope.cases[i].code == chart_key) {
							var chart = c3.generate({
								bindto : '#history-chart',
								data : {
									x : 'x',
									json : $scope.cases[i].chart_data,
									mimeType : 'json',
									names : {
										data1 : 'Systolic',
										data2 : 'Diastolic',
										data3 : 'Target',
										data4 : 'Target'
									},
									type : 'bar',
									types : {
										data3 : 'line',
										data4 : 'line'
									}

								},
								color : {
									pattern : [ 'blue', 'green', 'blue',
											'green' ]
								},
								axis : {
									x : {
										type : 'category',
										tick : {
											rotate : 75,
											multiline : false
										}
									}
								}
							});
						}
					}
				}
			}
		
	} ]);
