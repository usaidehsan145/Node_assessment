const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/I/want/title', (req, res) => {
    const addresses = [].concat(req.query.address);

    Promise.all(addresses.map(address => {
        return axios.get(`http://${address}`)
            .then(response => {
                const title = (response.data.match(/<title>(.*?)<\/title>/) || [])[1] || 'NO RESPONSE';
                return `<li>${address} - "${title}"</li>`;
            })
            .catch(() => `<li>${address} - NO RESPONSE</li>`);
    })).then(results => {
        res.send(renderHTML(results));
    });
});

function renderHTML(results) {
    return `<html><body><h1>Website Titles:</h1><ul>${results.join('')}</ul></body></html>`;
}

module.exports = router;
