import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 375, height: 812 }
});

console.log('🔍 Navigating to landing page...');
await page.goto('http://localhost:4322', { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);

const sections = [
  { name: 'navbar', selector: 'header, nav, [class*="nav"]' },
  { name: 'hero', selector: 'section[class*="hero"], main, [class*="hero"], [class*="Hero"]' },
  { name: 'services', selector: '[class*="service"], [class*="bento"], section:nth-of-type(2)' },
  { name: 'process', selector: '[class*="process"], section:nth-of-type(3)' },
  { name: 'footer', selector: 'footer' }
];

console.log('\n📱 Checking mobile viewport (375x812)...\n');

for (const section of sections) {
  try {
    const el = await page.locator(section.selector).first();
    if (await el.isVisible()) {
      await el.screenshot({ path: `./test-results/${section.name}-mobile.png` });
      console.log(`✅ ${section.name}: screenshot taken`);
    } else {
      console.log(`⚠️ ${section.name}: not found`);
    }
  } catch (e) {
    console.log(`❌ ${section.name}: ${e.message}`);
  }
}

console.log('\n🔎 Checking for common mobile issues...\n');

const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
const windowWidth = await page.evaluate(() => window.innerWidth);
console.log(`- Body scrollWidth: ${bodyWidth}, window.innerWidth: ${windowWidth}`);

if (bodyWidth > windowWidth + 1) {
  console.log('❌ ISSUE: Horizontal overflow detected!');
} else {
  console.log('✅ No horizontal overflow');
}

const smallTexts = await page.locator('text={"font-size":"12px"},{"font-size":"10px"},{"font-size":"8px"}').count();
console.log(`- Potentially small text elements: check manually`);

await browser.close();
console.log('\n✅ Done!');