// server/src/index.ts — local dev server entry
import 'dotenv/config';
import { app } from './app.js';

const PORT = parseInt(process.env.PORT || '8787');
app.listen(PORT, () => {
  console.log(`[cafe87-api] Running on http://localhost:${PORT}`);
});
