export const sendTelegramMessage = async (chatId, message) => {
  const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: message }),
  });

  const data = await response.json();

  if (!response.ok) {
    const err = new Error(data.description || 'Telegram API error');
    err.code = response.status;
    throw err;
  }

  return data;
};
