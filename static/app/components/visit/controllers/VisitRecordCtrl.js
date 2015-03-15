visitControllers
		.controller(
				'VisitRecordCtrl',
				[
						'$scope',
						'$http',
						'$rootScope',
						'FileUploader',
						'RecordVisit',
						function($scope, $http, $rootScope, FileUploader,
								RecordVisit) {

							var patient_id = $rootScope.selected.id;
							
							$scope.imagestatus = [];
							
							$scope.VisitRecordForm = {};
							$scope.VisitRecordForm.vdate = "";
							$scope.VisitRecordForm.name = "";
							$scope.VisitRecordForm.prescription = "Prescription";
							$scope.VisitRecordForm.chiefComplaints = [ {
								id : "cc1",
								name : "cc1"
							}, {
								id : "cc2",
								name : "cc2"
							}, {
								id : "cc3",
								name : "cc3"
							}, {
								id : "cc4",
								name : "cc4"
							}, {
								id : "cc5",
								name : "cc5"
							} ];
							$scope.VisitRecordForm.selected = undefined;
							$scope.VisitRecordForm.states = [ 'cc1', 'cc2',
									'cc3', 'cc4', 'cc5', 'cc6', 'cc7', 'cc8',
									'cc9' ];

							
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
								document.getElementById('ImageStatus').value = response;
								console.info('onCompleteItem', fileItem,
										response, status, headers);
							};
							uploader.onCompleteAll = function() {
								console.info('onCompleteAll');
							};

							console.info('uploader', uploader);

							$scope.VisitRecordForm.submitTheForm = function() {

								//var ImageStatus = document.getElementById('ImageStatus').value;

								
								var visit_data = {
									date : $scope.VisitRecordForm.vdate,
									name : $scope.VisitRecordForm.name,
									chiefcomplaints : $scope.VisitRecordForm.selected,
									url : $scope.imagestatus
								};

								console.log(visit_data);

								RecordVisit.save({
									visitdata : visit_data
									
								}, function(data) {
									console.log(data);
								}, function(error) {
									console.log(error);
								});
							}

						} ]);
