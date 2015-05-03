historyServices.factory("CommonComplaints", function($resource) {
	return $resource("http://localhost/shc/index.php/myswasth/stubs/common_complaints/:person_id");
});