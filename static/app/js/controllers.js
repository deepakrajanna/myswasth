  'use strict';


/* Controllers */

var myswasthControllers = angular.module('myswasthControllers', []);

myswasthControllers.controller('HomePageCtrl', ['$scope', '$http','$rootScope','$modal','$log',
  function ($scope, $http, $rootScope, $modal, $log) {

    $rootScope.selected = { id : "cc1", name: "cc1-name" };
    $rootScope.items = [
              { id : "cc1", name: "cc1-name" }
             ,{ id : "cc2", name: "cc2-name" }
             ,{ id : "cc3", name: "cc3-name" }
             ,{ id : "cc4", name: "cc4-name" }
             ,{ id : "cc5", name: "cc5-name" }
             ];

    $rootScope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: ModalInstanceCtrl,
      size: size,
      resolve: {
        items: function () {
          return $rootScope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $rootScope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

    

    $http.get('data/homeicons.json').success(function(data) {
      $scope.homeicons = data;
    });
}]);


var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function (name) {
    alert(name);
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};

	
myswasthControllers.controller('VisitCtrl', ['$scope', '$http','$rootScope','AllVisits',
  function ($scope, $http, $rootScope,AllVisits) {
    
    alert($rootScope.selected.id);
    
    var patient_id = 1;
    
    var responseAllVisits = AllVisits.query({patientId: patient_id});
    
    responseAllVisits.$promise.then(function(data){
	    var AllVisitData = angular.fromJson(angular.toJson(data)); 
	    $scope.visits = AllVisitData;
	});
    
    $scope.orderProp = 'date';
}]);

myswasthControllers.controller('VisitDetailCtrl', ['$scope', '$routeParams', '$http','Visit',
   function ($scope, $routeParams, $http, Visit) {
	
	alert($routeParams.visitId);
	
	var visit_id = $routeParams.visitId;
	
	var responseVisit = Visit.query({visitId: visit_id});
    
    responseVisit.$promise.then(function(data){
	    var VisitData = angular.fromJson(angular.toJson(data)); 
	    $scope.visit = VisitData;
	});
}]);

myswasthControllers.controller('VisitRecordCtrl', ['$scope','$http','FileUploader',
 function ($scope,$http,FileUploader) {
 	  $scope.VisitRecordForm = {};
	  $scope.VisitRecordForm.vdate = "";
	  $scope.VisitRecordForm.name  = "";
	  $scope.VisitRecordForm.prescription  = "Prescription";
	  $scope.VisitRecordForm.chiefComplaints = [
              { id : "cc1", name: "cc1" }
             ,{ id : "cc2", name: "cc2" }
             ,{ id : "cc3", name: "cc3" }
             ,{ id : "cc4", name: "cc4" }
             ,{ id : "cc5", name: "cc5" }
             ];
	  $scope.VisitRecordForm.selected = undefined;
	  $scope.VisitRecordForm.states = ['cc1', 'cc2', 'cc3', 'cc4', 'cc5', 'cc6', 'cc7', 'cc8', 'cc9'];
    

	  var uploader = $scope.uploader = new FileUploader({
                url: 'http://localhost:8080/upload',
                autoUpload:true
            });



      uploader.filters.push({
          name: 'imageFilter',
          fn: function(item /*{File|FileLikeObject}*/, options) {
              var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
              return '|jpg|png|jpeg|'.indexOf(type) !== -1;
          }
      });

      uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            alert(response);
            document.getElementById('ImageStatus').value = response;
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);

      $scope.VisitRecordForm.submitTheForm = function(item, event) {
    	
        var ImageStatus = document.getElementById('ImageStatus').value;



        console.log("--> Submitting form");
        var dataObject = {
           date : $scope.VisitRecordForm.vdate,
           name  : $scope.VisitRecordForm.name,
           chiefcomplaints  : $scope.VisitRecordForm.selected,
           url : ImageStatus
        };

        console.log(dataObject);

        var responsePromise = $http.post("../../upload", dataObject, {});
         responsePromise.success(function(dataFromServer, status, headers, config) {
            console.log(dataFromServer.title);
         });
          responsePromise.error(function(data, status, headers, config) {
            alert("Submitting form failed!");
         });
      
    }

}]);

myswasthControllers.controller('VisitRecordTestCtrl', ['$scope','$http','FileUploader',
 function ($scope,$http,FileUploader) {
       
       var uploader = $scope.uploader = new FileUploader({
                url: 'http://localhost/MySwasth/app/upload.php'
            });

      // FILTERS

        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });


        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);

}]);

myswasthControllers.controller('TestCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('data/homeicons.json').success(function(data) {
      $scope.homeicons = data;
    });
}]);

myswasthControllers.controller('TestRecordCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('data/test-form.json').success(function(data) {
      $scope.testForm = data;
      $scope.selectedOption = data[0];
    });
    
    $http.get('data/tests.json').success(function(data) {
        $scope.testForm2 = data;
      });
    $scope.getValues = function(id) {
        return $scope.testForm[id];
      }
}]);

myswasthControllers.controller('HistoryCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('data/history.json').success(function(data) {
      $scope.historyData = data;
    });

    $http.get('data/history-case.json').success(function(data) {
      $scope.chart = data;
    });
   
}]);

myswasthControllers.controller('ProfileCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('data/homeicons.json').success(function(data) {
      $scope.homeicons = data;
    });
}]);

