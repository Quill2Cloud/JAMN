Template.song.events({
  'click #music-tab': function (e) {
    e.preventDefault();
    setMessage("secondary", "success", true, "Success: this is my success message.", "", "");
    Router.go('song-music', {
      artistSlug: Router.current().params.artistSlug,
      titleSlug: Router.current().params.titleSlug
    });
  },
  'click #comments-tab': function (e) {
    e.preventDefault();
    setMessage("secondary", "info", true, "Info: this is my info message.", "", "");
    Router.go('song-comments', {
      artistSlug: Router.current().params.artistSlug,
      titleSlug: Router.current().params.titleSlug
    });
  },
  'click #lists-tab': function (e) {
    e.preventDefault();
    setMessage("secondary", "warning", false, "Warning: this is my warning message.", "View All Songs", "/songs");
    Router.go('song-lists', {
      artistSlug: Router.current().params.artistSlug,
      titleSlug: Router.current().params.titleSlug
    });
  },
  'click #lists-add-tab': function (e) {
    e.preventDefault();
    setMessage("secondary", "danger", false, "Error: this is my error message.", "View All Lists", "/lists");
    Router.go('song-lists-add', {
      artistSlug: Router.current().params.artistSlug,
      titleSlug:  Router.current().params.titleSlug
    });
  }
});
