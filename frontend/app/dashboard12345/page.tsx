import { notFound } from 'next/navigation';
import DashboardClient, { DashboardGuest } from './DashboardClient';

export const dynamic = 'force-dynamic';

async function fetchAllGuests(): Promise<DashboardGuest[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const secret = process.env.DASHBOARD_SECRET ?? '';

  if (!apiUrl) throw new Error('NEXT_PUBLIC_API_URL is not defined');

  const res = await fetch(`${apiUrl}/dashboard/guests`, {
    headers: {
      'Content-Type': 'application/json',
      'x-dashboard-secret': secret,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Error al obtener invitados: ${res.status}`);
  }

  return res.json() as Promise<DashboardGuest[]>;
}

export default async function DashboardPage() {
  let guests: DashboardGuest[];

  try {
    guests = await fetchAllGuests();
  } catch {
    notFound();
  }

  return <DashboardClient guests={guests} />;
}
