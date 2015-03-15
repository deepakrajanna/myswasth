visitServices.factory('RecordVisit', [ '$resource', function($resource) {
	return $resource('../../addvisit/:visitdata', {}, {
		save : {
			method : 'POST'
		}
	});
} ]);
