import { apiFetch } from '@/lib/api';
import type { Guest, RsvpPayload, RsvpResponse } from '@/types';

export async function getGuest(token: string): Promise<Guest> {
  return apiFetch<Guest>(`/guest/${token}`);
}

export async function submitRsvp(payload: RsvpPayload): Promise<RsvpResponse> {
  return apiFetch<RsvpResponse>('/rsvp', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
