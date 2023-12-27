const express = require("express");
const cors = require("cors");
const PORT = 8000;
const app = express();
const axios = require("axios");
require("dotenv").config();

app.use(express.json());
app.use(cors());

const API_KEY = process.env.API_KEY;

app.get("/completions", async (req, res) => {
  try {
    const res = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "How are you? " }],
      max_tokens: 100,
    });
    const data = await res.json();
    res.send(data);
  } catch (e) {
    console.error(e);
  }
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
