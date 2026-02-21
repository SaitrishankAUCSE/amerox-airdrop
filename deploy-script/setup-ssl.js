const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
    console.log('Client :: ready');
    const setupCmd = `
    sed -i 's/server_name 187.77.92.116;/server_name 187.77.92.116 airdrop.amerox.io;/g' /etc/nginx/sites-available/default
    systemctl reload nginx
    apt-get update -y
    apt-get install -y certbot python3-certbot-nginx
    certbot --nginx -d airdrop.amerox.io --non-interactive --agree-tos -m saitrishankb9@gmail.com --redirect
    systemctl restart nginx
  `;
    conn.exec(setupCmd, (err, stream) => {
        if (err) throw err;
        stream.on('close', (code, signal) => {
            console.log('Setup Complete with code ' + code);
            conn.end();
        }).on('data', (data) => {
            console.log('STDOUT: ' + data);
        }).stderr.on('data', (data) => {
            console.log('STDERR: ' + data);
        });
    });
}).connect({
    host: '187.77.92.116',
    port: 22,
    username: 'root',
    password: 'Amerox337733.'
});
