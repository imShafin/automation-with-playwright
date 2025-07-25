import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */

require('dotenv').config({
  path: path.resolve(__dirname, `.env.${process.env.ENVIRONMENT || 'local'}`),
});

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    baseURL: process.env.BASE_URL,    
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testMatch: 'tests/setup/auth.setup.ts',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 }
      }
    },
    // Main test projects - depend on setup and use saved auth state
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1366, height: 768 },
        storageState: 'fixtures/auth/auth.json'
      },
      dependencies: ['setup']
    },

    // Add additional browser configurations as needed
    // {
    //   name: 'firefox',
    //   use: { 
    //     ...devices['Desktop Firefox'],
    //     storageState: 'fixtures/auth/userAuthState.json'
    //   },
    //   dependencies: ['setup']
    // },

    // Add mobile or other browser projects here following same pattern
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
