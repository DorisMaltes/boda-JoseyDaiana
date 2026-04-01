'use client';

import { useState } from 'react';
import IntroVideo from '../sections/IntroVideo';
import HeroSection from '../sections/HeroSection';
import TopNavBar from '@/components/ui/TopNavBar';
import type { Guest } from '@/types';

interface Props {
  guest: Guest;
}

export default function MobileInvitation({ guest }: Props) {
  const [introFinished, setIntroFinished] = useState(true);//false para mostrar video, true para NO mostrar video :))

  return (
    <div className="flex flex-col w-full">

      {/* Intro — se desmonta cuando termina el video */}
      {!introFinished && (
        <IntroVideo onFinished={() => setIntroFinished(true)} />
      )}

      {/* Contenido de la invitación — aparece tras el video */}
      <div
        className="pt-16"
        style={{
          opacity: introFinished ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}
      >
        <HeroSection
          nombreFamilia={guest.nombreFamilia}
          pasesAsignados={guest.pasesAsignados}
        />
        {/* Próximas secciones mobile se agregan aquí */}
      </div>

      {/* Navbar hamburguesa fija en la parte superior */}
      <TopNavBar />

    </div>
  );
}
