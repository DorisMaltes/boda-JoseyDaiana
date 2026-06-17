import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import DashboardClient, { DashboardGuest } from './DashboardClient';

export const dynamic = 'force-dynamic';

async function fetchAllGuests(token: string): Promise<DashboardGuest[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) throw new Error('NEXT_PUBLIC_API_URL is not defined');

  const res = await fetch(`${apiUrl}/dashboard/guests`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) throw new Error(`Error al obtener invitados: ${res.status}`);

  return res.json() as Promise<DashboardGuest[]>;
}

export default async function DashboardPage() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) notFound();

  const token = session.access_token;

  let guests: DashboardGuest[];
  try {
    guests = await fetchAllGuests(token);
  } catch {
    notFound();
  }

  return <DashboardClient guests={guests} token={token} />;
}
