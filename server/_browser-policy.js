BrowserPolicy.framing.disallow();
BrowserPolicy.content.disallowInlineScripts();
BrowserPolicy.content.disallowEval();
BrowserPolicy.content.allowInlineStyles();
BrowserPolicy.content.allowFontDataUrl();

var trusted = [
  'http://www.google-analytics.com',
  'http://www.navilytics.com'
];

_.each(trusted, function(origin) {
  BrowserPolicy.content.allowOriginForAll(origin);
});
