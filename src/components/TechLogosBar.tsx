import React from 'react';

export const TechLogosBar: React.FC = () => {
  const logos = [
    { id: 'L1', name: 'L1', src: 'https://vibeacademy.info/wp-content/uploads/2026/05/L1.png' },
    { id: 'L3', name: 'L3', src: 'https://vibeacademy.info/wp-content/uploads/2026/05/L3.png' },
    { id: 'L4', name: 'L4', src: 'https://vibeacademy.info/wp-content/uploads/2026/05/L4.png' },
    { id: 'L6', name: 'L6', src: 'https://vibeacademy.info/wp-content/uploads/2026/05/L6.png' },
    { id: 'L7', name: 'L7', src: 'https://vibeacademy.info/wp-content/uploads/2026/05/L7.png' },
    { id: 'L8', name: 'L8', src: 'https://vibeacademy.info/wp-content/uploads/2026/05/L8.png' },
    { id: 'L9', name: 'L9', src: 'https://vibeacademy.info/wp-content/uploads/2026/05/L9.png' },
    { id: 'L10', name: 'L10', src: 'https://vibeacademy.info/wp-content/uploads/2026/05/L10.png' },
    { id: 'L11', name: 'L11', src: 'https://vibeacademy.info/wp-content/uploads/2026/05/L11.png' },
    { id: 'L12', name: 'L12', src: 'https://vibeacademy.info/wp-content/uploads/2026/05/L12.png' },
    { id: 'TS', name: 'TS', src: 'https://vibeacademy.info/wp-content/uploads/2026/05/TS.png' },
    { id: 'REACT', name: 'REACT', src: 'https://vibeacademy.info/wp-content/uploads/2026/05/REACT.png' },
    { id: 'postman', name: 'postman', src: 'https://vibeacademy.info/wp-content/uploads/2026/05/postman.png' }
  ];

  const loop = [...logos, ...logos, ...logos];

  return (
    <div className="w-full overflow-hidden px-0 mx-0 select-none border-y border-white/10">
      <div
        className="w-full py-4 sm:py-5 overflow-hidden relative"
        style={{
          backgroundImage:
            'url("https://vibeacademy.info/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-29-at-11.28.08-AM.jpeg")',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      >
        <div className="animate-marquee flex items-center gap-10 sm:gap-14 md:gap-16">
          {loop.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="flex items-center justify-center shrink-0 px-2 sm:px-4"
            >
              <img
                src={item.src}
                alt={item.name}
                loading="eager"
                className="h-8 sm:h-10 md:h-12 w-auto max-w-[130px] sm:max-w-[160px] object-contain drop-shadow select-none pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
