import { sendTelegramMessage } from '../utils/sendTelegramMessage.js';

export const sendMessage = async (req, res) => {
    const { chatId, message } = req.body;

    if (!chatId || typeof chatId !== 'string' || !chatId.trim()) {
        return res.status(400).json({ error: 'Invalid or missing Chat ID.' });
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
        return res.status(400).json({ error: 'Invalid or missing message.' });
    }

    try {
        const data = await sendTelegramMessage(chatId, message);
        res.json({ success: true, telegramResponse: data });
    } catch (error) {
        const status = error.code === 401 ? 400 : 500;
        res.status(status).json({
            error: 'Telegram API error',
            description: error.message || 'Unknown error',
        });
    }
};
