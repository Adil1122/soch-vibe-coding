import React from 'react';
import { MapPin, Navigation, ExternalLink, ShieldCheck, Globe } from 'lucide-react';

export const MapSection: React.FC = () => {
  return (
    <section id="map" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#458543]/10 text-[#458543] border border-[#458543]/30 uppercase tracking-wider font-poppins">
            <MapPin className="w-3.5 h-3.5 text-[#458543]" />
            <span>Incubation Headquarters</span>
          </div>
          <h2 className="text-3xl font-extrabold text-[#1E2A4F] font-poppins tracking-tight">
            Our Location in Haripur, Pakistan
          </h2>
          <div className="space-y-1">
            <p className="text-base font-semibold text-[#1E2A4F]">
              Haripur, Khyber Pakhtunkhwa, Pakistan
            </p>
            <p className="text-base font-bold text-[#2A6EB4] font-poppins">
              From Haripur to the World! 🇵🇰
            </p>
          </div>
        </div>

        {/* Map & Card Container */}
        <div className="bg-[#F4F6F9] rounded-3xl border border-slate-200 overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12">
          {/* Left Info Bar */}
          <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white border-b lg:border-b-0 lg:border-r border-slate-200">
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#F38A32] uppercase tracking-wider font-poppins block">
                Academic & Venture Base
              </span>
              <h3 className="text-xl font-bold font-poppins text-[#1E2A4F]">
                University of Haripur
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hattar Road, Haripur, Khyber Pakhtunkhwa 22620, Pakistan. 
                Hosted inside the cutting-edge Business Incubation Center (BIC) facility.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#458543]" />
                  <span>High-speed optical fiber connectivity</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#458543]" />
                  <span>Modern developer collaborative lab</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#458543]" />
                  <span>On-campus student facilities</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <a
                href="https://maps.google.com/?q=University+of+Haripur+Pakistan"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 bg-[#1E2A4F] hover:bg-[#2A6EB4] text-white rounded-xl text-xs font-bold uppercase tracking-wider font-poppins transition flex items-center justify-center gap-2"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions in Google Maps</span>
              </a>
            </div>
          </div>

          {/* Right Map Canvas (Embedded Google Map centered on University of Haripur) */}
          <div className="lg:col-span-8 h-80 sm:h-96 lg:h-auto min-h-[350px] relative bg-slate-100">
            <iframe
              title="University of Haripur Campus Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13233.152788544975!2d72.93049533355087!3d33.99806497230495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfa503da0a0553%3A0xe212c4436573ca14!2sThe%20University%20of%20Haripur!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale-[15%] contrast-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
