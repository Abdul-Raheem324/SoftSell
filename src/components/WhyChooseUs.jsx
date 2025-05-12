import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import {
  FiShield,
  FiDollarSign,
  FiClock,
  FiUsers,
  FiArrowRight,
} from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { theme } = useTheme();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const benefits = [
    {
      icon: <FiDollarSign className="text-3xl text-white" />,
      title: "Maximize Your Return",
      description:
        "Our expert marketplace consistently achieves 15-30% higher returns compared to direct resale or traditional brokers. We analyze the market to ensure you get the best value for your licenses.",
      color: "bg-gradient-to-br from-blue-500 to-blue-700",
    },
    {
      icon: <FiShield className="text-3xl text-white" />,
      title: "100% Secure & Compliant",
      description:
        "We handle all compliance and security aspects of the transfer. Our platform ensures all transactions adhere to licensing agreements and regulations, protecting both sellers and buyers.",
      color: "bg-gradient-to-br from-green-500 to-green-700",
    },
    {
      icon: <FiClock className="text-3xl text-white" />,
      title: "Fast Transaction Times",
      description:
        "From valuation to payment, our streamlined process takes as little as 5 business days. No lengthy negotiations or complicated paperwork - we handle everything efficiently.",
      color: "bg-gradient-to-br from-purple-500 to-purple-700",
    },
    {
      icon: <FiUsers className="text-3xl text-white" />,
      title: "Dedicated Account Manager",
      description:
        "Every seller gets a personal account manager to guide you through the process. Our team of software licensing experts is available to answer questions and optimize your sale.",
      color: "bg-gradient-to-br from-orange-500 to-orange-700",
    },
  ];

  return (
    <section
      id="why-choose-us"
      className={`section py-12 md:py-14 ${
        theme === "light" ? "bg-neutral-lightest" : "bg-neutral-darkest"
      } relative overflow-hidden`}
      ref={sectionRef}
    >
      <div className="absolute -z-10 inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.5 } : { opacity: 0 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute top-1/4 -left-20 w-40 h-40 rounded-full bg-primary/10 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.4 } : { opacity: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute bottom-1/4 -right-20 w-40 h-40 rounded-full bg-secondary/10 blur-3xl"
        />
      </div>

      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16 md:mb-24 text-center max-w-3xl mx-auto"
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Why Choose Us
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-heading">
            The SoftSell Advantage
          </h2>
          <p
            className={`text-xl leading-relaxed font-body ${
              theme === "light" ? "text-neutral-dark" : "text-neutral-light"
            }`}
          >
            We've helped hundreds of businesses recover value from their unused
            software licenses with our expert marketplace platform.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`${
                theme === "light" ? "bg-white" : "bg-neutral-dark"
              } rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group`}
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              <div className="flex flex-col h-full">
                <div
                  className={`${benefit.color} p-6 flex items-center justify-between`}
                >
                  <div className="rounded-full bg-white/20 backdrop-blur-sm p-4 shadow-lg">
                    {benefit.icon}
                  </div>
                  <motion.div
                    className="opacity-0 group-hover:opacity-100"
                    initial={{ x: -10, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiArrowRight className="text-white text-xl" />
                  </motion.div>
                </div>
                <div className="p-8">
                  <h3
                    className={`text-xl font-semibold mb-4 font-heading ${
                      theme === "light" ? "text-neutral-darkest" : "text-white"
                    }`}
                  >
                    {benefit.title}
                  </h3>
                  <p
                    className={`font-body leading-relaxed ${
                      theme === "light"
                        ? "text-neutral-dark"
                        : "text-neutral-light"
                    }`}
                  >
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <motion.a
            href="#contact"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all font-body"
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", stiffness: 300, damping: 15 },
            }}
            whileTap={{ scale: 0.98 }}
          >
            Start Your Valuation Now
            <FiArrowRight className="ml-2 text-white" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
