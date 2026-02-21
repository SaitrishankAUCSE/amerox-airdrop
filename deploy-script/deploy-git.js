const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
    console.log('Client :: ready');
    const setupCmd = `
    cd /var/www
    rm -rf amerox-temp
    git clone https://github.com/SaitrishankAUCSE/amerox-airdrop.git amerox-temp
    cp -r amerox-temp/components/* amerox/components/
    cp -r amerox-temp/pages/* amerox/pages/
    cp amerox-temp/fix-classes.js amerox/
    rm -rf amerox-temp
    cd amerox
    npm run build
    pm2 restart all
  `;
    conn.exec(setupCmd, (err, stream) => {
        if (err) throw err;
        stream.on('close', (code, signal) => {
            console.log('Deployment Complete with code ' + code);
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
