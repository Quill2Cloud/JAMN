Template._avatar.helpers({
  user: function() {
    var id = String(this);
    var selector = {_id: id};
    var user = Meteor.users.findOne(selector);
    return user;
  },
  getInitials: function (user) {
    if (user) {
      var username = user.username;
      var parts = [];
      var initials = '';

      parts = username.split(' ');
      // Limit getInitials to first and last initial to avoid problems with
      // very long multi-part names (e.g. "Jose Manuel Garcia Galvez")
      initials = _.first(parts).charAt(0);
      if (parts.length > 1) {
        initials += _.last(parts).charAt(0);
      }
      return initials;
    } else {
      return '';
    }
  }
});

Template._avatar.events({
  'click .avatar': function(e){
    Router.go('/users/' + e.currentTarget.getAttribute("slug"));
  }
});
