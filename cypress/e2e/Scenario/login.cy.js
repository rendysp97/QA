describe(" Scenario Orange HRM Login ", () => {
  it("TC001- Login dengan username dan password valid ", () => {
    cy.intercept("POST", "**/auth/validate").as("login");

    cy.login("Admin", "admin123");

    cy.wait("@login").then((interception) => {
      const parsed = new URLSearchParams(interception.request.body);
      expect(parsed.get("username")).to.eq("Admin");
      expect(parsed.get("password")).to.eq("admin123");
      expect(parsed.get("_token")).to.exist;
      expect(interception.response.statusCode).to.eq(302);
    });

    cy.url().should("include", "/dashboard");
  });

  it("TC002-Login tanpa input username dan password", () => {
    cy.intercept("GET", "**/core/i18n/messages").as("login");

    cy.visit("https://opensource-demo.orangehrmlive.com/");

    cy.empty();

    cy.wait("@login").then((intercept) => {
      expect(intercept.response.statusCode).to.eq(200);
    });
  });

  it("TC003-Login dengan password salah tetapi username valid", () => {
    cy.intercept("POST", "**/auth/validate").as("login");
    cy.login("Admin", "admin12");

    cy.wait("@login").then((interception) => {
      const parsed = new URLSearchParams(interception.request.body);
      expect(parsed.get("username")).to.eq("Admin");
      expect(parsed.get("password")).to.eq("admin12");
      expect(parsed.get("_token")).to.exist;
      expect(interception.response.statusCode).to.eq(302);
    });

    cy.get(".oxd-alert-content-text").should("contain", "Invalid credentials");
  });

  it("TC004-Login dengan username salah tetapi password valid", () => {
    cy.intercept("POST", "**/auth/validate").as("login");
    cy.login("Admin12", "admin123");
    cy.wait("@login").then((interception) => {
      const parsed = new URLSearchParams(interception.request.body);
      expect(parsed.get("username")).to.eq("Admin12");
      expect(parsed.get("password")).to.eq("admin123");
      expect(parsed.get("_token")).to.exist;
      expect(interception.response.statusCode).to.eq(302);
    });

    cy.get(".oxd-alert-content-text").should("contain", "Invalid credentials");
  });

  it("TC005- Redirect ke halaman forgot password", () => {
    cy.intercept("GET", "**/auth/requestPasswordResetCode").as("forgot");

    cy.forgot();

    cy.wait("@forgot").then((res) => {
      expect(res.response.statusCode).to.eq(200);
    });

    cy.get(".orangehrm-forgot-password-title")
      .should("be.visible")
      .and("contain", "Reset Password");
  });
});

describe("Scenario Orange HRM Forgot", () => {
  it("TC-001 - Reset Password dengan username Kosong", () => {
    cy.intercept("GET", "**/auth/requestPasswordResetCode").as("forgot");

    cy.forgot();

    cy.wait("@forgot").then((res) => {
      expect(res.response.statusCode).to.eq(200);
    });

    cy.empty();
  });

  it("TC-002 - Reset Password Success", () => {
    cy.intercept("GET", "**/auth/sendPasswordReset").as("forgot");

    cy.forgot();
    cy.get('input[name="username"]').type("Admin");

    cy.get('button[type="submit"]').click();

    cy.wait("@forgot").then((res) => {
      expect(res.response.statusCode).to.eq(200);
    });

    cy.get(".orangehrm-forgot-password-title").should(
      "contain",
      "Reset Password link sent successfully"
    );
  });

  it("TC-003 - Cancel klik redirect ke login", () => {
    cy.intercept("GET", "**/auth/login").as("forgot");
    cy.forgot();
    cy.get(".orangehrm-forgot-password-button--cancel").click();
    cy.wait("@forgot").then((res) => {
      expect(res.response.statusCode).to.eq(200);
    });
    cy.url().should("include", "https://opensource-demo.orangehrmlive.com/");
  });
});

describe("Scenario Orange HRM Footer Social", () => {
  it("TC-001 - LinkedIn - Link mengarah ke LinkedIn OrangeHRM", () => {
    cy.intercept("GET", "https://www.linkedin.com/company/orangehrm/**").as(
      "linkedin"
    );
    cy.social(
      "https://www.linkedin.com/company/orangehrm/mycompany/",
      "linkedin.com/company/orangehrm"
    );
    cy.wait("@linkedin").its("response.statusCode").should("eq", 301);
  });
});
