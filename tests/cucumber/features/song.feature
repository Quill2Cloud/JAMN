Feature: Show a single songs that have been shared

  As an anonymous user
  I want to browse the music, comments and lists for a song
  So that I can find content for songs that I am interested in

  Test that the song page loads and each of the sections display correctly

  Background:
    Given I am not logged in
    And   there are registered users
    And   there are submitted songs

  @dev
  Scenario:
    When I navigate to "/songs/no-artist/no-title"
    Then an "info" message is displayed saying "Sorry, couldn't find the song you were looking for."

  @dev
  Scenario:
    When I navigate to "/songs/artist/title"
    Then the "Music" tab is shown
    And  the song title is "Artist - Title"
    And  the song username is "Tester 1"
    And  the posted date is time since "2015-02-02T03:16:26.775Z"
    And  the "#music-count" field is shown and displays "0"
    And  the "#comment-count" field is shown and displays "0"
    And  the "#list-count" field is shown and displays "0"
    And  the ".avatar" field is shown and displays "T1"

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
    When I navigate to "/songs/artist/title/comments"
    And  I click on the link "#music-tab"
    Then the "Music" tab is shown

  @dev
  Scenario:
    When I navigate to "/songs/artist/title/music"
    And I click on the link "#comments-tab"
    Then the "Comments" tab is shown

  @dev
  Scenario:
    When I navigate to "/songs/artist/title/comments"
    And I click on the link "#lists-tab"
    Then the "Lists" tab is shown

  @dev
  Scenario:
    When I navigate to "/songs/artist/title/lists"
    And  I click on the link "#lists-add-tab"
    Then the "Add to List" tab is shown
