import { defineConfig } from 'cypress';

export default defineConfig({
  defaultCommandTimeout: 20000,
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(/* on, config */) {},
  },
});
