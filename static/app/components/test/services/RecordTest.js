testServices.factory('RecordTest', [ '$resource', function($resource) {
	return $resource('../../addtest/:testdata', {}, {
		save : {
			method : 'POST'
		}
	});
} ]);
