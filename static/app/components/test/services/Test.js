testServices.factory('Test', [ '$resource', function($resource) {
	return $resource('../../api/test/:patientId/:testId', {}, {
		query : {
			method : 'GET',
			params : {
				patientId : '@patientId',
				visitId : '@visitId'
			}
		}
	});
} ]);
