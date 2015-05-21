(function () {

  'use strict';

  Meteor.methods({
    'reset' : function () {
      Collections.events.remove({});
      Collections.songs.remove({});
    },
    'log-out': function () {
      // TODO: if user is logged in call logout
    },
    'insertSongs': function (number) {
      var songs = [];
      Collections.songs.remove({});
      _.times(number, function (n) {
        Collections.songs.insert(songs[n]);
      });
    }
  });

})();
