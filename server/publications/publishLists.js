Meteor.publish('lists', function() {
    // TODO: only publish public lists and the current user's lists
    var selector = {};
    return Collections.lists.find(selector);
});
