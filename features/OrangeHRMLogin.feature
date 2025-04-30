Feature: OrangeHRM Login 

  Scenario: Successful login with valid credentials
    Given the user is on the OrangeHRM login page
    When the user logs in with valid credentials
    Then the dashboard page should be displayed
