import { supabase } from '../config/supabase';
import { Guest } from '../types';
import { AppError } from '../middleware/errorHandler';

const TABLE = 'Invitados-Boda';

export async function getGuestByToken(token: string): Promise<Guest> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('token', token)
    .single();

  if (error || !data) {
    throw new AppError(404, 'Invitado no encontrado');
  }

  return data as Guest;
}
