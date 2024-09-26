const express = require('express');
const http = require('http');
const router = express.Router();

router.get('/I/want/title', (req, res) => {
    const addresses = [].concat(req.query.address);
    let results = [];
    let count = 0;

    addresses.forEach(address => {
        http.get(`http://${address}`, (resp) => {
            let data = '';
            resp.on('data', chunk => data += chunk);
            resp.on('end', () => {
                const title = (data.match(/<title>(.*?)<\/title>/) || [])[1] || 'NO RESPONSE';
                results.push(`<li>${address} - "${title}"</li>`);
                count++;
                if (count === addresses.length) res.send(renderHTML(results));
            });
        }).on('error', () => {
            results.push(`<li>${address} - NO RESPONSE</li>`);
            count++;
            if (count === addresses.length) res.send(renderHTML(results));
        });
    });
});

function renderHTML(results) {
    return `<html><body><h1>Website Titles:</h1><ul>${results.join('')}</ul></body></html>`;
}

module.exports = router;
