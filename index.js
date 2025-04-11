const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const IBAN_REGEX = /\bTR\d{24}\b/g;

const client = new Client({
  authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
  console.log('QR Kod geldi. WhatsApp ile tara:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Bot hazır...');
});

client.on('message', async (message) => {
  const chat = await message.getChat();

  if (chat.isGroup && chat.name === "Halı Saha") {
    const matches = message.body.match(IBAN_REGEX);
    if (matches) {
      for (const iban of matches) {
        chat.sendMessage(iban);
      }
    }
  }
});

client.initialize();
