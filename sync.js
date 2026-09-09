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

// 3. Sync root pages
const rootFiles = ['index.html', 'about.html', 'courses.html', 'tools.html', 'blog.html', 'contact.html', '404.html', 'sitemap.xml', 'robots.txt'];
for (const f of rootFiles) {
  const src = path.join(__dirname, 'out', f);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(__dirname, f));
  }
}
console.log('✓ Synced root HTML files');

// 4. Sync .htaccess
if (fs.existsSync(path.join(__dirname, 'public', '.htaccess'))) {
  fs.copyFileSync(path.join(__dirname, 'public', '.htaccess'), path.join(__dirname, '.htaccess'));
  console.log('✓ Synced .htaccess');
}
