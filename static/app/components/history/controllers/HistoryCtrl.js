historyControllers.controller('HistoryCtrl', ['$scope', '$http',
   function ($scope, $http) {
     $http.get('/static/app/data/history.json').success(function(data) {
       $scope.historyData = data;
     });

     $http.get('/static/app/data/history-case.json').success(function(data) {
       $scope.chart = data;
     });
     
     $scope.init = function(x){
    	 alert(x);
    	 var chart = c3.generate({
    	    	bindto: '#history-chart',
    		    data: {
    		    	columns: [
    		        	['data1', 220, 320, 260, 350, 280, 270],
    		            ['data2', 150, 240, 200, 300, 220, 250]
    		        ],
    		        names: {
    		            data1: 'Today through now',
    		            data2: '12 Weeks'
    		        },
    		        types: {
    		            data1: 'area',
    		            data2: 'area-spline'
    		        }
    		    },
    		    color: {
    				pattern: ['blue','red']
    			},
    			axis: {
    				x: {
    		            type: 'category',
    		            categories: ['12:00AM', '02:00AM', '04:00AM', '06:00AM', '08:00AM', '10:00AM']
    		        }
    		    },
    		    zoom: {
    		        enabled: true
    		    }
    	 	});
     }
     
}]);
