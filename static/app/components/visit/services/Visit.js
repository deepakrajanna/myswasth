

visitServices.factory('Visit', ['$resource',
   function($resource){
     return $resource('../../api/visit/1/:visitId', {}, {
       query: {method:'GET', params:{visitId:'@visitId'}}
     });
   }]);
