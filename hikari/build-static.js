const fs = require('node:fs');
const path = require('node:path');
const { pages, render } = require('./server');

const outputDir = path.join(__dirname, 'site-build');
fs.mkdirSync(outputDir, { recursive: true });
fs.copyFileSync(path.join(__dirname, 'public', 'styles.css'), path.join(outputDir, 'styles.css'));
fs.copyFileSync(path.join(__dirname, 'public', 'site.js'), path.join(outputDir, 'site.js'));
fs.cpSync(path.join(__dirname, 'public', 'images'), path.join(outputDir, 'images'), { recursive: true });
fs.writeFileSync(path.join(outputDir, 'robots.txt'), 'User-agent: *\nAllow: /\n', 'utf8');

for (const page of pages) {
  const directory = page.path === '/' ? outputDir : path.join(outputDir, page.path.replace(/^\/+|\/+$/g, ''));
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, 'index.html'), render(page, ''), 'utf8');
}

console.log(`Built ${pages.length} HTML routes in ${outputDir}`);
