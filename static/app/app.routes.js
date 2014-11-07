
myswasthApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
    	  redirectTo: '/homepage'
      });
  }]);
