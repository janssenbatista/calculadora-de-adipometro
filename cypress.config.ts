import { defineConfig } from 'cypress';

export default defineConfig({
  allowCypressEnv: false,
  viewportWidth: 1024,
  viewportHeight: 768,

  e2e: {
    baseUrl: 'http://localhost:5173',
  },
});
