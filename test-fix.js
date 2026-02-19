const http = require('http');

const data = JSON.stringify({
    url: "https://www.instagram.com/p/ExamplePost/"
});

function checkPort(port) {
    const options = {
        hostname: 'localhost',
        port: port,
        path: '/api/verify-instagram',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    const req = http.request(options, (res) => {
        console.log(`Checking Port ${port}: STATUS ${res.statusCode}`);

        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
            console.log(`BODY: ${body}`);
            if (res.statusCode === 500) {
                console.error("STILL CRASHING with 500!");
            } else {
                console.log("Server is responsive and NOT crashing.");
            }
        });
    });

    req.on('error', (e) => {
        console.log(`Port ${port} error: ${e.message}`);
        // If 3000 fails, try 3001?
        if (port === 3000) checkPort(3001);
    });

    req.write(data);
    req.end();
}

checkPort(3000);
