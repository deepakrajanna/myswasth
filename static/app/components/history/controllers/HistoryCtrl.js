historyControllers.controller('HistoryCtrl', ['$scope', '$http',
   function ($scope, $http) {
     $http.get('/static/app/data/history.json').success(function(data) {
       $scope.historyData = data;
     });

     $http.get('/static/app/data/history-case.json').success(function(data) {
       $scope.chart = data;
     });
    
 }]);
