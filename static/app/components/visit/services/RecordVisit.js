visitServices.factory('RecordVisit', [ '$resource', function($resource) {
	return $resource('../../api/visit/:visitdata', {}, {
		save : {
			method : 'POST',
		}
	});
} ]);
