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
  action: function () {
    this.render();
  }
});

Controllers.Lists = RouteController.extend({
  //
});

Controllers.AllLists = Controllers.Lists.extend({
  action: function () {
    this.render();
  }
});

Router.map(function(){
  this.route('/', {name: 'home', template: 'songs',controller: Controllers.AllSongs});
  this.route('/songs', {name: 'songs', template: 'songs', controller: Controllers.AllSongs});
  this.route('/lists', {name: 'lists',template: 'lists',controller: Controllers.AllLists});
});
