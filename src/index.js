import { startBot } from './core/connection.js';

console.log('╭──────────────────────────╮');
console.log('│      ALBEDO BOT × Noth    │');
console.log('╰──────────────────────────╯');

startBot().catch((error) => {
  console.error('No se pudo iniciar Albedo Bot:', error);
  process.exit(1);
});
