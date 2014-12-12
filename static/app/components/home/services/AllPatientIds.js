homeServices.factory('AllPatientIds', ['$resource',
  function($resource){
    return $resource('../../api/get_family_members/:patientId', {}, {
      query: {method:'GET', params:{patientId:'@patientId'}}
    });
  }]);