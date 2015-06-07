Template._username.created = function() {
  this.user = new ReactiveVar();
  var id = this.data;
  if (id) {
    var selector = {_id: id};
    var user = Meteor.users.findOne(selector);
    if (!user) {
      logError('danger', 'user-not-found', 'Could not find user when id = ' + id, false, '', '', '');
    } else {
      Template.instance().user.set(user);
    }
  } else {
    logError('danger', 'missing-user-id', '_username template called with no user id', false, '', '', '');
  }
}
Template._username.helpers({
  user: function() {
    return Template.instance().user.get();
  },
  getPathData: function() {
    var user = Template.instance().user.get();
    var slug = '';
    if (user && user.profile.slug) {
      slug = user.profile.slug;
    }
    return { slug: slug };
  }
});
