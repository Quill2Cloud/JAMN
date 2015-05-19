Meteor.publish("songs", function () {
  return Collections.songs.find();
});
