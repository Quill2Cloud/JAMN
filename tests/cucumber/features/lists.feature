Feature: Show lists that have been shared

  As an anonymous user
  I want to browse lists that have been shared
  So that I can find music, videos and comments

  Test that the lists page loads with the lists

  Background:
    Given I am not logged in

  @dev
  Scenario:
    When I navigate to "/lists"
    Then the "Lists" tab is shown
