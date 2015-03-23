testServices.factory("GetTests", function($resource) {
	return $resource("../../api/alltests");
});