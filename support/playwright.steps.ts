import { defineConfig } from '@playwright/test';
import { config } from 'dotenv';

config({ path: './.env' });

export default defineConfig({
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
  },
});