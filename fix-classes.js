const fs = require('fs');
const path = require('path');

function replaceClass(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceClass(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            const originalContent = content;
            content = content.replace(/ class="/g, ' className="');
            content = content.replace(/ class=\{/g, ' className=\{');

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content);
                console.log('Updated: ' + fullPath);
            }
        }
    }
}

try {
    replaceClass(path.join(__dirname, 'components'));
    replaceClass(path.join(__dirname, 'pages'));
    console.log('All class attributes replaced with className');
} catch (e) {
    console.error(e);
}
