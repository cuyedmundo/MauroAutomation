Feature: OrangeHRM Login

  Scenario: Successful login with specific credentials
    Given the user is on the OrangeHRM login page
    When the user logs in with username "env:ADMIN_USER" and password "env:ADMIN_PASS"
    Then the dashboard page should be displayed
