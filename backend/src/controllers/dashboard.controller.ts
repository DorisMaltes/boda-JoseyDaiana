//CRUD handlers
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import {
  getAllGuests,
  createGuest as createGuestService,
  updateGuest as updateGuestService,
  deleteGuest as deleteGuestService,
} from '../services/dashboard.service';

const createGuestSchema = z.object({
  nombreFamilia: z.string().min(1),
  ApellidosFamilia: z.string().optional(),
  esFamilia: z.boolean().optional(),
  pasesAsignados: z.number().int().min(1),
  rondaInvitados: z.number().int().min(1),
});

const updateGuestSchema = z.object({
  nombreFamilia: z.string().min(1).optional(),
  ApellidosFamilia: z.string().optional(),
  esFamilia: z.boolean().optional(),
  pasesAsignados: z.number().int().min(1).optional(),
  pasesConfirmados: z.number().int().min(0).optional(),
  statusRSVP: z.enum(['pendiente', 'confirmado', 'declinado']).optional(),
  rondaInvitados: z.number().int().min(1).optional(),
  mensajeParanovios: z.string().optional(),
});

export async function getDashboardGuests(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const guests = await getAllGuests();
    res.json(guests);
  } catch (err) {
    next(err);
  }
}

export async function createGuest(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const parsed = createGuestSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues[0]?.message ?? 'Datos inválidos' });
      return;
    }
    const guest = await createGuestService(parsed.data);
    res.status(201).json(guest);
  } catch (err) {
    next(err);
  }
}

export async function updateGuest(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = Number(req.params['id']);
    if (!id) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }
    const parsed = updateGuestSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues[0]?.message ?? 'Datos inválidos' });
      return;
    }
    const guest = await updateGuestService(id, parsed.data);
    res.json(guest);
  } catch (err) {
    next(err);
  }
}

export async function deleteGuest(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = Number(req.params['id']);
    if (!id) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }
    await deleteGuestService(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
