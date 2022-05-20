const fs = require('fs');

const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                ok: true,
                message: 'File created, written to ./dist/index.html'
            });
        });
    });
};

const copyFile = () => {
    return new Promise((resolve, reject) => {
        fs.copyFile("./src/style.css", "./dist/style.css", err => {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                ok: true,
                message: 'CSS file copied to ./dist/style.css'
            });
        });
    });
};

module.exports = { writeFile, copyFile };