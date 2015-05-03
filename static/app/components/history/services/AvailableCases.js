historyServices.factory("AvailableCases", function($resource) {
	return $resource("http://localhost/shc/index.php/myswasth/stubs/available_cases/:person_id", 
            {person_id: '@person_id'}, 
            {'query':  {method:'GET', isArray:true}});
});