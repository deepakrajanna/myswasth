testServices.factory("AllTests", function($resource) {
	return $resource("../../api/tests/:patientId",
			{patientId: '@patientId'}, 
            {'query':  {method:'GET', isArray:true}});
});