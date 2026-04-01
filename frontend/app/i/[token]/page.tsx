import { notFound } from 'next/navigation';
import { getGuest } from '@/services/guestService';
import MobileInvitation from '@/components/invitation/layouts/MobileInvitation';
import DesktopInvitation from '@/components/invitation/layouts/DesktopInvitation';

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
      {/* Mobile: < 768px */}
      <div className="block md:hidden">
        <MobileInvitation guest={guest} />
      </div>

      {/* Desktop: ≥ 768px */}
      <div className="hidden md:block">
        <DesktopInvitation guest={guest} />
      </div>
    </main>
  );
}
