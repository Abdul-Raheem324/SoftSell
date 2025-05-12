import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const isLight = theme === "light";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    // Get header height to adjust scroll position
    const headerHeight = document.querySelector("header").offsetHeight;

    // Calculate position with offset for header
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

    // Smooth scroll to the target section
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Why Choose Us", href: "#why-choose-us" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  const logoVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "afterChildren",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const mobileNavItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.1 } },
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? isLight
            ? "bg-white bg-opacity-95 shadow-lg py-2"
            : "bg-neutral-darkest bg-opacity-95 shadow-lg py-2"
          : isLight
          ? "bg-white bg-opacity-80 py-6"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          <motion.a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center space-x-2"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-r from-primary to-secondary shadow-md">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span
              className={`text-2xl font-extrabold tracking-tight ${
                isLight ? "text-neutral-darkest" : "text-white"
              }`}
            >
              <span className="text-primary">Soft</span>
              <span>Sell</span>
            </span>
          </motion.a>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`${
                  isLight
                    ? "text-neutral-dark hover:text-primary"
                    : "text-neutral-light hover:text-primary"
                } transition-colors relative font-medium tracking-wide text-sm uppercase`}
                custom={index}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
              >
                {link.name}
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                isLight
                  ? "hover:bg-neutral-light text-neutral-dark"
                  : "hover:bg-neutral-dark text-white"
              } transition-colors`}
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              aria-label={
                isLight ? "Switch to dark mode" : "Switch to light mode"
              }
            >
              {isLight ? (
                <FiMoon className="text-lg" />
              ) : (
                <FiSun className="text-lg" />
              )}
            </motion.button>

            <motion.a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className={`hidden md:flex items-center justify-center px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-medium tracking-wide shadow-md text-sm ${
                isLight ? "hover:shadow-lg" : "hover:shadow-primary/30"
              }`}
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              Get Started
            </motion.a>

            <motion.button
              onClick={toggleMobileMenu}
              className="md:hidden p-2"
              variants={buttonVariants}
              initial="initial"
              whileTap="tap"
              aria-label="Toggle mobile menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiX
                      className={`h-6 w-6 ${
                        isLight ? "text-neutral-dark" : "text-white"
                      }`}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiMenu
                      className={`h-6 w-6 ${
                        isLight ? "text-neutral-dark" : "text-white"
                      }`}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden overflow-hidden"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div
              className={`container mx-auto px-4 py-4 shadow-lg rounded-b-lg ${
                isLight
                  ? "bg-white border-t border-gray-100"
                  : "bg-neutral-darkest border-t border-gray-800"
              }`}
            >
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`py-3 px-2 font-medium text-lg border-b ${
                      isLight
                        ? "text-neutral-dark hover:text-primary border-gray-100"
                        : "text-neutral-light hover:text-primary border-gray-800"
                    } flex items-center`}
                    variants={mobileNavItemVariants}
                    whileHover={{ x: 5, color: "#6366f1" }}
                  >
                    {link.name}
                  </motion.a>
                ))}
                <motion.a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className={`mt-4 py-3 px-6 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-full text-center ${
                    isLight ? "shadow-md" : "shadow-lg shadow-primary/20"
                  }`}
                  variants={mobileNavItemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                </motion.a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
