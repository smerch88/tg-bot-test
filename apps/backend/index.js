import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post('/send-message', async (req, res) => {
  const { chatId, message } = req.body;

  if (!chatId || typeof chatId !== 'string' || !chatId.trim()) {
    return res.status(400).json({ error: 'Invalid or missing Chat ID.' });
  }

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Invalid or missing message.' });
  }

  const telegramUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: message }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Telegram API Error:', data);
      return res.status(400).json({
        error: 'Telegram API error',
        description: data.description || 'Unknown error from Telegram',
      });
    }

    res.json({ success: true, telegramResponse: data });
  } catch (error) {
    console.error('Server Error:', error.message);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Could not send message. Try again later.',
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend listening at http://localhost:${PORT}`);
});
