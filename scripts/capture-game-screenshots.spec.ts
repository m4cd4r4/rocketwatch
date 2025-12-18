import { test, expect } from '@playwright/test';

const games = [
  'asteroids',
  'invaders',
  'snake',
  'breakout',
  'missile-command',
  'thrust',
  'defender',
  'lunar-lander',
];

test.describe('Capture Game Screenshots', () => {
  test('capture all game screenshots', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('http://localhost:3000');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Click on Arcade button
    await page.click('text=Arcade');

    // Wait for arcade modal to open
    await page.waitForSelector('text=Space Arcade', { timeout: 5000 });

    // For each game, capture a screenshot
    for (const game of games) {
      console.log(`Capturing screenshot for ${game}...`);

      // Find and click the game card
      const gameCard = page.locator(`[data-game="${game}"]`).first();
      if (await gameCard.count() === 0) {
        // Fallback: try to find by title text
        const gameTitle = game.split('-').map(word =>
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        await page.click(`text=${gameTitle}`);
      } else {
        await gameCard.click();
      }

      // Wait for game canvas to load
      await page.waitForSelector('canvas', { timeout: 10000 });

      // Wait a bit for the game to initialize and render
      await page.waitForTimeout(2000);

      // Take a screenshot of just the canvas
      const canvas = page.locator('canvas').first();
      await canvas.screenshot({
        path: `public/arcade-screenshots/${game}.png`,
      });

      console.log(`✓ Captured ${game}.png`);

      // Go back to game selection
      await page.click('[aria-label="Back to game selection"]');

      // Wait for game selection screen
      await page.waitForSelector('text=Space Arcade');
      await page.waitForTimeout(500);
    }

    console.log('\\n✅ All screenshots captured successfully!');
  });
});
