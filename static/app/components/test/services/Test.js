testServices.factory('Test', [ '$resource', function($resource) {
	return $resource('http://localhost/shc/index.php/myswasth/stubs/test/:person_id/:visit_id', {}, {
		query : {
			method : 'GET',
			params : {
				person_id : '@person_id',
				visit_id : '@visit_id'
			}
		}
	});
} ]);
