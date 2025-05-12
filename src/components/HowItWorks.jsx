import { motion } from "framer-motion";
import {
  FiUpload,
  FiDollarSign,
  FiBriefcase,
  FiCheckCircle,
  FiArrowRight,
} from "react-icons/fi";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "../../context/ThemeContext";

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { theme } = useTheme();
  const steps = [
    {
      icon: <FiUpload className="text-3xl text-white" />,
      title: "Upload License",
      description:
        "Upload details of your unused software licenses through our secure portal. We support all major software vendors and license types.",
      color: "from-blue-500 to-blue-600",
      lightBg: "from-blue-50 to-blue-100",
      darkBg: "from-blue-900/30 to-blue-800/30",
      tags: ["All License Types", "Major Vendors"],
      delay: 0,
    },
    {
      icon: <FiBriefcase className="text-3xl text-white" />,
      title: "Get Valuation",
      description:
        "Our experts quickly assess your licenses and provide a competitive market valuation within 24 hours, with no obligations.",
      color: "from-purple-500 to-purple-600",
      lightBg: "from-purple-50 to-purple-100",
      darkBg: "from-purple-900/30 to-purple-800/30",
      tags: ["24h Valuation", "No Obligation"],
      delay: 0.2,
    },
    {
      icon: <FiDollarSign className="text-3xl text-white" />,
      title: "Get Paid",
      description:
        "Accept our offer and receive payment through your preferred method. We handle the transfer securely with your buyer.",
      color: "from-green-500 to-green-600",
      lightBg: "from-green-50 to-green-100",
      darkBg: "from-green-900/30 to-green-800/30",
      tags: ["Secure Transfer", "Multiple Payment Options"],
      delay: 0.4,
    },
  ];

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.2, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { y: 80, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 12,
        delay: i * 0.25,
      },
    }),
  };

  const connectingLineVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: { duration: 0.8, delay: 1.2, ease: "easeInOut" },
    },
  };

  const tagVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.5 + i * 0.1,
      },
    }),
  };

  return (
    <section
      id="how-it-works"
      className={`section py-20 md:py-20 ${
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
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 md:mb-24 text-center max-w-3xl mx-auto"
        >
          <motion.span
            variants={titleVariants}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary dark:text-primary-light text-sm font-medium mb-4"
          >
            Simple Three-Step Process
          </motion.span>

          <motion.h2
            variants={titleVariants}
            className="text-3xl md:text-4xl font-bold mb-6 tracking-tight"
          >
            How{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              SoftSell
            </span>{" "}
            Works
          </motion.h2>

          <motion.p
            variants={subtitleVariants}
            className={`${
              theme === "light" ? "text-neutral-dark" : "text-neutral-light"
            } text-xl leading-relaxed`}
          >
            Our streamlined process makes selling your unused software licenses
            quick, secure, and hassle-free in just three simple steps.
          </motion.p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute top-32 left-0 right-0 z-0">
            <div className="flex justify-between mx-24">
              <motion.div
                className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                variants={connectingLineVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              />
            </div>
          </div>

          <div className="hidden md:block absolute top-32 left-1/3 right-0 z-0">
            <div className="flex justify-between mx-24">
              <motion.div
                className="h-1 bg-gradient-to-r from-purple-500 to-green-500 rounded-full"
                variants={connectingLineVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.8, delay: 1.5 }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover={{
                  y: -8,
                  transition: { type: "spring", stiffness: 300, damping: 15 },
                }}
                className="relative"
              >
                <div
                  className={`h-full ${
                    theme === "light" ? "bg-white" : "bg-neutral-dark"
                  } rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden`}
                >
                  <div
                    className={`h-20 bg-gradient-to-r ${step.color} flex items-center justify-center relative`}
                  >
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      {step.icon}
                    </div>

                    <div
                      className={`absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-10 h-10 ${
                        theme === "light" ? "bg-white" : "bg-neutral-darkest"
                      } rounded-full flex items-center justify-center shadow-md border-2 ${
                        theme === "light"
                          ? "border-white"
                          : "border-neutral-dark"
                      }`}
                    >
                      <span
                        className={`font-bold text-transparent bg-clip-text bg-gradient-to-r ${step.color}`}
                      >
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center text-center p-6 pt-8">
                    <h3
                      className={`text-xl font-semibold mb-3 ${
                        theme === "light"
                          ? "text-neutral-darkest"
                          : "text-white"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`${
                        theme === "light"
                          ? "text-neutral-dark"
                          : "text-neutral-light"
                      } mb-6`}
                    >
                      {step.description}
                    </p>

                    <div className="mt-auto flex flex-wrap gap-2 justify-center">
                      {step.tags.map((tag, tagIndex) => (
                        <motion.span
                          key={tagIndex}
                          custom={tagIndex}
                          variants={tagVariants}
                          className="text-xs bg-primary/10 text-primary dark:bg-primary/20 px-3 py-1.5 rounded-full flex items-center font-medium"
                        >
                          <FiCheckCircle className="mr-1.5" /> {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:hidden absolute -top-4 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">
                    {index + 1}
                  </span>
                </div>

                {/* Mobile arrow */}
                {index < steps.length - 1 && (
                  <div className="md:hidden absolute -bottom-6 left-1/2 transform -translate-x-1/2 z-10">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }
                      }
                      transition={{ delay: 0.8 + index * 0.3 }}
                    >
                      <FiArrowRight className="text-primary text-2xl transform rotate-90" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <motion.a
            href="#contact"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", stiffness: 300, damping: 15 },
            }}
            whileTap={{ scale: 0.98 }}
          >
            Start Selling Your Licenses
            <FiArrowRight className="ml-2" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
