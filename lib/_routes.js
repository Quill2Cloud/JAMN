// By default the router will look for the class case name of the template,
// change the behaviour so it does not convert the template names
Router.setTemplateNameConverter(function (str) { return str; });

// Set default options for the router
Router.configure({
  layoutTemplate: '_layout',
  loadingTemplate: '_loading',
  notFoundTemplate: '_404'
});

SongsController = RouteController.extend({
  //
});

AllSongs = SongsController.extend({
  action: function () {
    this.render();
  }
});

Router.map(function(){
  this.route('/', {name: 'home', template: 'songs',controller: AllSongs});
});
