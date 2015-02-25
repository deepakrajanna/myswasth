visitServices.factory('RecordVisit', [ '$resource', function($resource) {
	return $resource('../../api/visit/:visitdata', {}, {
		query : {
			method : 'GET',
			params : {
				visitdata : '@visitdata'
			}
		}
	});
} ]);
