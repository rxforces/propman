angular
  .module('app')
  .controller('MyPropertiesController', ['$scope', 'Property', '$rootScope',
    function($scope, Property, $rootScope) {
      $scope.properties = Property.find({
        filter: {
          include: [
            'owner'
          ]
        }
      });
    }])
  .controller('AddPropertyController', ['$scope', 'Property',
    '$state', function($scope, Property, Request, $state) {
      $scope.action = 'Add';
      $scope.property = {};
      $scope.isDisabled = false;

      $scope.submitForm = function() {
        Property
          .create({
            description: $scope.request.description,
            propertyId: $scope.selectedProperty.id
          })
          .$promise
          .then(function() {
            $state.go('my-properties');
          });
      };
    }])
  .controller('DeletePropertyController', ['$scope', 'Property', '$state',
    '$stateParams', function($scope, Review, $state, $stateParams) {
      Property
        .deleteById({ id: $stateParams.id })
        .$promise
        .then(function() {
          $state.go('my-properties');
        });
    }])
  .controller('EditPropertyController', ['$scope', '$q', 'CoffeeShop', 'Review',
    '$stateParams', '$state', function($scope, $q, CoffeeShop, Review,
                                       $stateParams, $state) {
      $scope.action = 'Edit';
      $scope.coffeeShops = [];
      $scope.selectedShop;
      $scope.review = {};
      $scope.isDisabled = true;

      $q
        .all([
          CoffeeShop.find().$promise,
          Review.findById({ id: $stateParams.id }).$promise
        ])
        .then(function(data) {
          var coffeeShops = $scope.coffeeShops = data[0];
          $scope.review = data[1];
          $scope.selectedShop;

          var selectedShopIndex = coffeeShops
            .map(function(coffeeShop) {
              return coffeeShop.id;
            })
            .indexOf($scope.review.coffeeShopId);
          $scope.selectedShop = coffeeShops[selectedShopIndex];
        });

      $scope.submitForm = function() {
        $scope.review.coffeeShopId = $scope.selectedShop.id;
        $scope.review
          .$save()
          .then(function(review) {
            $state.go('all-reviews');
          });
      };
    }]);
