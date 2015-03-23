testServices.factory("GetTestForm", function($resource) {
	return $resource("../../api/alltestforms",{},
			{'query':  {method:'GET', isArray:false}});
});