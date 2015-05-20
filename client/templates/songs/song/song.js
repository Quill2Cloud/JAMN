Template.song.events({
  'click #music-tab': function (e) {
    e.preventDefault();
    Router.go('song-music', {
      artistSlug: Router.current().params.artistSlug,
      titleSlug: Router.current().params.titleSlug
    });
  },
  'click #comments-tab': function (e) {
    e.preventDefault();
    Router.go('song-comments', {
      artistSlug: Router.current().params.artistSlug,
      titleSlug: Router.current().params.titleSlug
    });
  },
  'click #lists-tab': function (e) {
    e.preventDefault();
    Router.go('song-lists', {
      artistSlug: Router.current().params.artistSlug,
      titleSlug: Router.current().params.titleSlug
    });
  },
  'click #lists-add-tab': function (e) {
    e.preventDefault();
    Router.go('song-lists-add', {
      artistSlug: Router.current().params.artistSlug,
      titleSlug:  Router.current().params.titleSlug
    });
  }
});
