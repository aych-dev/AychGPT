const OpenAI = require('openai');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const PORT = 8000;
const app = express();
const openai = new OpenAI(process.env.OPENAI_API_KEY);

app.use(express.json());
app.use(cors());

app.post('/completions', async (req, res) => {
  try {
    const { userMessages } = req.body;
    const { assistantMessages } = req.body;

    const completions = await openai.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: userMessages,
        },
      ],
      model: 'gpt-3.5-turbo',
    });

    res.json(completions.choices[0].message.content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
