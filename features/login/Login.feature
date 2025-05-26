Feature: OrangeHRM Login

  Scenario: Successful login with valid credentials
    Given the user is on the login page
    When the user logs in with the stored user "Admin"
    Then the dashboard page should be displayed


  Scenario: try login with wrong credentials
    Given the user is on the login page
    When the user logs in with username "WrongUser" and password "WrongPassw"
    Then the login page display a login error
  
