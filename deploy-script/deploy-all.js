const { Client } = require('ssh2');
const fs = require('fs');
const path = require('path');

const conn = new Client();
const baseLocal = 'c:/Users/saitr/OneDrive/Pictures/Desktop/anact/AirDrop-Amero-main (1)/amerox/';
const baseRemote = '/var/www/amerox/';

// Upload globals.css + all components/pages
const files = [
    'styles/globals.css',
    // Components
    'components/Admin.jsx', 'components/AdminAnalytic.jsx', 'components/AdminDetails.jsx',
    'components/AdminInput.jsx', 'components/Banner.jsx', 'components/Brand.jsx',
    'components/Chart.jsx', 'components/Contribution.jsx', 'components/Document.jsx',
    'components/Download.jsx', 'components/Faq.jsx', 'components/Feature.jsx',
    'components/FeatureTwo.jsx', 'components/Follow.jsx', 'components/Footer.jsx',
    'components/Header.jsx', 'components/Hero.jsx', 'components/Instagram.jsx',
    'components/Linkedin.jsx', 'components/Loader.jsx', 'components/MouseGlow.jsx',
    'components/NoPage.jsx', 'components/RoadMap.jsx', 'components/Scrollup.jsx',
    'components/Twitter.jsx', 'components/Verify.jsx', 'components/index.js',
    // Pages
    'pages/[404].js', 'pages/_app.js', 'pages/admin.js', 'pages/airdrop.js',
    'pages/index.js', 'pages/lightpaper.js', 'pages/presentation.js',
    'pages/token-sale-terms.js', 'pages/whitepaper.js',
    'pages/blog.js', 'pages/help-center.js', 'pages/partners.js',
    'pages/suggestions.js', 'pages/privacy-policy.js',
    'pages/api/contact.js', 'pages/api/verify-instagram.js',
    'pages/api/verify-linkedin.js', 'pages/api/verify-tweet.js',
    'pages/api/suggestions.js',
    'context/index.js', 'Utils/index.js', 'Utils/normalizeText.js',
];

conn.on('ready', () => {
    console.log('Connected to VPS');
    conn.sftp((err, sftp) => {
        if (err) throw err;
        let uploaded = 0, errors = 0;
        files.forEach(file => {
            const localPath = path.join(baseLocal, file);
            const remotePath = baseRemote + file;
            if (!fs.existsSync(localPath)) { uploaded++; if (uploaded === files.length) startBuild(); return; }
            sftp.fastPut(localPath, remotePath, (err) => {
                if (err) { console.error('FAIL: ' + file); errors++; } else { console.log('OK: ' + file); }
                uploaded++;
                if (uploaded === files.length) startBuild();
            });
        });
        function startBuild() {
            console.log(`\n${uploaded - errors} uploaded. Building...`);
            conn.exec('cd /var/www/amerox && npm run build && pm2 restart all', (err, stream) => {
                if (err) throw err;
                stream.on('close', (code) => { console.log('Build exit: ' + code); conn.end(); })
                    .on('data', (d) => console.log('STDOUT: ' + d))
                    .stderr.on('data', (d) => console.log('STDERR: ' + d));
            });
        }
    });
}).connect({ host: '187.77.92.116', port: 22, username: 'root', password: 'Amerox337733.' });
