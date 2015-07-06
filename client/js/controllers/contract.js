angular
  .module('app')
  .controller('MyContractsController', ['$scope', 'Contract', '$rootScope',
    function($scope, Contract, $rootScope) {
      $scope.contracts = Contract.find({
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
  .controller('AddContractController', ['$scope', 'Property', 'Contract',
    '$state', function($scope, Property, Contract, $state) {
      $scope.action = 'Add';
      $scope.properties = [];
      $scope.selectedProperty;
      $scope.contract = {};
      $scope.isDisabled = false;


      Property.find()
        .$promise
        .then(function(properties) {
          $scope.properties = properties;
          $scope.selectedProperty = $scope.selectedProperty || properties[0];
        });

      $scope.submitForm = function() {
        Contract
          .create({
            startdate: $scope.startdate,
            enddate: $scope.enddate,
            template: $scope.template,
            propertyId: $scope.selectedProperty.id
          })
          .$promise
          .then(function() {
            $state.go('my-contracts');
          });
      };
    }])
  .controller('DeleteContractController', ['$scope', 'Contract', '$state',
    '$stateParams', function($scope, Review, $state, $stateParams) {
      Contract
        .deleteById({ id: $stateParams.id })
        .$promise
        .then(function() {
          $state.go('my-contracts');
        });
    }])
  .controller('EditContractController', ['$scope', '$q', 'Property', 'Contract',
    '$stateParams', '$state', function($scope, $q, Property, Contract,
                                       $stateParams, $state) {
      $scope.action = 'Edit';
      $scope.properties = [];
      $scope.selectedProperty;
      $scope.contract = {};
      $scope.isDisabled = true;

      $q
        .all([
          Property.find().$promise,
          Contract.findById({ id: $stateParams.id }).$promise
        ])
        .then(function(data) {
          var property = $scope.property = data[0];
          $scope.contract = data[1];
          $scope.selectedProperty;

          var selectedPropertyIndex = property
            .map(function(coffeeShop) {
              return coffeeShop.id;
            })
            .indexOf($scope.review.coffeeShopId);
          $scope.selectedProperty = coffeeShops[selectedPropertyIndex];
        });

      $scope.submitForm = function() {
        $scope.review.coffeeShopId = $scope.selectedShop.id;
        $scope.review
          .$save()
          .then(function(review) {
            $state.go('my-contracts');
          });
      };
    }]);
