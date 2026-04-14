import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 375, height: 812 }
});

console.log('🔍 Navigating to landing page...');
await page.goto('http://localhost:4323', { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);

const sections = [
  { name: 'hero', selector: 'section, [class*="hero"], [class*="Hero"]' },
  { name: 'services', selector: '[class*="service"], [class*="Service"]' },
  { name: 'process', selector: '[class*="process"], [class*="Process"]' },
  { name: 'projects', selector: '[class*="project"], [class*="Project"], [class*="work"]' },
  { name: 'testimonials', selector: '[class*="testimonial"], [class*="Testimonial"], [class*="review"]' },
  { name: 'finalCTA', selector: '[class*="cta"], [class*="CTA"], [class*="contact"], [class*="Contact"]' },
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

const horizontalOverflow = await page.evaluate(() => {
  const allElements = document.querySelectorAll('*');
  let maxWidth = 0;
  let overflowingElements = [];
  
  for (const el of allElements) {
    const rect = el.getBoundingClientRect();
    if (rect.width > window.innerWidth) {
      maxWidth = Math.max(maxWidth, rect.width);
      overflowingElements.push({
        tag: el.tagName,
        class: el.className,
        width: rect.width,
        left: rect.left,
        right: rect.right
      });
    }
  }
  
  return { maxWidth, overflowingElements: overflowingElements.slice(0, 10) };
});

if (horizontalOverflow.maxWidth > windowWidth) {
  console.log(`❌ Elements exceeding viewport: ${horizontalOverflow.overflowingElements.length}`);
  console.log(JSON.stringify(horizontalOverflow.overflowingElements, null, 2));
}

console.log('\n✅ Done!');
await browser.close();
