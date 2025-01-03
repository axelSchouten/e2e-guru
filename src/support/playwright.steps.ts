import { defineConfig } from '@playwright/test';
import { config } from 'dotenv';

config({ path: './.env' });

export default defineConfig({
    testDir: '.src/e2e/**/*',
    use: {
        headless: false,
        viewport: { width: 1300, height: 860 },
    },
    reporter: [
        ['json', { outputFile: 'results.json' }],
        ['html', { open: "always", port: 7777 }]
    ]
});