'use strict';

/* Services */

var myswasthServices = angular.module('myswasthServices', ['ngResource']);

myswasthServices.factory('AllVisits', ['$resource',
  function($resource){
    return $resource('../../api/visits/:patientId', {}, {
      query: {method:'GET', params:{patientId:'@patientId'},isArray:true}
    });
  }]);

myswasthServices.factory('Visit', ['$resource',
   function($resource){
     return $resource('../../api/visit/1/:visitId', {}, {
       query: {method:'GET', params:{visitId:'@visitId'}}
     });
   }]);

