Feature: Forgot Password

  As a registered user
  I want to recover my password
  So that I can log in and access my account if I forgot my password

  TODO: Test that a user can recover their password

  @dev
  Scenario:
    When I navigate to "/forgot-password"
    Then the "Forgot Password" tab is shown
    And  the "#at-field-email" input field is shown
