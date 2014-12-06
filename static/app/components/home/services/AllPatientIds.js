homeServices.factory('AllPatientIds', ['$resource',
  function($resource){
    return $resource('../../api/visits/:patientId', {}, {
      query: {method:'GET', params:{patientId:'@patientId'},isArray:true}
    });
  }]);