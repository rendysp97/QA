const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      API_KEY: "reqres-free-v1",
    },
    baseUrl: "https://reqres.in/api/",
  },
});
