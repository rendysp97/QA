import login from "../../fixtures/login.json";
import loginObj from "../../support/pageObj/loginObj";

describe(" Scenario Orange HRM Login ", () => {
  beforeEach(() => {
    loginObj.visitPage();
  });

  it("TC001- Login dengan username dan password valid ", () => {
    loginObj.inputUsername(login.valid_login.username);
    loginObj.inputPassword(login.valid_login.password);

    loginObj.interceptStatus();

    loginObj.clickButton();

    loginObj.verifyintercept(
      login.valid_login.username,
      login.valid_login.password
    );

    loginObj.assert();
  });

  it("TC002-Login tanpa input username dan password", () => {
    loginObj.interceptStatusEmpty();

    loginObj.visitPage();

    loginObj.clickButton();

    loginObj.verifyInterceptStatusEmpty();

    loginObj.statusError();
  });

  it("TC003-Login dengan password salah tetapi username valid", () => {
    loginObj.interceptStatus();

    loginObj.inputUsername(login.invalid_pass.username);
    loginObj.inputPassword(login.invalid_pass.password);

    loginObj.clickButton();

    loginObj.verifyintercept(
      login.invalid_pass.username,
      login.invalid_pass.password
    );

    loginObj.statusErrorInvalid();
  });

  it("TC004-Login dengan username salah tetapi password valid", () => {
    loginObj.inputUsername(login.invalid_user.username);
    loginObj.inputPassword(login.invalid_pass.password);

    loginObj.interceptStatus();

    loginObj.clickButton();

    loginObj.verifyintercept(
      login.invalid_user.username,
      login.invalid_pass.password
    );

    loginObj.statusErrorInvalid();
  });

  it("TC005- Redirect ke halaman forgot password", () => {
    loginObj.interceptForgot();

    loginObj.contain_forgot();

    loginObj.verifyinterceptForgot();

    loginObj.assert_forgot();
  });
});
