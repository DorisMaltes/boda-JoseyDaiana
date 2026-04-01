import Image from 'next/image';

export default function SectionSeparator() {
  return (
    <div className="w-full overflow-hidden leading-[0]">
      <Image
        src="/assets/componentes/separador.png"
        alt=""
        width={1200}
        height={80}
        className="w-full h-auto object-cover"
      />
    </div>
  );
}
