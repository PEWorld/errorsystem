/* Serverless proxy: receives the project form and forwards it to Telegram.
   The bot token never reaches the browser — set these in the Vercel project
   (Settings → Environment Variables), then redeploy:
     TG_BOT_TOKEN  — the bot token from @BotFather
     TG_CHAT_ID    — your numeric chat id from @userinfobot
*/
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const token = process.env.TG_BOT_TOKEN;
  const chatId = process.env.TG_CHAT_ID;
  if (!token || !chatId) {
    return res.status(500).json({ ok: false, error: 'not_configured' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const { name = '', contact = '', brief = '', budget = '', page = '', website = '' } = body;

    // honeypot — pretend success for bots
    if (website) return res.status(200).json({ ok: true });
    if (!contact) return res.status(400).json({ ok: false, error: 'contact_required' });

    const text = [
      '🚨 NEW SIGNAL — ERROR SYSTEM',
      '',
      'Name / brand: ' + (name || '—'),
      'Reply to: ' + contact,
      'Brief: ' + (brief || '—'),
      'Budget: ' + (budget || '—'),
      '',
      '// ' + new Date().toISOString() + (page ? ' · ' + page : '')
    ].join('\n');

    const tg = await fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true })
    });
    if (!tg.ok) return res.status(502).json({ ok: false, error: 'telegram_' + tg.status });

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ ok: false, error: 'server_error' });
  }
}
