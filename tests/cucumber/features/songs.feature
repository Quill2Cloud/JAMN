Feature: Show songs that have been shared

  As an anonymous user
  I want to browse songs that have been shared
  So that I can find music, videos and comments

  Test that the songs page loads with the list of songs

  Background:
    Given I am not logged in

  @dev
  Scenario:
    When I navigate to "/"
    Then the "Songs" tab is shown

  @dev
  Scenario:
    When I navigate to "/songs"
    Then the "Songs" tab is shown
