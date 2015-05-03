visitServices.factory('Visit', [ '$resource', function($resource) {
	return $resource('http://localhost/shc/index.php/myswasth/stubs/visit/:person_id/:visit_id', {}, {
		query : {
			method : 'GET',
			params : {
				person_id : '@person_id',
				visit_id : '@visit_id'
			}
		}
	});
} ]);
