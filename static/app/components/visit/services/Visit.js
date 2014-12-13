

visitServices.factory('Visit', ['$resource',
   function($resource){
     return $resource('../../api/visit/:patientId/:visitId', {}, {
       query: {method:'GET', params:{ patientId:'@patientId', visitId:'@visitId'}}
     });
   }]);
