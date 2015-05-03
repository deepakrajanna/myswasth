homeServices.factory("AllPatientIds", function($resource) {
  //return $resource("../../api/get_family_members/:patientId");
  return $resource("http://localhost/shc/index.php/myswasth/stubs/get_family_members/:person_id");
	

});