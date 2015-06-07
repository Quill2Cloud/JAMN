Feature: Display legal notices

  As a new user
  I want to review the privacy policy and terms of use
  So that I know the terms and conditions and how my private information is used

  Test that the pricacy policy and terms and conditions are viewable.

  Background:
    Given I am a new user

  @dev
  Scenario:
    When I navigate to "/privacy-policy"
    Then I should see the headline "Privacy Policy"

  @dev
  Scenario:
    When I navigate to "/terms-and-conditions"
    Then I should see the headline "Terms and Conditions"
