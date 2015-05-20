Feature: Show a single songs that have been shared

  As an anonymous user
  I want to browse the music, comments and lists for a song
  So that I can find content for songs that I am interested in

  Test that the song page loads and each of the sections display correctly

  Background:
    Given I am not logged in

  @dev
  Scenario:
    When I navigate to "/songs/artist/title"
    Then the "Music" tab is shown

  @dev
  Scenario:
    When I navigate to "/songs/artist/title/music"
    Then the "Music" tab is shown

  @dev
  Scenario:
    When I navigate to "/songs/artist/title/comments"
    Then the "Comments" tab is shown

  @dev
  Scenario:
    When I navigate to "/songs/artist/title/lists"
    Then the "Lists" tab is shown

  @dev
  Scenario:
    When I navigate to "/songs/artist/title/lists/add"
    Then the "Add to List" tab is shown

  @dev
  Scenario:
    When I click on the link "#music-tab"
    Then the "Music" tab is shown

  @dev
  Scenario:
    When I click on the link "#comments-tab"
    Then the "Comments" tab is shown

  @dev
  Scenario:
    When I click on the link "#lists-tab"
    Then the "Lists" tab is shown

  @dev
  Scenario:
    When I click on the link "#lists-add-tab"
    Then the "Add to List" tab is shown
