(function () {

  'use strict';

  Meteor.methods({
    'reset' : function () {
      Collections.events.remove({});
    },
    'log-out': function () {
      // TODO: if user is logged in call logout
    }
  });

})();
