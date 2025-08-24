describe(" Scenario Orange HRM Login ", () => {
  it("TC001- Login dengan username dan password valid ", () => {
    cy.login("Admin", "admin123");

    cy.url().should("include", "/dashboard");
  });

  it("TC002-Login tanpa input username dan password", () => {
    cy.visit("https://opensource-demo.orangehrmlive.com/");
    cy.empty();
  });

  it("TC003-Login dengan password salah tetapi username valid", () => {
    cy.login("Admin", "admin12");
    cy.get(".oxd-alert-content-text").should("contain", "Invalid credentials");
  });

  it("TC004-Login dengan username salah tetapi password valid", () => {
    cy.login("Admin12", "admin123");

    cy.get(".oxd-alert-content-text").should("contain", "Invalid credentials");
  });

  it("TC005- Redirect ke halaman forgot password", () => {
    cy.forgot();

    cy.get(".orangehrm-forgot-password-title").should(
      "contain",
      "Reset Password"
    );
  });
});

describe("Scenario Orange HRM Forgot", () => {
  it("TC-001 - Reset Password dengan username Kosong", () => {
    cy.forgot();
    cy.empty();
  });

  it("TC-002 - Reset Password Success", () => {
    cy.forgot();
    cy.get('input[name="username"]').type("Admin");

    cy.get('button[type="submit"]').click();

    cy.get(".orangehrm-forgot-password-title").should(
      "contain",
      "Reset Password link sent successfully"
    );
  });

  it("TC-003 - Cancel klik redirect ke login", () => {
    cy.forgot();
    cy.get(".orangehrm-forgot-password-button--cancel").click();
    cy.url().should("include", "https://opensource-demo.orangehrmlive.com/");
  });
});

describe("Scenario Orange HRM Footer Social", () => {
  it("TC-001 - LinkedIn - Link mengarah ke LinkedIn OrangeHRM", () => {
    cy.social(
      "https://www.linkedin.com/company/orangehrm/mycompany/",
      "linkedin.com/company/orangehrm"
    );
  });
});
