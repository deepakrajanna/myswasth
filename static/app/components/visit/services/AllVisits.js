visitServices.factory('AllVisits', ['$resource',
  function($resource){
    return $resource('../../api/visits/:patientId', {}, {
      query: {method:'GET', params:{patientId:'@patientId'},isArray:true}
    });
  }]);