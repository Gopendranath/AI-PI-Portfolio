const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const responseRouter = require('./routes/response.js');


const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

let viewCount = 0;

app.use((req, res, next) => {
    viewCount++;
    next();
});

app.get('/', (req, res) => {
    res.json({ views: viewCount });
});

app.use('/api', responseRouter);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
