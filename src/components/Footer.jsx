import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiLinkedin,
  FiTwitter,
  FiFacebook,
} from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();
  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Why Choose Us", href: "#why-choose-us" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  const resources = [
    { name: "License Valuation Guide", href: "#" },
    { name: "Software Transfer FAQ", href: "#" },
    { name: "Success Stories", href: "#" },
    { name: "Blog", href: "#" },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className={`${
        theme === "light"
          ? "bg-gray-100 text-gray-800 border-t border-gray-200"
          : "bg-neutral-darkest text-white"
      } pb-6 transition-colors duration-300`}
    >
      <div className="container-custom">
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-md flex items-center justify-center bg-gradient-to-r from-primary to-secondary text-white font-bold">
                S
              </div>
              <h4
                className={`text-xl font-bold font-heading ${
                  theme === "light" ? "text-gray-900" : "text-white"
                }`}
              >
                SoftSell
              </h4>
            </div>
            <p
              className={`text-sm ${
                theme === "light" ? "text-gray-600" : "text-neutral-light"
              }`}
            >
              Reselling software licenses made easy. Get more value from what
              you already own.
            </p>
          </div>

          <div>
            <h5
              className={`text-lg font-semibold mb-4 ${
                theme === "light" ? "text-gray-900" : "text-white"
              }`}
            >
              Quick Links
            </h5>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className={`${
                      theme === "light"
                        ? "text-gray-600 hover:text-primary"
                        : "text-neutral-light hover:text-primary-light"
                    } transition-all`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5
              className={`text-lg font-semibold mb-4 ${
                theme === "light" ? "text-gray-900" : "text-white"
              }`}
            >
              Resources
            </h5>
            <ul className="space-y-2 text-sm">
              {resources.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className={`${
                      theme === "light"
                        ? "text-gray-600 hover:text-primary"
                        : "text-neutral-light hover:text-primary-light"
                    } transition-all`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5
              className={`text-lg font-semibold mb-4 ${
                theme === "light" ? "text-gray-900" : "text-white"
              }`}
            >
              Contact Us
            </h5>
            <ul className="space-y-3 text-sm">
              <li
                className={`flex items-center gap-2 ${
                  theme === "light" ? "text-gray-600" : "text-neutral-light"
                }`}
              >
                <FiMail className="text-primary" /> support@softsell.com
              </li>
              <li
                className={`flex items-center gap-2 ${
                  theme === "light" ? "text-gray-600" : "text-neutral-light"
                }`}
              >
                <FiPhone className="text-primary" /> +1 (800) 123-4567
              </li>
              <li
                className={`flex items-center gap-2 ${
                  theme === "light" ? "text-gray-600" : "text-neutral-light"
                }`}
              >
                <FiMapPin className="text-primary" /> Remote-first, Global Team
              </li>
            </ul>

            <div className="flex mt-4 space-x-4 text-xl">
              <a
                href="#"
                className={`${
                  theme === "light"
                    ? "text-gray-600 hover:text-primary"
                    : "text-neutral-light hover:text-primary"
                } transition`}
              >
                <FiLinkedin />
              </a>
              <a
                href="#"
                className={`${
                  theme === "light"
                    ? "text-gray-600 hover:text-primary"
                    : "text-neutral-light hover:text-primary"
                } transition`}
              >
                <FiTwitter />
              </a>
              <a
                href="#"
                className={`${
                  theme === "light"
                    ? "text-gray-600 hover:text-primary"
                    : "text-neutral-light hover:text-primary"
                } transition`}
              >
                <FiFacebook />
              </a>
            </div>
          </div>
        </div>

        <div
          className={`${
            theme === "light"
              ? "border-t border-gray-200 text-gray-500"
              : "border-t border-neutral-700 text-neutral-light"
          } pt-6 mt-6 flex flex-col md:flex-row items-center justify-between text-sm`}
        >
          <p>© {currentYear} SoftSell. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className={`mt-4 md:mt-0 ${
              theme === "light"
                ? "text-primary hover:text-primary-dark"
                : "text-primary hover:underline"
            }`}
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
