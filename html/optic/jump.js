const express = require('express');
const app = express();

const host = "localhost";
const port = 8000;

app.get('/main.js', (req, res) => {
    res.sendFile('./main.js', { root: __dirname });
});


app.get('/', (req, res) => {
    res.sendFile('./base.html', { root: __dirname });
});


app.listen(port, () => console.log(`listening on port http://${host}:${port}!`));
