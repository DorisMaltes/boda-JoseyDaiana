import { Request, Response, NextFunction } from 'express';
import { getGuestByToken } from '../services/guest.service';

export async function getGuest(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const raw = req.params['token'];
    const token = Array.isArray(raw) ? raw[0] : raw;
    if (!token) {
      res.status(400).json({ error: 'Token is required' });
      return;
    }
    const guest = await getGuestByToken(token);
    res.json(guest);
  } catch (err) {
    next(err);
  }
}
