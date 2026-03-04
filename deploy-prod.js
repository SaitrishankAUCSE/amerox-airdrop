const { Client } = require('ssh2');
const conn = new Client();
conn.on('ready', () => {
    console.log('Connected to VPS');
    conn.exec('cd /var/www/amerox && git pull origin main && npm run build && pm2 restart all', (err, stream) => {
        if (err) throw err;
        stream.on('close', (code) => {
            console.log('Deploy completed with exit code: ' + code);
            conn.end();
        }).on('data', (d) => console.log('STDOUT: ' + d)).stderr.on('data', (d) => console.log('STDERR: ' + d));
    });
}).connect({ host: '187.77.92.116', port: 22, username: 'root', password: 'Amerox337733.' });
