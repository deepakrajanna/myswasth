
profileControllers.controller('ProfileCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('data/homeicons.json').success(function(data) {
      $scope.homeicons = data;
    });
}]);
