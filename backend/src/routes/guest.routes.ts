import { Router } from 'express';
import { getGuest } from '../controllers/guest.controller';

export const guestRouter = Router();

guestRouter.get('/:token', getGuest);
