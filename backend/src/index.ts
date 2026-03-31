import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { guestRouter } from './routes/guest.routes';
import { rsvpRouter } from './routes/rsvp.routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT ?? 4000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN ?? 'http://localhost:3000';

app.use(cors({ origin: ALLOWED_ORIGIN }));
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/guest', guestRouter);
app.use('/rsvp', rsvpRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
