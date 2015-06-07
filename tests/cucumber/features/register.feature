Feature: Register for a user account

  As an anonymous user
  I want to create an account
  So that I can vote, contribute content, and comment on songs and lists

  Test that a user can register for an account and check validation

  Background:
    Given I am not logged in
    And   I navigate to "/register"
    And   there are registered users

  @dev
  Scenario:
    When I navigate to "/register"
    Then the "Register" tab is shown
    And  the "#at-field-username" input field is shown
    And  the "#at-field-email" input field is shown
    And  the "#at-field-password" input field is shown

    @dev
    Scenario:
      When I enter "Tester 1" into the "username" field
      And  "REGISTER NOW!" is disabled

    @dev
    Scenario:
      When I enter "New User" into the "username" field
      And  I enter "testerx" into the "email" field
      And  "REGISTER NOW!" is disabled

    @dev
    Scenario:
      When I enter "New User" into the "username" field
      And  I enter "tester1@" into the "email" field
      And  "REGISTER NOW!" is disabled

    @dev
    Scenario:
      When I enter "New User" into the "username" field
      And  I enter "tester1@j" into the "email" field
      And  "REGISTER NOW!" is disabled

    @dev
    Scenario:
      When I enter "New User" into the "username" field
      And  I enter "tester1@jamn" into the "email" field
      And  "REGISTER NOW!" is disabled

    @dev
    Scenario:
      When I enter "" into the "username" field
      And  I enter "" into the "email" field
      And  I enter "" into the "password" field
      And  I click on the submit button
      Then user validation error message 1 is displayed saying "Required Field"
      Then user validation error message 2 is displayed saying "Required Field"
      Then user validation error message 3 is displayed saying "Required Field"

    @dev
    Scenario:
      When I enter "" into the "username" field
      And  I enter "NewUser@jamn.com" into the "email" field
      And  I enter "password" into the "password" field
      And  I click on the submit button
      Then user validation error message 1 is displayed saying "Required Field"

    @dev
    Scenario:
      When I enter "New User" into the "username" field
      And  I enter "" into the "email" field
      And  I enter "password" into the "password" field
      And  I click on the submit button
      Then user validation error message 2 is displayed saying "Required Field"

    @dev
    Scenario:
      When I enter "New User" into the "username" field
      And  I enter "NewUser@jamn.com" into the "email" field
      And  I enter "" into the "password" field
      And  I click on the submit button
      Then user validation error message 3 is displayed saying "Required Field"

    @dev
    Scenario:
      When I click on the link "*=Privacy"
      Then I should see the headline "Privacy Policy"

    @dev
    Scenario:
      When I click on the link "*=Terms"
      Then I should see the headline "Terms and Conditions"

    @dev
    Scenario:
      When I click on the link "#at-signIn"
      Then the "Sign In" tab is shown

    @dev
    Scenario:
      When I enter "New User" into the "username" field
      And  I enter "NewUser@jamn.com" into the "email" field
      And  I enter "password" into the "password" field
      And  I submit the form "#at-pwd-form"
      Then the "Songs" tab is shown
      And  the menu item "#user-menu-username" is shown and displays "New User" in the navigation bar
