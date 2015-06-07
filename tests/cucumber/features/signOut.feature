Feature: Sign out

  As a registered user
  I want to sign out
  So that other users on the computer cannot access my account

  Test that a user can sign out

  Background:
    Given there are registered users
    And   I am logged in as "Tester 1"

  @dev
  Scenario:
    When I navigate to "/sign-out"
    Then the "Songs" tab is shown
    And  the menu item "#user-menu-register" is shown and displays "Register" in the navigation bar
    And  the menu item "#user-menu-sign-in" is shown and displays "Sign In" in the navigation bar

  @dev
  Scenario:
    When I click on the link "#user-menu-username"
    And  I click on the link "#user-menu-sign-out"
    Then the "Songs" tab is shown
    And  the menu item "#user-menu-register" is shown and displays "Register" in the navigation bar
    And  the menu item "#user-menu-sign-in" is shown and displays "Sign In" in the navigation bar
