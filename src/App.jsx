import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import WhyChooseUs from "./components/WhyChooseUs.jsx";
import Testimonials from "./components/Testimonials.jsx";
import ContactForm from "./components/ContactForm.jsx";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget.jsx";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext.jsx";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`transition-colors duration-300 ${
        theme === "light" ? "bg-white" : "bg-neutral-darkest"
      }`}
    >
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            className="fixed inset-0 bg-white dark:bg-neutral-darkest flex items-center justify-center z-50"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                repeat: Infinity,
                repeatType: "reverse",
                duration: 1,
              }}
              className="w-16 h-16 rounded-full border-4 border-t-primary border-r-primary border-b-secondary border-l-secondary"
            />
            <motion.h1
              className="absolute mt-24 text-xl font-bold text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              SoftSell
            </motion.h1>
          </motion.div>
        ) : (
          <div className="min-h-screen">
            <Header />
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden"
            >
              <Hero />
              <HowItWorks />
              <WhyChooseUs />
              <Testimonials />
              <ContactForm />
            </motion.main>
            <Footer />
            <ChatWidget />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
