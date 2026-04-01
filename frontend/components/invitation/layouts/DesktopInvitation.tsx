import type { Guest } from '@/types';

interface Props {
  guest: Guest;
}

// Desktop layout — se construye después de completar mobile
export default function DesktopInvitation({ guest: _guest }: Props) {
  return (
    <div className="flex flex-col w-full">
      {/* Secciones desktop se construyen aquí */}
    </div>
  );
}
