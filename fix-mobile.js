const fs = require('fs');
const path = require('path');

// 1. Fix z-index across all inner pages
const pagesDir = path.join(__dirname, 'pages');
const filesToFix = [
    'blog.js', 'help-center.js', 'lightpaper.js', 'partners.js',
    'presentation.js', 'privacy-policy.js', 'suggestions.js',
    'token-sale-terms.js', 'whitepaper.js'
];

filesToFix.forEach(file => {
    const filePath = path.join(pagesDir, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        // Replace <div className="container"> right after hero-glow-layer
        content = content.replace(
            /<div className="hero-glow-layer"><\/div>\s*<div className="container">/g,
            '<div className="hero-glow-layer"></div>\n                <div className="container" style={{ position: \'relative\', zIndex: 1 }}>'
        );
        fs.writeFileSync(filePath, content);
    }
});
console.log('Fixed z-index on inner pages.');

// 2. Append mobile CSS to globals.css
const cssPath = path.join(__dirname, 'styles', 'globals.css');
const mobileCSS = `

/* ================= Mobile Fixes ================= */
@media (max-width: 767.98px) {
  /* Contribution Section */
  .contribution-title .title {
    font-size: 32px !important;
  }
  .contribution-title .title span {
    font-size: 36px !important;
  }
  .progress-wrap .list-wrap {
    justify-content: space-between !important;
    padding: 0 10px !important;
  }
  .progress-wrap .list-wrap li {
    font-size: 11px !important;
    text-align: center;
  }
  .progress-title {
    font-size: 12px !important;
    flex-direction: column !important;
    gap: 10px !important;
    text-align: center !important;
  }
  
  /* Buttons Layout */
  .contribution-btn {
    flex-direction: column !important;
    gap: 15px !important;
    margin-top: 30px !important;
  }
  .contribution-btn .btn {
    width: 100% !important;
    text-align: center !important;
    justify-content: center !important;
  }

  /* Banner/Breadcrumbs */
  .breadcrumb-content .title {
    font-size: 36px !important;
  }
  .breadcrumb-shape-wrap img:nth-child(1) {
    max-width: 60px !important;
    top: 5% !important;
    left: 2% !important;
    opacity: 0.1 !important;
  }
  .breadcrumb-shape-wrap img:nth-child(2) {
    max-width: 80px !important;
    bottom: 5% !important;
    right: 5% !important;
    opacity: 0.1 !important;
  }
}
`;

let cssContent = fs.readFileSync(cssPath, 'utf8');
if (!cssContent.includes('Mobile Fixes')) {
    fs.appendFileSync(cssPath, mobileCSS);
    console.log('Appended mobile CSS to globals.css');
}
