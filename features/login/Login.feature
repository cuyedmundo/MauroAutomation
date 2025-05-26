Feature: OrangeHRM Login

  Scenario: Successful login with valid credentials
    Given the user is on the login page
    When the user logs in with the stored user "Admin"
    Then the header should be displayed

  Scenario: try login with wrong credentials
    Given the user is on the login page
    When the user logs in with username "<username>" and password "<password>"
    Then the login page display a login error

    Examples:
      | username          | password   |
      | WrongUser         | WrongPassw |
      | invalid@email.com | 123456     |
