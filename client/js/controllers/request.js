angular
  .module('app')
  .controller('AllRequestsController', ['$scope', 'Request', function($scope,
      Request) {
    $scope.requests = Request.find({
      filter: {
        include: [
          'property',
          'player'
        ]
      }
    });
  }])
  .controller('MyRequestsController', ['$scope', 'Request', '$rootScope',
      function($scope, Request, $rootScope) {
    $scope.requests = Request.find({
      filter: {
        where: {
          publisherId: $rootScope.currentUser.id
        },
        include: [
          'property',
          'player'
        ]
      }
    });
  }])
  .controller('AddRequestController', ['$scope', 'Property', 'Request',
      '$state', function($scope, Property, Request, $state) {
    $scope.action = 'Add';
    $scope.properties = [];
    $scope.selectedProperty;
    $scope.request = {};
    $scope.isDisabled = false;


      Property.find()
      .$promise
      .then(function(properties) {
        $scope.properties = properties;
        $scope.selectedProperty = $scope.selectedProperty || properties[0];
      });

    $scope.submitForm = function() {
      Request
        .create({
          description: $scope.request.description,
          propertyId: $scope.selectedProperty.id
        })
        .$promise
        .then(function() {
          $state.go('my-requests');
        });
    };
  }])
  .controller('DeleteRequestController', ['$scope', 'Request', '$state',
      '$stateParams', function($scope, Review, $state, $stateParams) {
    Request
      .deleteById({ id: $stateParams.id })
      .$promise
      .then(function() {
        $state.go('my-requests');
      });
  }])
  .controller('EditReviewController', ['$scope', '$q', 'Property', 'Request',
      '$stateParams', '$state', function($scope, $q, Property, Request,
      $stateParams, $state) {
    $scope.action = 'Edit';
    $scope.properties = [];
    $scope.selectedProperty;
    $scope.request = {};
    $scope.isDisabled = true;

    $q
      .all([
        Property.find().$promise,
        Request.findById({ id: $stateParams.id }).$promise
      ])
      .then(function(data) {
        var properties = $scope.properties = data[0];
        $scope.request = data[1];
        $scope.selectedProperty;

        var selectedPropertyIndex = properties
          .map(function(property) {
            return property.id;
          })
          .indexOf($scope.request.propertyId);
        $scope.selectedProperty = properties[selectedPropertyIndex];
      });

    $scope.submitForm = function() {
      $scope.request.propertyId = $scope.selectedProperty.id;
      $scope.request
        .$save()
        .then(function(request) {
          $state.go('my-requests');
        });
    };
  }]);
