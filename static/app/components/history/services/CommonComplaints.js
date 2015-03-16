historyServices.factory("CommonComplaints", function($resource) {
	return $resource("../../api/common_complaints/:patientId");
});