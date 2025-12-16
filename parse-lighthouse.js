const fs = require('fs');
const file = process.argv[2] || './lighthouse-report.json';
const report = JSON.parse(fs.readFileSync(file, 'utf8'));

console.log('=== LIGHTHOUSE SCORES ===');
console.log('Performance:', report.categories.performance.score * 100);
console.log('SEO:', report.categories.seo.score * 100);
console.log('Best Practices:', report.categories['best-practices'].score * 100);

console.log('\n=== PERFORMANCE METRICS ===');
const metrics = report.audits['metrics'].details.items[0];
console.log('First Contentful Paint:', metrics.firstContentfulPaint, 'ms');
console.log('Largest Contentful Paint:', metrics.largestContentfulPaint, 'ms');
console.log('Total Blocking Time:', metrics.totalBlockingTime, 'ms');
console.log('Cumulative Layout Shift:', metrics.cumulativeLayoutShift);
console.log('Speed Index:', metrics.speedIndex, 'ms');

console.log('\n=== KEY OPPORTUNITIES ===');
const opportunities = [
  'unused-javascript',
  'unused-css-rules',
  'render-blocking-resources',
  'uses-optimized-images',
  'modern-image-formats',
  'efficient-cache-policy',
];

opportunities.forEach(id => {
  const audit = report.audits[id];
  if (audit && audit.details && audit.details.overallSavingsMs) {
    console.log('-', audit.title, ':', Math.round(audit.details.overallSavingsMs), 'ms savings');
  }
});

console.log('\n=== SEO ISSUES ===');
const seo = report.categories.seo;
seo.auditRefs.forEach(ref => {
  const audit = report.audits[ref.id];
  if (audit.score !== null && audit.score < 1) {
    console.log('-', audit.title, ':', Math.round(audit.score * 100));
  }
});
