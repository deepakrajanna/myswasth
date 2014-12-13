homeServices.factory("AllPatientIds", function($resource) {
  return $resource("../../api/get_family_members/:patientId");
});