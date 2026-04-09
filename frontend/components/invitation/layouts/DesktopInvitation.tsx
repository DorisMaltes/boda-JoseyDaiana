'use client';

import { useState } from 'react';
import IntroVideo from '../sections/IntroVideo';
import SectionSeparator from '@/components/ui/SectionSeparator';
import DesktopNavBar from '@/components/ui/DesktopNavBar';
import MusicPlayer from '@/components/ui/MusicPlayer';

import HeroSectionDesktop          from '../sections/desktop/HeroSectionDesktop';
import NosotrosSectionDesktop      from '../sections/desktop/NosotrosSectionDesktop';
import DetallesEventoSectionDesktop from '../sections/desktop/DetallesEventoSectionDesktop';
import ItinerarioSectionDesktop    from '../sections/desktop/ItinerarioSectionDesktop';
import CodigoVestimentaSectionDesktop from '../sections/desktop/CodigoVestimentaSectionDesktop';
import MesaRegalosSectionDesktop   from '../sections/desktop/MesaRegalosSectionDesktop';
import HospedajeSectionDesktop     from '../sections/desktop/HospedajeSectionDesktop';
import MaquillajeSugerenciaSectionDesktop from '../sections/desktop/MaquillajeSugerenciaSectionDesktop';
import GaleriaSectionDesktop       from '../sections/desktop/GaleriaSectionDesktop';
import CountdownSectionDesktop     from '../sections/desktop/CountdownSectionDesktop';
import RSVPSectionDesktop          from '../sections/desktop/RSVPSectionDesktop';

import type { Guest } from '@/types';

interface Props {
  guest: Guest;
}

export default function DesktopInvitation({ guest }: Props) {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <div className="flex flex-col w-full">

      {/* ── Textura global ───────────────────────────────────── */}
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

      {/* Intro video */}
      {!introFinished && (
        <IntroVideo onFinished={() => setIntroFinished(true)} />
      )}

      {/* Contenido */}
      <div
        className="pt-16"
        style={{ opacity: introFinished ? 1 : 0, transition: 'opacity 0.8s ease' }}
      >
        <HeroSectionDesktop
          nombreFamilia={guest.nombreFamilia}
          pasesAsignados={guest.pasesAsignados}
        />
        <SectionSeparator />
        <NosotrosSectionDesktop />
        <SectionSeparator />
        <DetallesEventoSectionDesktop />
        <SectionSeparator />
        <ItinerarioSectionDesktop />
        <SectionSeparator />
        <CodigoVestimentaSectionDesktop />
        <SectionSeparator />
        <MesaRegalosSectionDesktop />
        <SectionSeparator />
        <HospedajeSectionDesktop />
        <SectionSeparator />
        <MaquillajeSugerenciaSectionDesktop />
        <SectionSeparator />
        <GaleriaSectionDesktop />
        <SectionSeparator />
        <CountdownSectionDesktop />
        <SectionSeparator />
        <RSVPSectionDesktop
          token={guest.token}
          nombreFamilia={guest.nombreFamilia}
          ApellidosFamilia={guest.ApellidosFamilia}
          esFamilia={guest.esFamilia}
          pasesAsignados={guest.pasesAsignados}
          pasesConfirmados={guest.pasesConfirmados}
          statusRSVP={guest.statusRSVP}
          mensajeParanovios={guest.mensajeParanovios}
        />
      </div>

      <DesktopNavBar />
      <MusicPlayer introFinished={introFinished} />

    </div>
  );
}
