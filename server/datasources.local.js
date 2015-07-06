


var DBURL =  OPENSHIFT_MONGODB_DB_URL || "mongodb://127.0.0.1:27017/propman";

var DATASTORES = {
  memory: {
  },
  mongodb: {
    url: DBURL,
    "name": "mongodb_dev",
    "connector": "mongodb",
  }
};

module.exports = {
  db: DATASTORES
};
