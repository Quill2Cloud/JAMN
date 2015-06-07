Feature: Sign in

  As an anonymous user
  I want to sign in
  So that I can vote, contribute content, and comment on songs and lists

  Test that a user can sign in and check validation

  Background:
    Given I am not logged in
    And   there are registered users

  @dev
  Scenario:
    When I navigate to "/sign-in"
    Then the "Sign In" tab is shown
    And  the "#at-field-username_and_email" input field is shown
    And  the "#at-field-password" input field is shown

  @dev
  Scenario:
    When I enter "Incorrect user" into the "username_and_email" field
    And  I enter "password" into the "password" field
    And  I submit the form "#at-pwd-form"
    Then the user accounts error message is displayed saying "User not found"

  @dev
  Scenario:
    When I enter "Tester 1" into the "username_and_email" field
    And  I enter "Incorrect password" into the "password" field
    And  I submit the form "#at-pwd-form"
    Then the user accounts error message is displayed saying "Incorrect password"

  @dev
  Scenario:
    When I enter "Tester 1" into the "username_and_email" field
    And  I enter "password" into the "password" field
    And  I submit the form "#at-pwd-form"
    Then the "Songs" tab is shown
    And  the menu item "#user-menu-username" is shown and displays "Tester 1" in the navigation bar
