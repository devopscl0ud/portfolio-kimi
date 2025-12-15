const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

const API_KEY = process.env.GOOGLE_AI_API_KEY;
if (!API_KEY) console.warn('GOOGLE_AI_API_KEY not set - proxy will reject AI requests');

app.post('/api/ai', async (req, res) => {
  if (!API_KEY) return res.status(500).json({ error: 'Server AI key not configured' });
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Missing prompt' });

    const url = 'https://generativelanguage.googleapis.com/v1beta/models/text-bison-001:generate';
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` };
    const body = JSON.stringify({ prompt: { text: prompt }, temperature: 0.2, maxOutputTokens: 256 });

    const r = await fetch(url, { method: 'POST', headers, body });
    const data = await r.json();
    return res.json(data);
  } catch (err) {
    console.error('Proxy error', err);
    return res.status(500).json({ error: 'Proxy error' });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`AI proxy listening on ${port}`));
