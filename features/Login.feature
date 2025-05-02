Feature: OrangeHRM Login

  Scenario: Successful login with specific credentials
    Given the user is on the OrangeHRM login page
    When the user logs in with username "Admin" and password "admin123"
    Then the dashboard page should be displayed
