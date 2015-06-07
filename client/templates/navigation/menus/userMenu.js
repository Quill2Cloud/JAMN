Template.userMenu.helpers({
    username: function () {
      return Meteor.user().username;
    },
    profileUrl: function () {
      return '/users/' + Meteor.user().profile.slug;
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
