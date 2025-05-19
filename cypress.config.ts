import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',  // or your dev server URL
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
  },
})
