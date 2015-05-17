BrowserPolicy.framing.disallow();
BrowserPolicy.content.disallowInlineScripts();
BrowserPolicy.content.disallowEval();
BrowserPolicy.content.allowInlineStyles();
BrowserPolicy.content.allowFontDataUrl();

var trusted = [
  'http://www.google-analytics.com',
  'https://d37gvrvc0wt4s1.cloudfront.net', //rollbar
  'http://d37gvrvc0wt4s1.cloudfront.net', //rollbar
  'http://d1l6p2sc9645hc.cloudfront.net',
  'http://d36lvucg9kzous.cloudfront.net',
  'http://cdn.inspectlet.com',
  'http://hn.inspectlet.com',
  'http://heapanalytics.com',
  'http://cdn.mouseflow.com',
  'https://n2.mouseflow.com',
  'http://www.navilytics.com'
];

_.each(trusted, function(origin) {
  BrowserPolicy.content.allowOriginForAll(origin);
});
