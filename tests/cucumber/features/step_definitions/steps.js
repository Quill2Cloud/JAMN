(function () {

  'use strict';

  module.exports = function () {

    // You can use normal require here, cucumber is NOT run in a Meteor context (by design)
    var url = require('url');

    this.Given(/^I am a new user$/, function () {
      // no callbacks! DDP has been promisified so you can just return it
      return this.mirror.call('reset'); // this.ddp is a connection to the mirror
    });

    this.Given(/^I am not logged in$/, function (callback) {
      function logout(done) { Meteor.logout(done); }
      this.browser.
      executeAsync(logout).call(callback);
    });

    this.Given(/^I am logged in as "([^"]*)"$/, function (username, callback) {
      function login(username, done) { Meteor.loginWithPassword(username, "password", done); }
      this.browser.executeAsync(login, username).call(callback);
    });

    this.Given(/^there are registered users$/, function () {
      return this.mirror.call('insertUsers');
    });

    this.Given(/^there are submitted songs$/, function () {
      return this.mirror.call('insertSongs', 1);
    });

    this.When(/^I navigate to "([^"]*)"$/, function (relativePath, callback) {
      // WebdriverIO supports Promises/A+ out the box, so you can return that too
      this.browser. // this.browser is a pre-configured WebdriverIO + PhantomJS instance
        url(url.resolve(process.env.ROOT_URL, relativePath)). // process.env.ROOT_URL always points to the mirror
        call(callback);
    });

    this.When(/^I click on the link "([^"]*)"$/, function (element, callback) {
      this.browser.
      waitForExist(element).
        click(element).
        call(callback);
    });

    this.When(/^I click on the submit button$/, function (callback) {
      this.browser.
        click('.submit').
        call(callback);
    });

    this.When(/^I submit the form "([^"]*)"$/, function (form, callback) {
      this.browser.
        submitForm(form).
        pause(1000).
        call(callback);
    });

    this.When(/^I enter "([^"]*)" into the "([^"]*)" field$/, function (value, field, callback) {
      this.browser.
        setValue('#at-field-'+field, value).
        call(callback);
    });

    this.When(/^there are (\d+) songs$/, function (number) {
      return this.mirror.call('insertSongs', number);
    });

    this.Then(/^I should see the title "([^"]*)"$/, function (expectedTitle, callback) {
      // you can use chai-as-promised in step definitions also
      this.browser.
        waitForVisible('body *'). // WebdriverIO chain-able promise magic
        getTitle().should.become(expectedTitle).and.notify(callback);
    });

    this.Then(/^I should see the logo "([^"]*)"$/, function (expectedTitle, callback) {
      this.browser.
        waitForVisible('.logo').
        getText('.logo').should.become(expectedTitle).and.notify(callback);
    });

    this.Then(/^I should see the headline "([^"]*)"$/, function (expectedHeadline, callback) {
      this.browser.
        waitForVisible('.logo').
        getText('.headline').should.become(expectedHeadline).and.notify(callback);
    });

    this.Then(/^the "([^"]*)" tab is shown$/, function (expectedTab, callback) {
      this.browser.
      getText('.active').should.become(expectedTab).and.notify(callback);
    });

    this.Then(/^an "([^"]*)" message is displayed saying "([^"]*)"$/, function (expectedIcon, expectedMessage, callback) {
      this.browser.
      // TODO: validate it is the correct icon
      isVisible('#message-icon').
      getText('#message-text').should.become(expectedMessage).and.notify(callback);
    });

    this.Then(/^the "([^"]*)" input field is shown$/, function (field, callback) {
      this.browser.
        waitForVisible(field).
        getValue(field).should.become('').and.notify(callback);
    });

    this.Then(/^"([^"]*)" is disabled$/, function (expectedDisabledElement, callback) {
      this.browser.
      pause(1000).
      waitForVisible('.disabled').
        getText('.disabled').should.become(expectedDisabledElement).and.notify(callback);
    });

    this.Then(/^user validation error message (\d+) is displayed saying "([^"]*)"$/, function (expectedMessage, expectedError, callback) {
      this.browser.getText('//HTML/BODY/DIV[1]/DIV[1]/DIV[1]/DIV[1]/FORM[1]/FIELDSET[1]/DIV['+expectedMessage+']/SPAN[2]')
      .should.become(expectedError).and.notify(callback);
    });

    this.Then(/^the user accounts error message is displayed saying "([^"]*)"$/, function (expectedError, callback) {
      this.browser.
      getText('.at-error').should.become(expectedError).and.notify(callback);
    });

    this.Then(/^the menu item "([^"]*)" is shown and displays "([^"]*)" in the navigation bar$/, function (expectedMenuItem, expectedMenuValue, callback) {
      this.browser.
        getText(expectedMenuItem).should.become(expectedMenuValue).and.notify(callback);
    });

    this.Then(/^the song title is "([^"]*)"$/, function (expectedTitle, callback) {
      this.browser.
      getText('#song-title').should.become(expectedTitle).and.notify(callback);
    });

    this.Then(/^the song username is "([^"]*)"$/, function (expectedUsername, callback) {
      this.browser.
      getText('.username').should.become(expectedUsername).and.notify(callback);
    });

    this.Then(/^the posted date is time since "([^"]*)"$/, function (datetime, callback) {
      this.client.executeAsync(function(datetime, done){
        setTimeout(function(){
          var timeAgo = 'posted ' + moment(datetime).fromNow();
          done(timeAgo);
        }, 3000);
      }, datetime, function(err, result) {
        browser.getText('.posted-time').should.become(result.value).and.notify(callback);
      });
    });

    this.Then(/^the "([^"]*)" field is shown and displays "([^"]*)"$/, function (expectedField, expectedValue, callback) {
      this.browser.
      waitForVisible(expectedField).
      getText(expectedField).should.become(expectedValue).and.notify(callback);
    });

  };

})();
