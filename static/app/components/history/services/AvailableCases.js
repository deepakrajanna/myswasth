historyServices.factory("AvailableCases", function($resource) {
	return $resource("../../api/available_cases/:patientId", 
            {patientId: '@patientId'}, 
            {'query':  {method:'GET', isArray:true}});
});