
module.exports = {
  mongodb_dev: {
    connector: 'mongodb',
    url: process.env.OPENSHIFT_MONGODB_DB_URL,
    database: 'propman',
    name: "mongodb_dev"
  }
};
