angular
  .module('app', [
    'ui.router',
    'lbServices'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    $stateProvider
      .state('all-requests', {
        url: '/all-requests',
        templateUrl: 'views/all-requests.html',
        controller: 'AllRequestsController'
      })
      .state('my-requests', {
        url: '/my-requests',
        templateUrl: 'views/my-requests.html',
        controller: 'MyRequestsController',
        authenticate: true
      })
      .state('add-request', {
        url: '/add-request',
        templateUrl: 'views/request-form.html',
        controller: 'AddRequestController',
        authenticate: true
      })
      .state('edit-request', {
        url: '/edit-request/:id',
        templateUrl: 'views/request-form.html',
        controller: 'EditRequestController',
        authenticate: true
      })
      .state('delete-request', {
        url: '/delete-request/:id',
        controller: 'DeleteRequestController',
        authenticate: true
      })
      .state('my-properties', {
        url: '/my-properties',
        templateUrl: 'views/my-properties.html',
        controller: 'MyPropertiesController',
        authenticate: true
      })
      .state('add-property', {
        url: '/add-property',
        templateUrl: 'views/property-form.html',
        controller: 'AddPropertyController',
        authenticate: true
      })
      .state('edit-property', {
        url: '/edit-property/:id',
        templateUrl: 'views/property-form.html',
        controller: 'EditPropertyController',
        authenticate: true
      })
      .state('delete-property', {
        url: '/delete-property/:id',
        controller: 'DeletePropertyController',
        authenticate: true
      })
      .state('my-contracts', {
        url: '/my-contracts',
        templateUrl: 'views/my-contracts.html',
        controller: 'MyContractsController',
        authenticate: true
      })
      .state('add-contract', {
        url: '/add-contract',
        templateUrl: 'views/contract-form.html',
        controller: 'AddContractController',
        authenticate: true
      })
      .state('edit-contract', {
        url: '/edit-contract/:id',
        templateUrl: 'views/contract-form.html',
        controller: 'EditContractController',
        authenticate: true
      })
      .state('delete-contract', {
        url: '/delete-contract/:id',
        controller: 'DeleteContractController',
        authenticate: true
      })
      .state('forbidden', {
        url: '/forbidden',
        templateUrl: 'views/forbidden.html',
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'AuthLoginController'
      })
      .state('logout', {
        url: '/logout',
        controller: 'AuthLogoutController'
      })
      .state('sign-up', {
        url: '/sign-up',
        templateUrl: 'views/sign-up-form.html',
        controller: 'SignUpController',
      })
      .state('sign-up-success', {
        url: '/sign-up/success',
        templateUrl: 'views/sign-up-success.html'
      });
    $urlRouterProvider.otherwise('all-requests');
  }])
  .run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(event, next) {
      // redirect to login page if not logged in
      if (next.authenticate && !$rootScope.currentUser) {
        event.preventDefault(); //prevent current page from loading
        $state.go('forbidden');
      }
    });
  }]);
