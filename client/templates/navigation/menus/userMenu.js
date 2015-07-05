Template.userMenu.helpers({
    username: function () {
      if (Meteor.user()) {
        return Meteor.user().username;
      } else {
        return "";
      }
    },
    profileUrl: function () {
      if (Meteor.user()) {
        return '/users/' + Meteor.user().profile.slug;
      } else {
        return "";
      }
    }
});

Template.userMenu.events({
  'click .user-menu-header': function (e) {
    e.preventDefault();
    $('.user-menu').slideToggle('fast');
  },
  'click .menu-label': function (e) {
    $('.user-menu').slideToggle('fast');
  }
});
