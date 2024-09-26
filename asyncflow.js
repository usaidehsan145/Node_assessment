const express = require('express');
const async = require('async');
const http = require('http');
const router = express.Router();

router.get('/I/want/title', (req, res) => {
    const addresses = [].concat(req.query.address);

    async.map(addresses, (address, callback) => {
        http.get(`http://${address}`, (resp) => {
            let data = '';
            resp.on('data', chunk => data += chunk);
            resp.on('end', () => {
                const title = (data.match(/<title>(.*?)<\/title>/) || [])[1] || 'NO RESPONSE';
                callback(null, `<li>${address} - "${title}"</li>`);
            });
        }).on('error', () => callback(null, `<li>${address} - NO RESPONSE</li>`));
    }, (err, results) => {
        res.send(renderHTML(results));
    });
});

function renderHTML(results) {
    return `<html><body><h1>Website Titles:</h1><ul>${results.join('')}</ul></body></html>`;
}

module.exports = router;
