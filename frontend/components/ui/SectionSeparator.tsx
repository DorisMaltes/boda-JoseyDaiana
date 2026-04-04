import Image from 'next/image';

export default function SectionSeparator() {
  return (
    <>
      {/* Mobile: imagen escalada */}
      <div className="block md:hidden w-full overflow-hidden leading-[0]">
        <Image
          src="/assets/componentes/separador.png"
          alt=""
          width={438}
          height={27}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Desktop: repeat-x a tamaño real (438×27) */}
      <div
        className="hidden md:block w-full"
        style={{
          height: '27px',
          backgroundImage: "url('/assets/componentes/separador.png')",
          backgroundRepeat: 'repeat-x',
          backgroundSize: '438px 27px',
          backgroundPosition: 'left center',
        }}
      />
    </>
  );
}
