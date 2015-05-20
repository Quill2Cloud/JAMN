"use strict";

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
  //
});

Controllers.AllSongs = Controllers.Songs.extend({
  onRun: function () {
    Meteor.call('logEvent', getEventData('View', 'viewed all songs'));
  },
  action: function () {
    this.render();
  }
});

Controllers.Song = RouteController.extend({
  //
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
