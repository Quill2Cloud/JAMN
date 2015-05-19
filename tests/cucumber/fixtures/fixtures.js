(function () {

  'use strict';

  Meteor.methods({
    'reset' : function() {
      Collections.events.remove({});
    }
  });

})();
