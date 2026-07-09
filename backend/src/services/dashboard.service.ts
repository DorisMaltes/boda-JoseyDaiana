import { supabase } from '../config/supabase';
import { AppError } from '../middleware/errorHandler';
import { CreateGuestPayload, UpdateGuestPayload } from '../types';

const TABLE = 'Invitados-Boda';

export interface DashboardGuest {
  id: number;
  token: string;
  nombreFamilia: string;
  ApellidosFamilia?: string | null;
  esFamilia?: boolean | null;
  pasesAsignados: number;
  pasesConfirmados: number;
  statusRSVP: 'pendiente' | 'confirmado' | 'declinado';
  mensajeParanovios?: string | null;
  respondedAt?: string | null;
  confirmedAt?: string | null;
  created_at: string;
  rondaInvitado: number;
  familiarDe?: 'novio'|'novia'|null;
  ladaTelefonica?: string|null;
  numTelefonico?: string|null;

}

export async function getAllGuests(): Promise<DashboardGuest[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as DashboardGuest[];
}

// insserta una nueva fila
export async function createGuest(payload: CreateGuestPayload): Promise<DashboardGuest> {
  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      nombreFamilia: payload.nombreFamilia,
      ApellidosFamilia: payload.ApellidosFamilia ?? null,
      esFamilia: payload.esFamilia ?? false,
      pasesAsignados: payload.pasesAsignados,
      pasesConfirmados: 0,
      statusRSVP: 'pendiente',
      rondaInvitado: payload.rondaInvitado ?? 1,
      familiarDe: payload.familiarDe,
      ladaTelefonica: payload.ladaTelefonica ?? '+52',
      numTelefonico: payload.numTelefonico ?? null,
    })
    .select()
    .single();

  if (error || !data) {
    throw new AppError(500, error?.message ?? 'Error al crear invitado');
  }

  return data as DashboardGuest;
}

//pasa la información o el payload directo a Supabase .update, como todo los datos son opcioneles solo se mandan los camposo que realemnte quiera cambiar, tambien se hace por su ID

export async function updateGuest(id: number, payload: UpdateGuestPayload): Promise<DashboardGuest> {
  const { data, error } = await supabase
    .from(TABLE)
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error || !data) {
    throw new AppError(500, error?.message ?? 'Error al actualizar invitado');
  }

  return data as DashboardGuest;
}

// borra al invitado por su ID
export async function deleteGuest(id: number): Promise<void> {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq('id', id);

  if (error) {
    throw new AppError(500, error.message);
  }
}
