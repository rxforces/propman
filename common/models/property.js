module.exports = function(Property) {
  Property.beforeRemote('create', function(context, user, next) {
    var req = context.req;
    req.body.date = Date.now();
    req.body.ownerId = req.accessToken.userId;
    next();
  });
};
