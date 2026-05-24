import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, chatHistory } = req.body;

      if (!message) {
        return res.status(400).json({ error: 'Message query is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;

      // Safe check for key existence to prevent module load or runtime crashes
      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.includes('MY_KEY')) {
        // Fallback simulated intelligent response curated for SnipeDrop Jastip Platform
        let simulatedReply = "Welcome to SnipeDrop Jastip Support! 🎯 To experience live AI capabilities, you can configure your official GEMINI_API_KEY in the **Settings > Secrets** panel. ";
        
        const q = message.toLowerCase();
        if (q.includes('premium') || q.includes('vip') || q.includes('access') || q.includes('advantage')) {
          simulatedReply += "\n\n🌟 **Premium VIP Member Privileges**: For only Rp15.000 / month, you get a massive 10-minute queue head start and zero-latency instant locks! You can upgrade anytime in the 'Premium Packages' tab.";
        } else if (q.includes('snipe') || q.includes('buy') || q.includes('checkout') || q.includes('checkout')) {
          simulatedReply += "\n\n⚡ **Instant Sniping**: Clicking the 'Instant Sniper' button launches a direct single-click confirmation modal! No shopping carts or delay buffers – absolute speed priority.";
        } else if (q.includes('jastip') || q.includes('shipping') || q.includes('how') || q.includes('work')) {
          simulatedReply += "\n\n📦 **Jastip Slot Logistics**: When you secure a slot, our on-site regional courier secures the vintage piece directly from the curate vendor in Tokyo, Jakarta, or Bandung. We confirm tracking details over WhatsApp immediately.";
        } else {
          simulatedReply += "\n\nI can assist you with active drop countdowns, wishlist radar alerts, booking confirmations, or upgrading to our premium VIP tier. How can I help you win your next vintage holy grail today?";
        }

        return res.json({ text: simulatedReply, simulated: true });
      }

      // Lazy initializing GoogleGenAI client
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      // Construct safe model system instruction representing SnipeDrop AI Assistant
      const systemInstruction = `
You are the "SnipeDrop AI Assistant", an elite, low-latency client success agent for SnipeDrop.
Your job is to assist users navigating our real-time thrift drop and Jastip slots platform.
Maintain an ultra-professional, friendly, and helpful tone representing our deep navy and neon blue premium aesthetic.

Key Platform Info you should know:
- SnipeDrop offers physical vintage clothing curated from Jakarta, Bandung, and Tokyo.
- "Jastip" is short for "Jasa Titip" (curated purchasing slots) where our territory couriers physically purchase the item on-site upon customer sniping.
- Premium VIP is only Rp15.000 / month and grants a critical 10-minute early access drop countdown.
- We have replaced slow "shopping carts" with the "Instant Sniper Button", opening a checkout modal enabling single-click instant purchase locks.
- Favorite / Heart icon saves items to their watchlists instantly.

Keep answers concise, scannable, and helpful. Use markdown list items where applicable.
      `.trim();

      // Simple chat completion with gemini-3.5-flash
      const promptText = `
System Instruction context: ${systemInstruction}

Chat History:
${(chatHistory || []).map((h: any) => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.text}`).join('\n')}

User Query: ${message}
      `.trim();

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: promptText,
      });

      const replyText = response.text || "I apologize, I could not synthesize a support response at this millisecond. Please try again.";
      return res.json({ text: replyText });

    } catch (err: any) {
      console.error('Gemini API Integration Server Error:', err);
      return res.status(500).json({ 
        error: 'Gemini system connection latency. Please verify your API Key or try again shortly.',
        details: err?.message || ''
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Express custom server listening at http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || 'development'} mode.`);
  });
}

startServer();
