Schemas.lists = new SimpleSchema({
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
  title: {
    type: String,
    optional: false
  },
  slug: {
    type: String,
    optional: true
  },
  description: {
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
  songs: {
    type: [String],
    optional: true
  },
  sort: {
    type: String,
    optional: true
  },
  public: {
    type: Boolean,
    optional: true
  },
  retricted: {
    type: Boolean,
    optional: true
  }
});

Collections.lists = new Meteor.Collection("lists");
Collections.lists.attachSchema(Schemas.lists);

if (Meteor.isServer) {
  Collections.lists._ensureIndex(
    {
      title: 1,
      description: 1,
      slug: 1
    }
  );
}

Meteor.methods({
  addList: function(title, description, sort, public, restricted) {
    // TODO: remove unblock if subsequent calls rely on this method
    this.unblock();
    if ( !Meteor.userId() ) {
      throw new Meteor.Error("Sign in required!");
    }
    var list = {
        createdAt: new Date(),
        createdBy: Meteor.userId(),
        title: title,
        slug: getSlug(title),
        description: description,
        sort: sort,
        commentCount: 0,
        upvoters: [Meteor.userId()],
        public: public,
        restricted: restricted
    };
    // TODO: error handling if artistSlug + titleSlug is not unique
    list._id = Collections.lists.insert(list);
    // TODO: error handling if insert fails
    Router.go('/lists/' + list.slug);
  },
  editList: function(songId, title, description, sort, public, restricted) {
    // TODO: remove unblock if subsequent calls rely on this method
    this.unblock();
    // TODO: don't allow the song to be edited; check error handling for permissions
    //var user = Meteor.user();
    //if (!user || !hasAdminRights)
    //  throw new Meteor.Error(601, 'Sorry, only the poster can edit this song.');

    // TODO: error handling if artistSlug + titleSlug is not unique
    Collections.lists.update(
      { _id: listId },
      { $set: {
          title: title,
          slug: getSlug(title),
          description: description,
          sort: sort,
          public: public,
          restricted: restricted
        }
      }
    );
  },
  addUpvoterToList: function(listId) {
    // TODO: remove unblock if subsequent calls rely on this method
    this.unblock();
    Collections.lists.update(
      { _id: listId },
      { $addToSet: { upvoters: [Meteor.userId()] } }
    );
    // TODO: error handling
  },
  removeUpvoterFromList: function(listId) {
    // TODO: remove unblock if subsequent calls rely on this method
    this.unblock();
    Collections.lists.update(
      { _id: listId },
      { $pullAll: { upvoters: [Meteor.userId()] } }
    );
    // TODO: error handling
  },
  increaseListCommentCount: function(listId) {
    // TODO: remove unblock if subsequent calls rely on this method
    this.unblock();
    Collections.lists.update(
      { _id: listId },
      { $inc: { commentCount: 1 } }
    );
  },
  addSongToList: function(listId, songId) {
    // TODO: remove unblock if subsequent calls rely on this method
    this.unblock();
    Collections.lists.update(
      { _id: listId },
      { $addToSet: { songs: [songId] } }
    );
    // TODO: error handling
    // TODO: update song
  },
  removeSongFromList: function(listId, songId) {
    // TODO: remove unblock if subsequent calls rely on this method
    this.unblock();
    Collections.lists.update(
      { _id: listId },
      { $pullAll: { songs: [songId] } }
    );
    // TODO: error handling
    // TODO: update song
  },
  deleteList: function(listId) {
    // TODO: remove unblock if subsequent calls rely on this method
    this.unblock();
    Collections.lists.update(
      { _id: listId },
      { $set: {
          deletedAt: new Date(),
          deletedBy: Meteor.userId()
        }
      }
    );
    // TODO: error handling
    // TODO: update songs
  },
  removeList: function(listId) {
    // TODO: remove unblock if subsequent calls rely on this method
    this.unblock();

    Collections.lists.remove({_id: listId});
    // TODO: error handling
    // TODO: update songs
  }
});
