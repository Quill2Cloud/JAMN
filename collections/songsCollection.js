Schemas.songs = new SimpleSchema({
  createdAt: {
    type: Date
  },
  createdBy: {
    type: String
  },
  deletedAt: {
    type: Date,
    optional: true
  },
  deletedBy: {
    type: String,
    optional: true
  },
  artist: {
    type: String,
    label: "Artist",
    optional: false,
    max: 100
  },
  artistSlug: {
    type: String,
    optional: true
  },
  title: {
    type: String,
    label: "Title",
    optional: false,
    max: 100
  },
  titleSlug: {
    type: String,
    optional: true
  },
  commentCount: {
    type: Number,
    optional: true
  },
  upvoters: {
    type: [String],
    optional: true
  },
  publicLists: {
    type: [String],
    optional: true
  },
  privateListsUserIds: {
    type: [String],
    optional: true
  },
  music: {
    type: [Object],
    optional: true
  },
  "music.$.description": {
    type: String,
    optional: true
  },
  "music.$.url": {
    type: String,
    optional: true
  },
  "music.$.fileId": {
    type: String,
    optional: true
  },
  "music.$.filename": {
    type: String,
    optional: true
  },
  "music.$.boxDocId": {
    type: String,
    optional: true
  },
  "music.$.boxSessionId": {
    type: String,
    optional: true
  },
  "music.$.boxSessionExpiry": {
    type: Date,
    optional: true
  }
});

Collections.songs = new Mongo.Collection("songs");
Collections.songs.attachSchema(Schemas.songs);

if (Meteor.isServer) {
  Collections.songs._ensureIndex(
    {
      artist: 1,
      artistSlug: 1,
      title: 1,
      titleSlug: 1
    }
  );
}

Meteor.methods({
  addSong: function(artist, title) {
    // TODO: remove unblock if subsequent calls rely on this method
    this.unblock();
    if ( !Meteor.userId() ) {
      throw new Meteor.Error("Sign in required!");
    }
    var song = {
        createdAt: new Date(),
        createdBy: Meteor.userId(),
        artist: artist,
        artistSlug: getSlug(artist),
        title: title,
        titleSlug: getSlug(title),
        commentCount: 0,
        upvoters: [Meteor.userId()]
    };
    // TODO: error handling if artistSlug + titleSlug is not unique
    song._id = Collections.songs.insert(song);
    // TODO: error handling if insert fails
    Router.go('/songs/' + song.artistSlug + '/' + song.titleSlug);
  },
  editSong: function(songId, artist, title) {
    // TODO: remove unblock if subsequent calls rely on this method
    this.unblock();
    // TODO: don't allow the song to be edited; check error handling for permissions
    //var user = Meteor.user();
    //if (!user || !hasAdminRights)
    //  throw new Meteor.Error(601, 'Sorry, only the poster can edit this song.');

    // TODO: error handling if artistSlug + titleSlug is not unique
    Collections.songs.update(
      { _id: songId },
      { $set: {
          artist: artist,
          artistSlug: getSlug(artist),
          title: title,
          titleSlug: getSlug(title)
        }
      }
    );

    //return Songs.findOne(songId);
  },
  addUpvoterToSong: function(songId) {
    // TODO: remove unblock if subsequent calls rely on this method
    this.unblock();
    Collections.songs.update(
      { _id: songId },
      { $addToSet: { upvoters: [Meteor.userId()] } }
    );
    // TODO: error handling
  },
  removeUpvoterFromSong: function(songId) {
    // TODO: remove unblock if subsequent calls rely on this method
    this.unblock();
    Collections.songs.update(
      { _id: songId },
      { $pullAll: { upvoters: [Meteor.userId()] } }
    );
    // TODO: error handling
  },
  addMusic: function() {
    // TODO: remove unblock if subsequent calls rely on this method
    this.unblock();
  },
  editMusic: function() {
    // TODO: remove unblock if subsequent calls rely on this method
    this.unblock();
  },
  getBoxDocId: function(url) {
    // TODO: remove unblock if subsequent calls rely on this method
    this.unblock();
    return Meteor.http.call(
      'POST',
      'https://view-api.box.com/1/documents',
      {
        headers: {
            'Authorization': 'Token b85etghqj434fwyvvguidbduetdql6dg',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        data: {url: url}
      }//,
      //function(err,result){
      //  console.log('Returned Box Document');
      //}
    );
  },
  setBoxDocId: function() {
    // TODO: remove unblock if subsequent calls rely on this method
    this.unblock();
  },
  getBoxSessionId: function(boxDocId) {
    // TODO: remove unblock if subsequent calls rely on this method
    this.unblock();
    return Meteor.http.call(
      'POST',
      'https://view-api.box.com/1/sessions',
      {
        headers: {
            'Authorization': 'Token b85etghqj434fwyvvguidbduetdql6dg',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        data: {document_id: boxDocId, duration: 120}
      }//,
      //function(err,result){
      //  console.log('Returned Box Session');
      //}
    );
  },
  setBoxSessionId: function() {
    // TODO: remove unblock if subsequent calls rely on this method
    this.unblock();
  },
  getEmbedlyData: function(url) {
    // TODO: remove unblock if subsequent calls rely on this method
    this.unblock();
    return Meteor.http.call(
      'GET'
      ,'http://api.embed.ly/1/oembed?key=c19ef0e2488e425983a70232db7377bb&width=480&height=365&url=' + encodeURIComponent(url)
      //,function(err,result){
      //  console.log('Returned Embedly Data');
      //}
    );
  },
  increaseSongCommentCount: function(songId) {
    // TODO: remove unblock if subsequent calls rely on this method
    this.unblock();
    Collections.songs.update(
      { _id: songId },
      { $inc: { commentCount: 1 } }
    );
  },
  addPublicListToSong: function(songId, listId) {
    // TODO: remove unblock if subsequent calls rely on this method
    this.unblock();
    Collections.songs.update(
      { _id: songId },
      { $addToSet: { publicLists: [listId] } }
    );
    // TODO: error handling
  },
  removePublicListFromSong: function(songId, listId) {
    // TODO: remove unblock if subsequent calls rely on this method
    this.unblock();
    Collections.songs.update(
      { _id: songId },
      { $pullAll: { publicLists: [listId] } }
    );
    // TODO: error handling
  },
  addPrivateListToSong: function(songId) {
    // TODO: remove unblock if subsequent calls rely on this method
    this.unblock();
    Collections.songs.update(
      { _id: songId },
      { $addToSet: { privateListsUserIds: [Meteor.userId()] } }
    );
    // TODO: error handling
  },
  removePrivateListFromSong: function(songId) {
    // TODO: remove unblock if subsequent calls rely on this method
    this.unblock();
    Collections.songs.update(
      { _id: songId },
      { $pull: { privateListsUserIds: Meteor.userId() } }
    );
    // TODO: error handling
  },
  deleteSong: function(songId) {
    // TODO: remove unblock if subsequent calls rely on this method
    this.unblock();
    Collections.songs.update(
      { _id: songId },
      { $set: {
          deletedAt: new Date(),
          deletedBy: Meteor.userId()
        }
      }
    );
    // TODO: error handling
    // TODO: remove from lists
  },
  removeSong: function(songId) {
    // TODO: remove unblock if subsequent calls rely on this method
    this.unblock();

    Collections.songs.remove({_id: songId});
    // TODO: error handling
    // TODO: remove from lists
  }
});
