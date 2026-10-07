import React from 'react';

export const MapSection: React.FC = () => {
  return (
    <section id="map" className="w-full bg-black py-0 border-t border-white/10 relative">
      <div className="w-full h-[450px] overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52941.67555120674!2d72.94237503303222!3d33.970573367663086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfb3a06171cdf9%3A0x69125029615bf533!2sBusiness%20incubation%20Center!5e0!3m2!1sen!2s!4v1779258349931!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full block"
          title="University of Haripur Business Incubation Center (BIC)"
        />
      </div>
    </section>
  );
};
