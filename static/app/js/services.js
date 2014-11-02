'use strict';

/* Services */

var myswasthServices = angular.module('myswasthServices', ['ngResource']);

myswasthServices.factory('Barchart', ['$resource',
  function($resource){
    return $resource('data/:dataId.json', {}, {
      query: {method:'GET', params:{dataId:'barChart'}}
    });
  }]);
  
myswasthServices.factory('Linechart', ['$resource',
  function($resource){
    return $resource('data/:dataId.json', {}, {
      query: {method:'GET', params:{dataId:'lineChart'}}
    });
  }]);
  
myswasthServices.factory('Doughnutchart', ['$resource',
  function($resource){
    return $resource('data/:dataId.json', {}, {
      query: {method:'GET', params:{dataId:'doughnutChart'}}
    });
  }]);
