visitServices.factory("AllVisits", function($resource) {
	return $resource("http://localhost/shc/index.php/myswasth/stubs/visits/:person_id",
			{patientId: '@person_id'}, 
            {'query':  {method:'GET', isArray:true}});
});