const { before } = require("dom/lib/mutation");

const errorMessages = {
  email:"Geçerli bir email adresi giriniz.",
  password:" En az 8 karakter giriniz.En az 1 büyük harf, küçük harf, sembol ve rakam içermelidir.",
  terms:"Giriş yapabilmek için lütfen şartları kabul edin."
}
describe("Login Page", () => {
  
  describe("Error Messages", () => {
    beforeEach(()=> {
      it("terms throws error if it is not selected", () => {
      cy.visit('http://localhost:5173/');
      cy.get('[data-cy="register-button"]').should('be.disabled');
      cy.get('[data-cy="register-button"]').click().should('not.be.enabled'); 
    })})
    it("email input throws error for invalid email", () => {
      cy.visit('http://localhost:5173/');
      cy.get('[data-cy="email-input"]').type("go");
      cy.contains(errorMessages.email).should("be.visible");
    });
    it("password input throws error for invalid password", () => {
      cy.visit('http://localhost:5173/');
      cy.get('[data-cy="password-input"]').type("1234");
      cy.contains(errorMessages.password).should("be.visible");
    });
  });
  describe("Submit Success", () => {
    it("inputs are true", () => {
      cy.visit('http://localhost:5173/');
      cy.get('[data-cy="email-input"]').type("gokce@gmail.com");
      cy.get('[data-cy="password-input"]').type("Gokce123!");
      cy.get('[data-cy="terms-input"]').click();
      cy.get('[data-cy="register-button"]').should('not.be.disabled');
      cy.get('[data-cy="register-button"]').click()
      cy.url().should('include', '/success');
    });
   
  });
  describe("Terms Select", () => {
    it("inputs are true but term is not selected", () => {
      cy.visit('http://localhost:5173/');
      cy.get('[data-cy="email-input"]').type("gokce@gmail.com");
      cy.get('[data-cy="password-input"]').type("Gokce123!");
      cy.get('[data-cy="register-button"]').should('be.disabled');
    });
   
  });

});