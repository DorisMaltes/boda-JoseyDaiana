import HeroSection from '../sections/HeroSection';
import type { Guest } from '@/types';

interface Props {
  guest: Guest;
}

export default function MobileInvitation({ guest }: Props) {
  return (
    <div className="flex flex-col w-full">
      <HeroSection
        nombreFamilia={guest.nombreFamilia}
        pasesAsignados={guest.pasesAsignados}
      />
      {/* Próximas secciones mobile se agregan aquí, en orden */}
    </div>
  );
}
