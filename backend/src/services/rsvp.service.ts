import { supabase } from '../config/supabase';
import { RsvpPayload, Guest } from '../types';
import { AppError } from '../middleware/errorHandler';

const TABLE = 'Invitados-Boda';

export async function upsertRsvp(payload: RsvpPayload): Promise<Guest> {
  // 1. Buscar invitado
  const { data: guest, error: findError } = await supabase
    .from(TABLE)
    .select('*')
    .eq('token', payload.token)
    .single();

  if (findError || !guest) {
    throw new AppError(404, 'Invitado no encontrado');
  }

  const g = guest as Guest;

  // 2. Validar pases
  if (payload.status === 'confirmado') {
    if (payload.pasesConfirmados < 1) {
      throw new AppError(400, 'Debes confirmar al menos 1 pase');
    }
    if (payload.pasesConfirmados > g.pasesAsignados) {
      throw new AppError(
        400,
        `No puedes confirmar más de ${g.pasesAsignados} pases`
      );
    }
  }

  const finalPases = payload.status === 'declinado' ? 0 : payload.pasesConfirmados;

  // 3. Actualizar — siempre sobreescribe, la última respuesta gana
  const updateData: Record<string, unknown> = {
    statusRSVP: payload.status,
    pasesConfirmados: finalPases,
    confirmedAt: new Date().toISOString(),
  };
  if (payload.mensajeParanovios !== undefined) {
    updateData.mensajeParanovios = payload.mensajeParanovios;
  }

  const { data, error: updateError } = await supabase
    .from(TABLE)
    .update(updateData)
    .eq('token', payload.token)
    .select()
    .single();

  if (updateError || !data) {
    console.error('[rsvp.service] updateError:', updateError);
    throw new AppError(500, updateError?.message ?? 'Error al guardar el RSVP');
  }

  return data as Guest;
}
