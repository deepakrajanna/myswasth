visitServices.factory('RecordVisit', [ '$resource', function($resource) {
	return $resource('../../api/record_visit/:visitdata', {}, {
		save : {
			method : 'POST',
		}
	});
} ]);
