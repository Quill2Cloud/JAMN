(function () {

  'use strict';

  Meteor.methods({
    'reset' : function () {
      Collections.events.remove({});
      Collections.songs.remove({});
    },
    'log-out': function () {
      //
    },
    'insertUsers': function () {
      Meteor.users.remove({});
      _.each(users, function (user) {
        Meteor.users.insert(user);
      });
    },
    'insertSongs': function (number) {
      Collections.songs.remove({});
      _.times(number, function (n) {
        Collections.songs.insert(songs[n]);
      });
    }
  });

  var users = [
    {
      "_id" : "2ZyzagoaDjsbd9q6Y",
      "createdAt" : "2015-01-31T07:02:47.625Z",
      "services" : {
          "password" : {
              "bcrypt" : "$2a$10$NXm4uqlV6uJw.lYIDKPrH.RaQhrYOx.c6vKDybAu5MmQiHcssiTBO"
          },
          "resume" : {
              "loginTokens" : []
          }
      },
      "username" : "Tester 1",
      "emails" : [
          {
              "address" : "tester1@jamn.com",
              "verified" : false
          }
      ],
      "profile" : {
        "slug" : "tester-1",
        "color" : "#009688"
      }
    }
  ];

  var songs = [
    {
      "_id" : "4m5e5wuZGmXrmbnkF",
      "createdAt" : "2015-02-02T03:16:26.775Z",
      "createdBy" : "2ZyzagoaDjsbd9q6Y",
      "artist" : "Artist",
      "artistSlug" : "artist",
      "title" : "Title",
      "titleSlug" : "title",
      "upvoters" : ["2ZyzagoaDjsbd9q6Y"],
      "music" : [],
      "commentCount" : 0,
      "publicLists" : []
    }
  ];

})();
