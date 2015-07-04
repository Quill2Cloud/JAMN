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

  @dev
  Scenario:
    When there are 0 songs
    Then an "info" message is displayed saying "Sorry, no songs found."

  @dev
  Scenario:
    Given there are submitted songs
    Then the song title is "Artist - Title"
