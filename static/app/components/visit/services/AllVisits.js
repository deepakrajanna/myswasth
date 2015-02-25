visitServices.factory("AllVisits", function($resource) {
	return $resource("../../api/visits/:patientId");
});