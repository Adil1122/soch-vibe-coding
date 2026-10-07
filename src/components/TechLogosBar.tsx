import React from 'react';

export const TechLogosBar: React.FC = () => {
  const logos = [
    {
      id: 'L1',
      name: 'JavaScript & Node.js',
      src: 'https://vibeacademy.info/wp-content/uploads/2026/05/L1.png',
      fallback: '/tech-logos/L1.png'
    },
    {
      id: 'L3',
      name: 'VS Code',
      src: 'https://vibeacademy.info/wp-content/uploads/2026/05/L3.png',
      fallback: '/tech-logos/L3.png'
    },
    {
      id: 'L4',
      name: 'GitHub',
      src: 'https://vibeacademy.info/wp-content/uploads/2026/05/L4.png',
      fallback: '/tech-logos/L4.png'
    },
    {
      id: 'L6',
      name: 'Vite & Tooling',
      src: 'https://vibeacademy.info/wp-content/uploads/2026/05/L6.png',
      fallback: '/tech-logos/L6.png'
    },
    {
      id: 'L7',
      name: 'Tailwind CSS',
      src: 'https://vibeacademy.info/wp-content/uploads/2026/05/L7.png',
      fallback: '/tech-logos/L7.png'
    },
    {
      id: 'L8',
      name: 'Express.js',
      src: 'https://vibeacademy.info/wp-content/uploads/2026/05/L8.png',
      fallback: '/tech-logos/L8.png'
    },
    {
      id: 'L9',
      name: 'MongoDB',
      src: 'https://vibeacademy.info/wp-content/uploads/2026/05/L9.png',
      fallback: '/tech-logos/L9.png'
    },
    {
      id: 'L10',
      name: 'Claude AI',
      src: 'https://vibeacademy.info/wp-content/uploads/2026/05/L10.png',
      fallback: '/tech-logos/L10.png'
    },
    {
      id: 'L11',
      name: 'Cursor AI',
      src: 'https://vibeacademy.info/wp-content/uploads/2026/05/L11.png',
      fallback: '/tech-logos/L11.png'
    },
    {
      id: 'L12',
      name: 'AI Engineering & Workflows',
      src: 'https://vibeacademy.info/wp-content/uploads/2026/05/L12.png',
      fallback: '/tech-logos/L12.png'
    },
    {
      id: 'TS',
      name: 'TypeScript',
      src: 'https://vibeacademy.info/wp-content/uploads/2026/05/TS.png',
      fallback: '/tech-logos/TS.png'
    },
    {
      id: 'REACT',
      name: 'React.js',
      src: 'https://vibeacademy.info/wp-content/uploads/2026/05/REACT.png',
      fallback: '/tech-logos/REACT.png'
    },
    {
      id: 'postman',
      name: 'Postman',
      src: 'https://vibeacademy.info/wp-content/uploads/2026/05/postman.png',
      fallback: '/tech-logos/postman.png'
    }
  ];

  // Repeat logos array to create seamless infinite loop
  const loopLogos = [...logos, ...logos];

  return (
    <div className="w-full overflow-hidden px-0 mx-0 select-none shadow-md border-y border-slate-900/20">
      {/* Full-width continuous animated ribbon matching 100% vibeacademy.info reference */}
      <div
        className="w-full py-4 sm:py-6 overflow-hidden relative"
        style={{
          backgroundImage:
            'url("https://vibeacademy.info/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-29-at-11.28.08-AM.jpeg"), url("/tech-logos/bg-tools.jpeg"), linear-gradient(135deg, #0e1726 0%, #1e293b 50%, #0e1726 100%)',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      >
        <div className="animate-marquee flex items-center gap-10 sm:gap-14 md:gap-16">
          {loopLogos.map((logo, idx) => (
            <div
              key={`${logo.id}-${idx}`}
              className="flex items-center justify-center shrink-0 px-2 sm:px-4"
            >
              <img
                src={logo.src}
                alt={logo.name}
                loading="eager"
                onError={(e) => {
                  if (logo.fallback && e.currentTarget.src !== logo.fallback) {
                    e.currentTarget.src = logo.fallback;
                  }
                }}
                className="h-8 sm:h-10 md:h-12 w-auto max-w-[140px] sm:max-w-[180px] object-contain drop-shadow-md select-none pointer-events-none transition-transform duration-200"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
