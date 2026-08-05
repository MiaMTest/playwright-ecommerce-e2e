
import { chromium, defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: 'html',
  timeout: 40 * 1000,
  expect: {
    timeout: 5000,
  },


  use: {
    baseURL: 'https://rahulshettyacademy.com/client/',
    browserName: 'chromium',
    trace: 'retain-on-failure',
    headless: true,

  },

  projects: [
    {
      name: 'setup',
      testMatch: /.*\-setup\.js/,
    },
    {
      name: 'authenticated',
      use: {
        storageState: 'playwright/.auth/user.json',//automatically injects the session
      },
      testDir: './tests/authenticated',
      dependencies: ['setup'], //ensure login happens before these start
    },
    //public UI tests
    {
      name: 'public',
      use: {
        storageState: { cookies: [], origins: [] },//A fresh, logged-out state
      },
      testDir: './tests/public'
    },

  ]

});

