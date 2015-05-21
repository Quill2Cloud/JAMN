getEventData = function (name, description, properties) {
  var event = {
    createdAt: new Date(),
    session: Meteor.default_connection._lastSessionId,
    name: name,
    description: 'User ' + description,
    route: Router.current().route.getName(),
    properties: properties,
    appCodeName: navigator.appCodeName,
    appName: navigator.appName,
    appVersion: navigator.appVersion,
    cookieEnabled: navigator.cookieEnabled,
    language: navigator.language,
    platform: navigator.platform,
    product: navigator.product,
    productSub: navigator.productSub,
    userAgent: navigator.userAgent,
    vendor: navigator.vendor,
    vendorSub: navigator.vendorSub
  };
  if (Meteor.user()) {
    event.createdBy = Meteor.userId();
    event.description = Meteor.user().username + ' ' + description;
  }
  return event;
};

setMessage = function (messageLevel, messageType, messageDismissable, messageText, messageAction, messageActionPath) {
  Session.set("messageLevel", messageLevel);
  Session.set("messageType", messageType);
  Session.set("messageDismissable", messageDismissable);
  Session.set("messageText", messageText);
  Session.set("messageAction", messageAction);
  Session.set("messageActionPath", messageActionPath);
};

clearMessage = function () {
  Session.set("messageLevel", "");
  Session.set("messageType", "");
  Session.set("messageDismissable", false);
  Session.set("messageText", "");
  Session.set("messageActionPath", "");
  Session.set("messageAction", "");
};

getOptions = function() {
  var sortBy = {};
  if (Session.get('sortBy')) {
    sortBy[Session.get('sortBy')] = -1;
  } else {
    Session.set('sortBy','upvotes');
    sortBy = {upvotes: -1};
  }
  var options = {sort: sortBy};
  return options;
};
