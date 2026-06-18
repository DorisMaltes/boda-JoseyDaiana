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

//los campos que el admin proveé cuando agrega un nuevo invitado
export interface CreateGuestPayload {
  nombreFamilia: string;
  ApellidosFamilia?: string;
  esFamilia?: boolean;
  pasesAsignados: number;
  rondaInvitado?: number;

}

//cada campo es opcional, para que el admin pueda cambiar lo que le plazca 
export interface UpdateGuestPayload {
  nombreFamilia?: string;
  ApellidosFamilia?: string;
  esFamilia?: boolean;
  pasesAsignados?: number;
  pasesConfirmados?: number;
  statusRSVP?: RsvpStatus;
  mensajeParanovios?: string;
  rondaInvitado?: number;
}

