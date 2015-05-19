Security.defineMethod("ifCreator", {
  fetch: [],
  transform: null,
  deny: function(type, arg, userId, doc) {
    return userId !== doc.createdBy;
  }
});

// SONGS
// Only users that are logged in can submit songs
// Admins can update any property on the songs
// The creator of the song can update the artist, title
// Logged in users can vote on the song, comment, add music, and add it to lists
// Admins can remove songs (users can only soft delete their own songs via update)
Collections.songs.permit('insert').ifLoggedIn().apply();
Collections.songs.permit('update').ifHasRole('admin').apply();
Collections.songs.permit('update').ifCreator().onlyProps(['artist','artistSlug','title','titleSlug','deletedAt','deletedBy']).apply();
Collections.songs.permit('update').ifLoggedIn().onlyProps(['commentCount','upvoters','publicLists','privateListsUserIds','music']).apply();
Collections.songs.permit('remove').ifHasRole('admin').apply();

// LISTS
// Only users that are logged in can submit lists
// Admins can update any property on the lists
// The creator of the list can update the title, description, public & restricted
// Logged in users can vote on the list, comment, and add songs
// Admins can remove lists
// Users can remove their own lists (users can only soft delete their own lists via update)
Collections.lists.permit('insert').ifLoggedIn().apply();
Collections.lists.permit('update').ifHasRole('admin').apply();
Collections.lists.permit('update').ifCreator().onlyProps(['title','slug','description','sort','public','restricted','deletedAt','deletedBy']).apply();
Collections.lists.permit('update').ifLoggedIn().onlyProps(['viewCount','commentCount','upvoteCount','upvoters','songCount','songs']).apply();
Collections.lists.permit('remove').ifHasRole('admin').apply();

// EVENTS
// Log events for all users
// Do not allow events to be updated
// Do not allow events to be removed
Collections.events.permit('insert').apply();
Collections.events.permit('update').never().apply();
Collections.events.permit('remove').never().apply();
