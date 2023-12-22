const express = require('express');
const cors = require('cors');
const PORT = 8000;
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cors());

const API_KEY = process.env.API_KEY;

app.post('/completions', (req, res) => {});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
