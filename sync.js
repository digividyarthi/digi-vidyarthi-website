const fs = require('fs');
const path = require('path');

function copyDirSync(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 1. Sync _next
if (fs.existsSync(path.join(__dirname, 'out', '_next'))) {
  if (fs.existsSync(path.join(__dirname, '_next'))) {
    fs.rmSync(path.join(__dirname, '_next'), { recursive: true, force: true });
  }
  copyDirSync(path.join(__dirname, 'out', '_next'), path.join(__dirname, '_next'));
  console.log('✓ Synced _next to root');
}

// 2. Sync blog/
if (fs.existsSync(path.join(__dirname, 'out', 'blog'))) {
  copyDirSync(path.join(__dirname, 'out', 'blog'), path.join(__dirname, 'blog'));
  if (fs.existsSync(path.join(__dirname, 'out', 'blog.html'))) {
    fs.copyFileSync(path.join(__dirname, 'out', 'blog.html'), path.join(__dirname, 'blog', 'index.html'));
  }
  console.log('✓ Synced blog/ to root');
}

// 3. Find and prepare inline CSS to eliminate render-blocking requests
const cssDir = path.join(__dirname, 'out', '_next', 'static', 'css');
let inlineCssTag = '';
let cssFileNames = [];
if (fs.existsSync(cssDir)) {
  cssFileNames = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));
  if (cssFileNames.length > 0) {
    const combinedCss = cssFileNames.map(f => fs.readFileSync(path.join(cssDir, f), 'utf-8')).join('\n');
    inlineCssTag = `<style data-precedence="next">${combinedCss}</style>`;
    console.log(`✓ Loaded ${cssFileNames.length} CSS files (${Math.round(combinedCss.length / 1024)} KiB) for instant inlining`);
  }
}

// Helper to optimize HTML by inlining CSS
function optimizeHtmlFile(filePath) {
  if (!inlineCssTag || !fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf-8');
  // Replace render-blocking link stylesheet with inlined style tag
  const cssLinkRegex = /<link rel="stylesheet" href="\/_next\/static\/css\/[^"]+\.css" data-precedence="next"\/>/;
  if (cssLinkRegex.test(content)) {
    content = content.replace(cssLinkRegex, inlineCssTag);
    fs.writeFileSync(filePath, content, 'utf-8');
  }
}

// 4. Sync root pages with CSS inlining
const rootFiles = ['index.html', 'about.html', 'courses.html', 'tools.html', 'blog.html', 'contact.html', '404.html', 'sitemap.xml', 'robots.txt'];
for (const f of rootFiles) {
  const src = path.join(__dirname, 'out', f);
  const dest = path.join(__dirname, f);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    if (f.endsWith('.html')) {
      optimizeHtmlFile(dest);
    }
  }
}
console.log('✓ Synced and optimized root HTML files (inlined CSS, zero render-blocking)');

// Also optimize blog HTML files if any
if (fs.existsSync(path.join(__dirname, 'blog'))) {
  const blogEntries = fs.readdirSync(path.join(__dirname, 'blog'));
  for (const be of blogEntries) {
    if (be.endsWith('.html')) {
      optimizeHtmlFile(path.join(__dirname, 'blog', be));
    }
  }
  console.log('✓ Inlined CSS in blog HTML files');
}

// 4. Sync .htaccess
if (fs.existsSync(path.join(__dirname, 'public', '.htaccess'))) {
  fs.copyFileSync(path.join(__dirname, 'public', '.htaccess'), path.join(__dirname, '.htaccess'));
  console.log('✓ Synced .htaccess');
}
