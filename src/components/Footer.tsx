import React from 'react';

interface FooterProps {
  onOpenIntegration?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenIntegration }) => {
  return (
    <>
      <footer className="custom-footer">
        {/* SOCIAL */}
        <div className="footer-top">
          <a
            href="https://www.facebook.com/profile.php?id=61589446406739"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://vibeacademy.info/wp-content/uploads/2026/05/FB.png"
              alt="Facebook"
            />
            Facebook
          </a>
          <a
            href="https://www.instagram.com/vibeacademy01/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://vibeacademy.info/wp-content/uploads/2026/05/insta.png"
              alt="Instagram"
            />
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/in/vibe-academy/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://vibeacademy.info/wp-content/uploads/2026/05/Linkdline.png"
              alt="LinkedIn"
            />
            LinkedIn
          </a>
          <a
            href="https://www.tiktok.com/@vibeacademy01"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://vibeacademy.info/wp-content/uploads/2026/05/logo-21.png"
              alt="TikTok"
            />
            TikTok
          </a>
          {/* WHATSAPP */}
          <a
            href="https://api.whatsapp.com/send/?phone=923335744117&text&type=phone_number&app_absent=0"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://vibeacademy.info/wp-content/uploads/2026/05/logo-3.png"
              alt="WhatsApp"
            />
            WhatsApp
          </a>
        </div>

        {/* BOTTOM */}
        <div className="footer-bottom">
          <div className="copy">
            © Vibe Academy 2026 |<br />
            Backed by the UOH Business Incubation Center (BIC).
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
              {onOpenIntegration && (
                <button
                  type="button"
                  onClick={onOpenIntegration}
                  className="text-[#78daeb] hover:text-white underline cursor-pointer transition"
                >
                  ⚡ Database Guide
                </button>
              )}
              <span className="text-white/30">•</span>
              <a
                href="/admin"
                className="text-[#c9459c] hover:text-white underline cursor-pointer transition font-medium"
              >
                🔐 Admissions Admin Portal (/admin)
              </a>
            </div>
          </div>
          {/* LOGO */}
          <div className="footer-logo">
            <a href="#home">
              <img
                src="https://vibeacademy.info/wp-content/uploads/2024/11/Vibe-.png"
                alt="Vibe Academy Logo"
                className="w-12 sm:w-14 h-auto object-contain mx-auto"
              />
            </a>
          </div>
          <div className="design">
            Address: Office 330 second floor admin block <br />
            university of haripur
          </div>
        </div>
      </footer>

      <style>{`
        .custom-footer {
          width: 100%;
          padding: 70px 60px 40px;
          background: #000;
          color: #fff;
          font-family: Arial, sans-serif;
          box-sizing: border-box;
        }
        /* SOCIAL */
        .footer-top {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 30px;
          padding-bottom: 28px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .footer-top a {
          color: #ddd;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 18px;
          white-space: nowrap;
          transition: color 0.2s ease;
        }
        .footer-top a:hover {
          color: #fff;
        }
        .footer-top img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
        }
        /* BOTTOM */
        .footer-bottom {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 20px;
          padding-top: 35px;
        }
        .copy {
          color: #bdbdbd;
          font-size: 16px;
          line-height: 1.5;
        }
        .footer-logo {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .footer-logo img {
          max-width: 55px;
          width: 55px;
          height: auto;
          object-fit: contain;
          display: block;
          margin: 0 auto;
        }
        .design {
          text-align: right;
          color: #bdbdbd;
          font-size: 16px;
          line-height: 1.5;
        }
        /* RESPONSIVE */
        @media(max-width: 991px) {
          .footer-top {
            grid-template-columns: 1fr 1fr;
          }
          .footer-bottom {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .design, .copy {
            text-align: center;
          }
          .footer-logo {
            margin: 12px auto;
          }
          .footer-logo img {
            max-width: 48px;
            width: 48px;
          }
        }
        @media(max-width: 576px) {
          .custom-footer {
            padding: 50px 25px;
          }
          .footer-top {
            grid-template-columns: 1fr;
            gap: 18px;
          }
          .footer-top a {
            justify-content: flex-start;
          }
        }
      `}</style>
    </>
  );
};
