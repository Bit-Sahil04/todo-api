const express = require('express');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Live on port ${port}`));


app.use('/', (req, res, next) => { console.log("test", req); res.status(500).end() });

