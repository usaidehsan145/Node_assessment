const express = require('express');
const app = express();

app.use('/callback', require('./callback'));
app.use('/async', require('./asyncflow'));
app.use('/promise', require('./promise'));

app.use((req, res) => {
    res.status(404).send('404 - Not Found');
});

app.listen(3000, () => console.log('Server is running on the port 3000'));
