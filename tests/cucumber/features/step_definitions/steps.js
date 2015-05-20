(function () {

  'use strict';

  module.exports = function () {

    // You can use normal require here, cucumber is NOT run in a Meteor context (by design)
    var url = require('url');

    this.Given(/^I am a new user$/, function () {
      // no callbacks! DDP has been promisified so you can just return it
      return this.mirror.call('reset'); // this.ddp is a connection to the mirror
    });

    this.Given(/^I am not logged in$/, function () {
      return this.mirror.call('log-out');
    });

    this.When(/^I navigate to "([^"]*)"$/, function (relativePath, callback) {
      // WebdriverIO supports Promises/A+ out the box, so you can return that too
      this.browser. // this.browser is a pre-configured WebdriverIO + PhantomJS instance
        url(url.resolve(process.env.ROOT_URL, relativePath)). // process.env.ROOT_URL always points to the mirror
        call(callback);
    });

    this.When(/^I click on the link "([^"]*)"$/, function (element, callback) {
      this.browser.
        click(element).
        call(callback);
    });

    this.Then(/^I should see the title "([^"]*)"$/, function (expectedTitle, callback) {
      // you can use chai-as-promised in step definitions also
      this.browser.
        waitForVisible('body *'). // WebdriverIO chain-able promise magic
        getTitle().should.become(expectedTitle).and.notify(callback);
    });

    this.Then(/^I should see the logo "([^"]*)"$/, function (expectedTitle, callback) {
      // you can use chai-as-promised in step definitions also
      this.browser.
        waitForVisible('.logo'). // WebdriverIO chain-able promise magic
        getText('.logo').should.become(expectedTitle).and.notify(callback);
    });

    this.Then(/^the "([^"]*)" tab is shown$/, function (expectedTab, callback) {
      this.browser.
      waitForVisible('.active').
      getText('.active').should.become(expectedTab).and.notify(callback);
    });

  };

})();
