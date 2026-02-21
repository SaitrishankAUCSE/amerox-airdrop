const { Client } = require('ssh2');
const fs = require('fs');
const path = require('path');

const conn = new Client();
const baseLocal = 'c:/Users/saitr/OneDrive/Pictures/Desktop/anact/AirDrop-Amero-main (1)/amerox/';
const baseRemote = '/var/www/amerox/';

const files = [
    'context/index.js',
    'components/Document.jsx',
    'components/Admin.jsx',
    'pages/api/verify-tweet.js',
    'pages/api/verify-instagram.js',
    'components/Header.jsx'
];

conn.on('ready', () => {
    console.log('Client :: ready');
    conn.sftp((err, sftp) => {
        if (err) throw err;

        let uploaded = 0;
        files.forEach(file => {
            sftp.fastPut(path.join(baseLocal, file), path.join(baseRemote, file), (err) => {
                if (err) throw err;
                console.log('Uploaded: ' + file);
                uploaded++;

                if (uploaded === files.length) {
                    console.log('All files uploaded, starting build...');
                    conn.exec('cd /var/www/amerox && npm run build && pm2 restart all', (err, stream) => {
                        if (err) throw err;
                        stream.on('close', (code, signal) => {
                            console.log('Build & Restart Complete with code ' + code);
                            conn.end();
                        }).on('data', (data) => {
                            console.log('STDOUT: ' + data);
                        }).stderr.on('data', (data) => {
                            console.log('STDERR: ' + data);
                        });
                    });
                }
            });
        });
    });
}).connect({
    host: '187.77.92.116',
    port: 22,
    username: 'root',
    password: 'Amerox337733.'
});
