# Realtime Chat

![realtime-chat_1](https://github.com/user-attachments/assets/84031245-95b2-446d-bf73-d9f944e3082a)
![realtime-chat_2](https://github.com/user-attachments/assets/22812ede-e503-485a-bcf2-e153db98246c)

Mock chat UI with production-ready realtime backend architecture.

The public web UI is intentionally demo-only by default.

## Stack

- Node.js + Express
- Socket.IO
- Supabase (optional persistence)
- Vite (frontend)

## Architecture

### Frontend

- `main.js`: application entrypoint.
- `client/bootstrap-client.js`: composition root.
- `client/config/*`: runtime config and identity.
- `client/chat/*`: socket client and chat UI orchestration.
- `client/theme/*`: theme behavior.

### Backend

- `server/index.js`: server bootstrap.
- `server/src/config/*`: environment parsing and validation.
- `server/src/http/*`: Express app and HTTP middleware.
- `server/src/realtime/*`: Socket.IO server and event wiring.
- `server/src/chat/*`: domain rules (validation, normalization, rate limiting).
- `server/src/storage/*`: persistence adapters (`mock` and `supabase`).

## Storage modes

- `CHAT_STORAGE=mock`: in-memory messages (default).
- `CHAT_STORAGE=supabase`: persistent messages in Supabase.

## Environment

Copy `.env.example` to `.env` and configure:

```bash
PORT=4000
CHAT_STORAGE=mock
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:4173,http://localhost:4000
SUPABASE_URL=
SUPABASE_ANON_KEY=
VITE_CHAT_UI_MODE=demo
VITE_GITHUB_URL=https://github.com/Fr4n0m/realtime-chat
VITE_SOCKET_SERVER_URL=
```

When `CHAT_STORAGE=supabase`, `SUPABASE_URL` and `SUPABASE_ANON_KEY` are required.

`VITE_CHAT_UI_MODE=demo` disables realtime chat interaction in the UI and shows an informational popup with the GitHub link.  
Use `VITE_CHAT_UI_MODE=live` to enable realtime UI behavior.

## Scripts

```bash
npm run dev
npm run test
npm run test:watch
npm run build
npm run start
npm run preview
npm run audit
```

## Automated quality

- Unit tests run with Vitest.
- Run quality checks locally before every commit: `npm run test`, `npm run build`, `npm run audit`.

## License

MIT
