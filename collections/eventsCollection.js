Schemas.events = new SimpleSchema({
  createdAt: {
    type: Date
  },
  createdBy: {
    type: String,
    optional: true
  },
  ip: {
    type: String
  },
  session: {
    type: String,
    optional: true
  },
  name: {
    type: String
  },
  description: {
    type: String
  },
  route: {
    type: String,
    optional: true
  },
  properties: {
    type: Object,
    optional: true,
    blackbox: true
  },
  appCodeName: {
    type: String,
    optional: true
  },
  appName: {
    type: String,
    optional: true
  },
  appVersion: {
    type: String,
    optional: true
  },
  cookieEnabled: {
    type: String,
    optional: true
  },
  language: {
    type: String,
    optional: true
  },
  platform: {
    type: String,
    optional: true
  },
  product: {
    type: String,
    optional: true
  },
  productSub: {
    type: String,
    optional: true
  },
  userAgent: {
    type: String,
    optional: true
  },
  vendor: {
    type: String,
    optional: true
  },
  vendorSub: {
    type: String,
    optional: true
  }
});


Collections.events = new Meteor.Collection('events');
Collections.events.attachSchema(Schemas.events);

if (Meteor.isServer) {
  Meteor.methods({
    logEvent: function(event) {
      var ip = this.connection.clientAddress ? this.connection.clientAddress : '127.0.0.1';
      event.ip = ip;
      Collections.events.insert(event);
    }
  });
}
