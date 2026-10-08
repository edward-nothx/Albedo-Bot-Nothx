# Albedo Bot × Noth IA

Base modular de un bot de WhatsApp con Baileys y Noth IA.

## Incluye

- Chat normal con Albedo conectado a Noth IA.
- Solo dos comandos: `.reg` y `.menu`.
- Registro obligatorio para hablar con Albedo y usar comandos.
- Identidad LID/JID centralizada.
- Perfiles por usuario y relación con Albedo.
- Propietario configurable como Edward.
- Memoria básica por usuario.
- Contexto de grupo/privado para Noth IA.
- Menú visual usando `assets/albedo-menu.png`.
- Arquitectura preparada para añadir comandos y herramientas después.

## Instalación

```bash
npm install
cp .env.example .env
```

Edita `.env` y coloca tu API key de Noth IA. Si quieres que Edward sea reconocido como owner, coloca también su JID real en `OWNER_JID`.

Luego:

```bash
npm start
```

Escanea el QR de WhatsApp si es la primera conexión.

## Comandos

- `.reg` — registra al usuario.
- `.menu` — muestra el menú.

Todo lo demás se conversa con Albedo directamente. Un usuario sin registro recibe el aviso de registro antes de usar el bot.

## Importante sobre LID/JID

WhatsApp puede entregar mensajes usando LID. `src/identity/resolver.js` mantiene la identidad en un solo lugar y conserva tanto el LID como el JID disponible. Para menciones reales, la función `getRealJid()` intenta resolver la identidad usando los métodos disponibles en la sesión de Baileys y el caché local.

## Seguridad

La API key va en `.env`; no la subas a GitHub ni la pegues dentro del código. Si la clave que usaste en el chat era una clave real, considérala expuesta y rótala antes de producción.
