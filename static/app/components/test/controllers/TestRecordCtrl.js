testControllers.controller('TestRecordCtrl', ['$scope', '$http',
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
