'use client';

import { useState } from 'react';
import IntroVideo from '../sections/IntroVideo';
import HeroSection from '../sections/HeroSection';
import SectionSeparator from '@/components/ui/SectionSeparator';
import NosotrosSection from '../sections/NosotrosSection';
import DetallesEventoSection from '../sections/DetallesEventoSection';
import ItinerarioSection from '../sections/ItinerarioSection';
import CodigoVestimentaSection from '../sections/CodigoVestimentaSection';
import MesaRegalosSection from '../sections/MesaRegalosSection';
import HospedajeSection from '../sections/HospedajeSection';
import MaquillajeSugerenciaSection from '../sections/MaquillajeSugerenciaSection';
import GaleriaSection from '../sections/GaleriaSection';
import CountdownSection from '../sections/CountdownSection';
import RSVPSection from '../sections/RSVPSection';
import TopNavBar from '@/components/ui/TopNavBar';
import MusicPlayer from '@/components/ui/MusicPlayer';
import type { Guest } from '@/types';

interface Props {
  guest: Guest;
}

export default function MobileInvitation({ guest }: Props) {
  const [introFinished, setIntroFinished] = useState(true);//false para mostrar video, true para NO mostrar video :))

  return (
    <div className="flex flex-col w-full">

      {/* ── Textura global sobre todo el contenido ──────────── */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/assets/textures/esta-textura.png')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          opacity: 0.05,
          zIndex: 20,
        }}
      />

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
        <SectionSeparator />
        <NosotrosSection />
        <SectionSeparator />
        <DetallesEventoSection />
        <SectionSeparator />
        <ItinerarioSection />
        <SectionSeparator />
        <CodigoVestimentaSection />
        <SectionSeparator />
        <MesaRegalosSection />
        <SectionSeparator />
        <HospedajeSection />
        <SectionSeparator />
        <MaquillajeSugerenciaSection />
        <SectionSeparator />
        <GaleriaSection />
        <SectionSeparator />
        <CountdownSection />
        <SectionSeparator />
        <RSVPSection
          token={guest.token}
          nombreFamilia={guest.nombreFamilia}
          pasesAsignados={guest.pasesAsignados}
          pasesConfirmados={guest.pasesConfirmados}
          statusRSVP={guest.statusRSVP}
        />
      </div>

      {/* Navbar hamburguesa fija en la parte superior */}
      <TopNavBar />

      {/* Reproductor de música fijo inferior izquierdo */}
      <MusicPlayer />

    </div>
  );
}
