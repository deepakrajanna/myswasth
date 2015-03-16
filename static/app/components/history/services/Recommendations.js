historyServices.factory("Recommendations", function($resource) {
	return $resource("../../api/get_recommendations/:patientId", 
            {patientId: '@patientId'}, 
            {'query':  {method:'GET', isArray:false}});
});