import { Router } from 'express';
import { submitRsvp } from '../controllers/rsvp.controller';

export const rsvpRouter = Router();

rsvpRouter.post('/', submitRsvp);
