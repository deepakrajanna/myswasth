testControllers
		.controller(
				'TestRecordCtrl',
				[
						'$scope',
						'$http',
						'$rootScope',
						'$location',
						'FileUploader',
						'RecordTest',
						'GetTests',
						'GetTestForm',
						function($scope, $http, $rootScope, $location,
								FileUploader, RecordTest, GetTests, GetTestForm) {
							
							var patient_id = $rootScope.selected.id;
							$scope.imagestatus = [];
							$scope.models = {};
							$scope.loading = true;
							$scope.loaded = false;
							GetTests.query(function(data) {
								$scope.loading = false;
								$scope.loaded = true;
						    	$scope.alltests = data;
						    }, function(error) {
						        console.log(error);
						    });
							
							GetTestForm.query(function(data) {
								$scope.testForm = data;
								$scope.selectedOption = data[0];
						    }, function(error) {
						        console.log(error);
						    });

							$scope.getValues = function(id) {
								return $scope.testForm[id];
							}

							var uploader = $scope.uploader = new FileUploader({
								url : '../../upload',
								formData : {
									patient_id : patient_id
								},
								autoUpload : true
							});

							uploader.filters
									.push({
										name : 'imageFilter',
										fn : function(
												item /* {File|FileLikeObject} */,
												options) {
											var type = '|'
													+ item.type
															.slice(item.type
																	.lastIndexOf('/') + 1)
													+ '|';
											return '|jpg|png|jpeg|'
													.indexOf(type) !== -1;
										}
									});

							uploader.onWhenAddingFileFailed = function(
									item /* {File|FileLikeObject} */, filter,
									options) {
								console.info('onWhenAddingFileFailed', item,
										filter, options);
							};
							uploader.onAfterAddingFile = function(fileItem) {
								console.info('onAfterAddingFile', fileItem);
								$scope.presc_img = "true";
							};
							uploader.onAfterAddingAll = function(addedFileItems) {
								console
										.info('onAfterAddingAll',
												addedFileItems);
							};
							uploader.onBeforeUploadItem = function(item) {
								console.info('onBeforeUploadItem', item);
							};
							uploader.onProgressItem = function(fileItem,
									progress) {
								console.info('onProgressItem', fileItem,
										progress);
							};
							uploader.onProgressAll = function(progress) {
								console.info('onProgressAll', progress);
							};
							uploader.onSuccessItem = function(fileItem,
									response, status, headers) {
								console.info('onSuccessItem', fileItem,
										response, status, headers);
							};
							uploader.onErrorItem = function(fileItem, response,
									status, headers) {
								console.info('onErrorItem', fileItem, response,
										status, headers);
							};
							uploader.onCancelItem = function(fileItem,
									response, status, headers) {
								console.info('onCancelItem', fileItem,
										response, status, headers);
							};
							uploader.onCompleteItem = function(fileItem,
									response, status, headers) {
								console.log(response);

								$scope.imagestatus.push(response);
								console.info('onCompleteItem', fileItem,
										response, status, headers);
							};
							uploader.onCompleteAll = function() {
								console.info('onCompleteAll');
							};
							
							$scope.emptyModels = function() {

								$scope.models = {};
							}

							$scope.submitTheForm = function() {

								if ($scope.test_record_form.$valid) {
									var test_data = {
										test : $scope.test,
										models : $scope.models,
										url : $scope.imagestatus
									};

									console.log(test_data);

									RecordTest.save({
										testdata : test_data

									}, function(data) {
										console.log(data);
										$location.path('/test')
									}, function(error) {
										console.log(error);
									});
								}
							}
						} ]);
