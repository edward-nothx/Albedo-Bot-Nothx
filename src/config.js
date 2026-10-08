import 'dotenv/config';

export const config = {
  botName: process.env.BOT_NAME || 'Albedo',
  ownerName: process.env.OWNER_NAME || 'Edward',
  ownerJid: process.env.OWNER_JID || '',
  prefix: process.env.PREFIX || '.',
  nothApiUrl: process.env.NOTH_API_URL || 'https://ianoth.hidenplay.net/api/v1/chat/completions',
  nothApiKey: process.env.NOTH_API_KEY || '',
  nothModel: process.env.NOTH_MODEL || 'noth-mini',
  dbFile: process.env.DB_FILE || './data/database.json',
  menuImageUrl: process.env.MENU_IMAGE_URL || ''
};
  
