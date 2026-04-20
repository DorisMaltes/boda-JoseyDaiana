import { Request, Response, NextFunction } from 'express';
import { getAllGuests } from '../services/dashboard.service';

export async function getDashboardGuests(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const secret = process.env.DASHBOARD_SECRET;
    if (secret && req.headers['x-dashboard-secret'] !== secret) {
      res.status(401).json({ error: 'No autorizado' });
      return;
    }

    const guests = await getAllGuests();
    res.json(guests);
  } catch (err) {
    next(err);
  }
}
