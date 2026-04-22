import { supabase } from '../config/supabase';

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
