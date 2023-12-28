import OpenAI from 'openai';
import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
config();

const PORT = 8000;
const app = express();
const openai = new OpenAI();

app.use(express.json());
app.use(cors());

app.get('/completions', async (req, res) => {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'user', content: 'Who is the most expensive NFL player?' },
    ],
    model: 'gpt-3.5-turbo',
    max_tokens: 10,
  });
  res.json(completion.choices[0].message.content);
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
