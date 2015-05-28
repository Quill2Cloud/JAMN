"use strict";

// Use SubsManager to optimize subscriptions
var mainSubs = new SubsManager({cacheLimit: 9999, expireIn: 9999});
var tempSubs = new SubsManager({cacheLimit: 50, expireIn: 30});

// By default the router will look for the class case name of the template,
// change the behaviour so it does not convert the template names
Router.setTemplateNameConverter(function (str) { return str; });

// Set default options for the router
Router.configure({
  layoutTemplate: '_layout',
  loadingTemplate: '_loading',
  notFoundTemplate: '_404'
});

Controllers.Songs = RouteController.extend({
  waitOn: function () {
    return [
      mainSubs.subscribe('songs')
    ];
  },
  data: function () {
    var results = Collections.songs.find(this.selector(), getOptions()).fetch();
    if (results && results.length > 0) {
      results.map(function(song, rank) {
        song.rank = rank;
        return song;
      });
      Session.set('searchResults',results.length);
    } else {
      Session.set('searchResults',0);
    }
    return { songs: results };
  },
  onStop: function () {
    clearMessage();
  }
});

Controllers.AllSongs = Controllers.Songs.extend({
  selector: function() {
    var selector = {};
    return selector;
  },
  onRun: function () {
    Meteor.call('logEvent', getEventData('View', 'viewed all songs'));
  },
  action: function () {
    if (Session.get('searchResults') === 0) {
      setMessage("secondary", "info", false, "Sorry, no songs found.", "All Songs", "/");
      Meteor.call('logEvent', getEventData('Message', 'found no songs'));
    }
    this.render();
  }
});

Controllers.Song = RouteController.extend({
  waitOn: function () {
    return [
      mainSubs.subscribe('songs')
    ];
  },
  data: function() {
    var selector = {
      $and: [
        {artistSlug: this.params.artistSlug},
        {titleSlug: this.params.titleSlug}
      ]
    };
    var result = Collections.songs.findOne(selector);
    if (result) {
      Session.set('searchResults',1);
    } else {
      Session.set('searchResults',0);
    }
    return result;
  },
  onBeforeAction: function () {
    if (Session.get('searchResults') === 0) {
      setMessage("primary", "info", false, "Sorry, couldn't find the song you were looking for.", "All Songs", "/");
      Meteor.call('logEvent', getEventData('Message', 'could not find song'));
    }
    this.next();
    //this.render();
  }
});

Controllers.SongMusic = Controllers.Song.extend({
  onRun: function() {
    var properties = { artistSlug: this.params.artistSlug, titleSlug: this.params.titleSlug};
    Meteor.call('logEvent', getEventData('View', 'viewed the song ' + this.params.artistSlug + ' ' + this.params.titleSlug, properties));
  },
  action: function () {
    this.render();
    Template.song.rendered = function(){
      $('#tabs a[href="#music"]').tab('show');
    };
  },
  onAfterAction: function() {
    $('#tabs a[href="#music"]').tab('show');
  }
});

Controllers.SongComments = Controllers.Song.extend({
  onRun: function() {
    var properties = { artistSlug: this.params.artistSlug, titleSlug: this.params.titleSlug};
    Meteor.call('logEvent', getEventData('View', 'viewed comments for the song ' + this.params.artistSlug + ' ' + this.params.titleSlug, properties));
  },
  action: function () {
    this.render();
    Template.song.rendered = function(){
      $('#tabs a[href="#comments"]').tab('show');
    };
  },
  onAfterAction: function() {
    $('#tabs a[href="#comments"]').tab('show');
  }
});

Controllers.SongLists = Controllers.Song.extend({
  onRun: function() {
    var properties = { artistSlug: this.params.artistSlug, titleSlug: this.params.titleSlug};
    Meteor.call('logEvent', getEventData('View', 'viewed the lists for the song ' + this.params.artistSlug + ' ' + this.params.titleSlug, properties));
  },
  action: function () {
    this.render();
    Template.song.rendered = function(){
      $('#tabs a[href="#lists"]').tab('show');
    };
  },
  onAfterAction: function() {
    $('#tabs a[href="#lists"]').tab('show');
  }
});

Controllers.SongAddToList = Controllers.Song.extend({
  onRun: function() {
    var properties = { artistSlug: this.params.artistSlug, titleSlug: this.params.titleSlug};
    Meteor.call('logEvent', getEventData('View', 'viewed possible lists for the song ' + this.params.artistSlug + ' ' + this.params.titleSlug, properties));
  },
  action: function () {
    this.render();
    Template.song.rendered = function(){
      $('#tabs a[href="#lists-add"]').tab('show');
    };
  },
  onAfterAction: function() {
    $('#tabs a[href="#lists-add"]').tab('show');
  }
});

Controllers.Lists = RouteController.extend({
  //
});

Controllers.AllLists = Controllers.Lists.extend({
  onRun: function() {
    Meteor.call('logEvent', getEventData('View', 'viewed all lists'));
  },
  action: function () {
    this.render();
  }
});

Router.map(function(){
  this.route('/', {name: 'home', template: 'songs',controller: Controllers.AllSongs});

  this.route('/songs', {name: 'songs', template: 'songs', controller: Controllers.AllSongs});
  this.route('/songs/:artistSlug/:titleSlug', {name: 'song', template: 'song', controller: Controllers.SongMusic});
  this.route('/songs/:artistSlug/:titleSlug/music', {name: 'song-music', template: 'song', controller: Controllers.SongMusic});
  this.route('/songs/:artistSlug/:titleSlug/comments', {name: 'song-comments', template: 'song', controller: Controllers.SongComments});
  this.route('/songs/:artistSlug/:titleSlug/lists', {name: 'song-lists', template: 'song', controller: Controllers.SongLists});
  this.route('/songs/:artistSlug/:titleSlug/lists/add', {name: 'song-lists-add', template: 'song', controller: Controllers.SongAddToList});

  this.route('/lists', {name: 'lists',template: 'lists',controller: Controllers.AllLists});
});
