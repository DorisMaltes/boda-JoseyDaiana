import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { upsertRsvp } from '../services/rsvp.service';

const rsvpSchema = z.object({
  token: z.string().min(1),
  status: z.enum(['confirmado', 'declinado']),
  pasesConfirmados: z.number().int().min(0),
});

export async function submitRsvp(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const parsed = rsvpSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues[0]?.message ?? 'Solicitud inválida' });
      return;
    }

    const updated = await upsertRsvp(parsed.data);
    res.json({
      success: true,
      statusRSVP: updated.statusRSVP,
      pasesConfirmados: updated.pasesConfirmados,
    });
  } catch (err) {
    next(err);
  }
}
