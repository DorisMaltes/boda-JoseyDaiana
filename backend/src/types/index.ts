export type RsvpStatus = 'pendiente' | 'confirmado' | 'declinado';

export interface Guest {
  id: number;
  token: string;
  nombreFamilia: string;
  ApellidosFamilia?: string;
  esFamilia?: boolean;
  pasesAsignados: number;
  pasesConfirmados: number;
  statusRSVP: RsvpStatus;
  respondedAt?: string | null;
  confirmedAt?: string | null;
  created_at: string;
}

export interface RsvpPayload {
  token: string;
  status: 'confirmado' | 'declinado';
  pasesConfirmados: number;
  mensajeParanovios?: string;
}
