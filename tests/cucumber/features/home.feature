Feature: Navigate to home page

  As a new user
  I want navigate to the home page
  So that I can browse the content of the site

  Test that the site is working and iron router is displaying the correct page.

  Background:
    Given I am a new user

  @dev
  Scenario:
    When I navigate to "/"
    Then I should see the title "JAM'N!"
