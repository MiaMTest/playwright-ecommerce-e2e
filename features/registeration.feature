# language: en

Feature: User registration
  As a new customer
  I want to create an account
  So that I can access the e-commerce portal

  Background:
    Given I am on the registration page

  Scenario Outline: Registration attempts with valid and invalid data
    When I fill the registration form with the following details:
      | firstName   | <firstName>   |
      | lastName    | <lastName>    |
      | emailPrefix | <emailPrefix> |
      | phone       | <phone>       |
      | occupation  | <occupation>  |
      | gender      | <gender>      |
      | password    | <password>    |
    And I click the Register button
    Then I should see the result message "<expectedMessage>"

    Examples:
      | testName                                  | firstName | lastName | emailPrefix | phone       | occupation | gender | password     | expectedMessage                     |
      | successful Registration                   | Alice     | Hanks    | aliceH      | 4445556666  | Engineer   | Male   | 111Oooo!     | Account Created Successfully       |
      | Missing last name input Alert            | Tom       |          | tomH        | 4445556666  | Scientist  | Female | 111Oooo!     | Last name is required!             |
