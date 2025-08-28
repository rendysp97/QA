describe("Request Api", () => {
  it("TC-001 Get All List User", () => {
    cy.request("GET", "users?page=2").then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).not.to.be.null;
      expect(res.body).to.have.property("data");
      expect(res.body.data).to.be.an("array");

      res.body.data.forEach((user) => {
        expect(user).to.have.property("email");

        if (user.email !== null) {
          expect(user.email).to.contain("@");
          expect(user.first_name).to.be.an("string");
          expect(user.last_name).to.be.an("string");
          expect(user.avatar).to.be.an("string");
        }
      });
    });
  });

  it("TC-002 Get Single User", () => {
    cy.request({
      method: "GET",
      url: "users/2",
      headers: {
        "x-api-key": Cypress.env("API_KEY"),
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("data");
      expect(res.body).not.to.be.null;
      expect(res.body.data).have.property("id");
      expect(res.body.data.id).to.be.an("Number");
    });
  });

  it("TC-003 Create User", () => {
    cy.request({
      url: "/users",
      method: "POST",
      body: {
        name: "morpheus",
        job: "leader",
      },
      headers: {
        "x-api-key": Cypress.env("API_KEY"),
      },
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.have.property("name");
      expect(res.body).to.have.property("job");
      expect(res.body).to.have.property("createdAt");

      expect(res.body.name).to.eq(res.body.name);
      expect(res.body.job).to.eq(res.body.job);

      expect(res.body.name).not.to.be.null;
      expect(res.body.job).not.to.be.null;
    });
  });

  it("TC-004 Update User Put", () => {
    cy.request({
      url: "/users/2",
      method: "PUT",
      body: {
        name: "morpheus",
        job: "leader",
      },
      headers: {
        "x-api-key": Cypress.env("API_KEY"),
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("name");
      expect(res.body).to.have.property("job");
      expect(res.body).to.have.property("updatedAt");

      expect(res.body.name).to.eq(res.body.name);
      expect(res.body.job).to.eq(res.body.job);

      expect(res.body.name).not.to.be.null;
      expect(res.body.job).not.to.be.null;
    });
  });

  it("TC-005 Update User Patch", () => {
    cy.request({
      url: "/users/2",
      method: "PUT",
      body: {
        name: "morpheus",
        job: "leader",
      },
      headers: {
        "x-api-key": Cypress.env("API_KEY"),
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("name");
      expect(res.body).to.have.property("job");
      expect(res.body).to.have.property("updatedAt");

      expect(res.body.name).to.eq(res.body.name);
      expect(res.body.job).to.eq(res.body.job);

      expect(res.body.name).not.to.be.null;
      expect(res.body.job).not.to.be.null;
    });
  });

  it("TC-006  Delete User", () => {
    cy.request({
      method: "DELETE",
      url: "api/users/2",
      headers: {
        "x-api-key": Cypress.env("API_KEY"),
      },
    }).then((res) => {
      expect(res.status).to.eq(204);
    });
  });

  it("TC-007  User Register Success", () => {
    cy.request({
      method: "POST",
      url: "/register",
      body: {
        email: "eve.holt@reqres.in",
        password: "pistol",
      },
      headers: {
        "x-api-key": Cypress.env("API_KEY"),
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.id).to.be.an("Number");
      expect(res.body).to.have.property("token");
    });
  });

  it("TC-008  User Register Fail", () => {
    cy.request({
      method: "POST",
      url: "/register",
      failOnStatusCode: false,
      body: {
        email: "eve.holt@reqres.in",
      },
      headers: {
        "x-api-key": Cypress.env("API_KEY"),
      },
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body).to.have.property("error");
      expect(res.body.error).to.contain("Missing password");
    });
  });

  it("TC-009 Login Success", () => {
    cy.request({
      method: "POST",
      url: "/register",
      failOnStatusCode: false,
      body: {
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      },
      headers: {
        "x-api-key": Cypress.env("API_KEY"),
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("token");
    });
  });

  it("TC-0010   Login Fail", () => {
    cy.request({
      method: "POST",
      url: "/register",
      failOnStatusCode: false,
      body: {
        email: "eve.holt@reqres.in",
      },
      headers: {
        "x-api-key": Cypress.env("API_KEY"),
      },
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body).to.have.property("error");
      expect(res.body.error).to.contain("Missing password");
    });
  });
});
