const { Client } = require('ssh2');
const fs = require('fs');
const path = require('path');

const conn = new Client();
const baseLocal = 'c:/Users/saitr/OneDrive/Pictures/Desktop/anact/AirDrop-Amero-main (1)/amerox/';
const remotes = ['/var/www/amerox/', '/var/www/amerox/amerox/'];

const files = [
    'context/index.js',
    'context/constants.js',
    'check_balance.js',
    'check_new_token_balance.js'
];

conn.on('ready', () => {
    console.log('Client :: ready');
    // Just chmod the context folder
    conn.exec('chmod 777 /var/www/amerox/context /var/www/amerox/amerox/context', (err, stream) => {
        if (err) throw err;
        stream.on('close', () => {
            console.log('Chmod complete');
            conn.sftp((err, sftp) => {
                if (err) throw err;

                let totalToUpload = files.length * remotes.length;
                let uploaded = 0;

                remotes.forEach(baseRemote => {
                    files.forEach(file => {
                        const localPath = path.join(baseLocal, file);
                        const remotePath = path.join(baseRemote, file);

                        sftp.fastPut(localPath, remotePath, (err) => {
                            if (err) {
                                console.error(`Error uploading ${file} to ${baseRemote}:`, err);
                                // Don't throw, just log and continue
                            } else {
                                console.log(`Uploaded to ${baseRemote}: ${file}`);
                            }
                            uploaded++;

                            if (uploaded === totalToUpload) {
                                console.log('All files uploaded to all remotes, starting build...');
                                // Build in the main directory
                                conn.exec('cd /var/www/amerox && npm run build && pm2 restart all', (err, stream) => {
                                    if (err) throw err;
                                    stream.on('data', (data) => process.stdout.write(data))
                                        .stderr.on('data', (data) => process.stderr.write(data))
                                        .on('close', (code) => {
                                            console.log('Build & Restart Complete with code ' + code);
                                            conn.end();
                                        });
                                });
                            }
                        });
                    });
                });
            });
        });
    });
}).connect({
    host: '187.77.92.116',
    port: 22,
    username: 'root',
    password: 'Amerox337733.'
});
