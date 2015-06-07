Meteor.publish('users', function() {
  var selector = {};
  var options = {fields: {
    _id: 1,
    createdAt: 1,
    username: 1,
    "profile.slug": 1,
    "profile.color": 1,
    "profile.image": 1
  }};
  return Meteor.users.find(selector, options);
});
