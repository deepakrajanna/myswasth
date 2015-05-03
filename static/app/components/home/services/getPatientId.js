homeServices.factory('getPatientId', ['$resource',
  function($resource){
    return $resource('http://localhost/shc/index.php/myswasth/stubs/get_patient_id/', {}, {
      query: {method:'GET', isArray:false}
    });
  }]);