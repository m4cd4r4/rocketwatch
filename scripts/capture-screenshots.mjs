import { chromium } from '@playwright/test';

const games = [
  { id: 'asteroids', name: 'Asteroids' },
  { id: 'invaders', name: 'Space Invaders' },
  { id: 'snake', name: 'Cosmic Snake' },
  { id: 'breakout', name: 'Asteroid Defense' },
  { id: 'missile-command', name: 'Missile Command' },
  { id: 'thrust', name: 'Thrust' },
  { id: 'defender', name: 'Defender' },
  { id: 'lunar-lander', name: 'Lunar Lander' },
];

async function captureScreenshots() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    console.log('🚀 Navigating to the homepage...');
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    console.log('🎮 Opening Arcade modal...');
    await page.click('text=Arcade');
    await page.waitForSelector('text=Space Arcade', { timeout: 5000 });
    await page.waitForTimeout(1000);

    for (const game of games) {
      console.log(`\\n📸 Capturing ${game.name}...`);

      try {
        // Click on the game - try by title first
        await page.click(`text=${game.name}`, { timeout: 5000 });

        // Wait for canvas to load
        await page.waitForSelector('canvas', { timeout: 10000 });

        // Wait for game to initialize
        await page.waitForTimeout(3000);

        // Take screenshot of the canvas
        const canvas = page.locator('canvas').first();
        const screenshotPath = `public/arcade-screenshots/${game.id}.png`;
        await canvas.screenshot({ path: screenshotPath });

        console.log(`   ✓ Saved to ${screenshotPath}`);

        // Go back to game selection
        await page.click('[aria-label="Back to game selection"]');
        await page.waitForSelector('text=Space Arcade');
        await page.waitForTimeout(1000);
      } catch (error) {
        console.error(`   ✗ Failed to capture ${game.name}:`, error.message);
      }
    }

    console.log('\\n✅ All screenshots captured successfully!');
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await browser.close();
  }
}

captureScreenshots();
