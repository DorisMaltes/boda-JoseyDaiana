import { notFound } from 'next/navigation';
import { getGuest } from '@/services/guestService';
import HeroSection from '@/components/invitation/HeroSection';

interface Props {
  params: Promise<{ token: string }>;
}

export default async function InvitationPage({ params }: Props) {
  const { token } = await params;

  let guest;
  try {
    guest = await getGuest(token);
  } catch {
    notFound();
  }

  return (
    <main>
      <HeroSection nombreFamilia={guest.nombreFamilia} pasesAsignados= {guest.pasesAsignados} />
      {/* Próximas secciones se agregarán aquí */}
    </main>
  );
}
