getEventData = function(name, description, properties) {
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
