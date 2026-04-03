export type RsvpStatus = 'pendiente' | 'confirmado' | 'declinado';
export type Mensaje = "hola";

export interface Guest {
  id: number;
  token: string;
  nombreFamilia: string;
  pasesAsignados: number;
  pasesConfirmados: number;
  statusRSVP: RsvpStatus;
  respondedAt?: string | null;
  created_at: string;
  mensajeParanovios?: Mensaje ;
  
}

export interface RsvpPayload {
  token: string;
  status: 'confirmado' | 'declinado';
  pasesConfirmados: number;
  mensajeParanovios?: string;
}

export interface RsvpResponse {
  success: boolean;
  statusRSVP: RsvpStatus;
  pasesConfirmados: number;
  mensajeParanovios?: Mensaje;
}
