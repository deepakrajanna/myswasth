testServices.factory("AllTests", function($resource) {
	return $resource("http://localhost/shc/index.php/myswasth/stubs/tests/:person_id",
			{person_id: '@person_id'}, 
            {'query':  {method:'GET', isArray:true}});
});