class LoginObj {
  //visit

  visitPage() {
    cy.visit("https://opensource-demo.orangehrmlive.com/");
  }

  //input

  inputUsername(username) {
    cy.get('input[name="username"]').type(username);
  }

  inputPassword(password) {
    cy.get('input[name="password"]').type(password);
  }

  //click

  clickButton() {
    cy.get('button[type="submit"]').click();
  }

  //intercept - verify

  interceptStatus() {
    cy.intercept("POST", "**/auth/validate").as("login");
  }

  verifyintercept(username, password) {
    cy.wait("@login").then((interception) => {
      const parsed = new URLSearchParams(interception.request.body);
      expect(parsed.get("username")).to.eq(username);
      expect(parsed.get("password")).to.eq(password);
      expect(parsed.get("_token")).to.exist;
      expect(interception.response.statusCode).to.eq(302);
    });
  }

  interceptStatusEmpty() {
    cy.intercept("GET", "**/core/i18n/messages").as("login");
  }

  verifyInterceptStatusEmpty() {
    cy.wait("@login").then((intercept) => {
      expect(intercept.response.statusCode).to.eq(200);
    });
  }

  interceptForgot() {
    cy.intercept("GET", "**/auth/requestPasswordResetCode").as("forgot");
  }

  verifyinterceptForgot() {
    cy.wait("@forgot").then((res) => {
      expect(res.response.statusCode).to.eq(200);
    });
  }

  //status

  statusError() {
    cy.get(".oxd-input-field-error-message")
      .should("be.visible")
      .and("contain", "Required");
  }

  statusErrorInvalid() {
    cy.get(".oxd-alert-content-text").should("contain", "Invalid credentials");
  }

  statusForgot() {
    cy.get(".orangehrm-forgot-password-title")
      .should("be.visible")
      .and("contain", "Reset Password");
  }

  //assert

  assert() {
    cy.url().should("include", "/dashboard");
  }

  assert_forgot() {
    cy.url().should("include", "/requestPasswordResetCode");
  }

  //forgot

  contain_forgot() {
    cy.contains("Forgot your password? ").click();
  }
}

export default new LoginObj();
