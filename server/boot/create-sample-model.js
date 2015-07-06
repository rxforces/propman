var async = require('async');

module.exports = function(app) {
  // data sources
  var mongodb_dev = app.dataSources.mongodb_dev;

  // create all models
  async.parallel({
    players: async.apply(createPlayers),
    properties: async.apply(createProperties)
  }, function(err, results) {
    if (err) throw err;

    updateOwner(results.properties, results.players, function(err) {
      console.log('> models created sucessfully');
    });

    createContracts(results.properties, results.players, function(err) {
      console.log('> models created sucessfully');
    });

    createRequests(results.properties, results.players, function(err) {
      console.log('> models created sucessfully');
    });
  });


  // create Users
  function createPlayers(cb) {
    mongodb_dev.automigrate('Player', function(err) {
      if (err) return cb(err);

      app.models.Player.create([
        {email: 'kate@house.com', password: 'kate123'},
        {email: 'john@house.com', password: 'john123'},
        {email: 'jane@house.com', password: 'jane123'},
        {email: 'sam@aoe.com', password: 'sam123'},
        {email: 'rob@aoe.com', password: 'rob123'},
        {email: 'tom@aoe.com', password: 'tom123'},
      ], cb);
    });
  }

  // create
  function createProperties(cb) {
    mongodb_dev.automigrate('Property', function(err) {
      if (err) return cb(err);

      app.models.Property.create([
        {
          address: '3/102 George St',
          type: "unit",
          city: 'Marsfield',
          state: 'NSW',
          postcode: '2122'
        },
        {
          address: '2034 Victor Rd',
          type: "house",
          city: 'Chatswood',
          state: 'NSW',
          postcode: '2067'
        },
        {
          address: '21 Hering Pi',
          type: 'house',
          city: 'North Ryde',
          state: 'NSW',
          postcode: '2034'
        }
      ], cb);
    });
  }

  // create
  function updateOwner(cb) {

  }
    // create agent contract
    function createContracts(properties, players, cb) {
      mongodb_dev.automigrate('Contract', function(err) {
        if (err) return cb(err);

        var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

        app.models.Contract.create([
          {
            date: Date.now() - (DAY_IN_MILLISECONDS * 5),
            startdate: Date.now() - (DAY_IN_MILLISECONDS * 4),
            enddate:  Date.now() + (DAY_IN_MILLISECONDS * 360),
            template: "agent",
            propertyId: properties[0].id,
            publisherId: players[0].id,
            receiverId: players[2].id,
            active: true
          },
          {
            date: Date.now() - (DAY_IN_MILLISECONDS * 3),
            startdate: Date.now() - (DAY_IN_MILLISECONDS * 2),
            enddate:  Date.now() + (DAY_IN_MILLISECONDS * 60),
            template: "agent",
            propertyId: properties[0].id,
            publisherId: players[0].id,
            receiverId: players[2].id,
            active: true
          },
          {
            date: Date.now() - (DAY_IN_MILLISECONDS * 7),
            startdate: Date.now() - (DAY_IN_MILLISECONDS * 5),
            enddate:  Date.now() + (DAY_IN_MILLISECONDS * 160),
            template: "leasing",
            propertyId: properties[1].id,
            publisherId: players[3].id,
            receiverId: players[4].id,
            active: true
          },
        ], cb);
      });
    }

    // create agent contract
    function createRequests(properties, players, cb) {
      mongodb_dev.automigrate('Request', function(err) {
        if (err) return cb(err);

        var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

        app.models.Request.create([
          {
            date: Date.now() - (DAY_IN_MILLISECONDS * 4),
            description: 'A very good coffee shop.',
            publisherId: players[0].id,
            propertyId: properties[0].id
          },
          {
            date: Date.now() - (DAY_IN_MILLISECONDS * 3),
            description: 'Quite pleasant.',
            publisherId: players[1].id,
            propertyId: properties[0].id
          },
          {
            date: Date.now() - (DAY_IN_MILLISECONDS * 2),
            description: 'It was ok.',
            publisherId: players[1].id,
            propertyId: properties[1].id
          },
        ], cb);
      });
    }
};
