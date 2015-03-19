visitServices.factory("AllVisits", function($resource) {
	return $resource("../../api/visits/:patientId",
			{patientId: '@patientId'}, 
            {'query':  {method:'GET', isArray:true}});
});