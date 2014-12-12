homeServices.factory('getPatientId', ['$resource',
  function($resource){
    return $resource('../../api/get_patient_id', {}, {
      query: {method:'GET', isArray:true}
    });
  }]);