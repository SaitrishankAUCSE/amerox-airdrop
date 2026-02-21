const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
    console.log('Client :: ready');
    conn.exec('pm2 list && find / -maxdepth 4 -type d -name "*amerox*" 2>/dev/null', (err, stream) => {
        if (err) throw err;
        stream.on('close', (code, signal) => {
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
