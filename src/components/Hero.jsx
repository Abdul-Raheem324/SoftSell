import { motion } from "framer-motion";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 12,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 10,
        delay: 0.7 + i * 0.15,
      },
    }),
  };

  const features = [
    "Get top value for your unused licenses",
    "Quick, secure, and transparent process",
    "Verified buyers waiting for your software",
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen pt-20 pb-16 md:pt-32 md:pb-24 flex items-center"
    >
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div
          className="absolute top-24 right-0 w-2/3 h-2/3 bg-gradient-to-b from-primary-light/20 to-transparent rounded-full blur-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <motion.div
          className="absolute -bottom-16 -left-16 w-2/3 h-2/3 bg-gradient-to-t from-secondary-light/20 to-transparent rounded-full blur-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 2.5, delay: 0.5, ease: "easeOut" }}
        />
      </div>

      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div
            className="w-full lg:w-1/2 mb-16 lg:mb-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              variants={itemVariants}
              className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary dark:text-primary-light text-sm font-medium mb-6"
            >
              Software License Marketplace
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight dark:text-white tracking-tight"
            >
              Transform Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Unused Software
              </span>{" "}
              Into Real Cash
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-neutral-dark dark:text-neutral-light mb-8 leading-relaxed"
            >
              SoftSell helps businesses monetize their surplus software licenses
              with our secure marketplace platform. Sell your unused licenses
              quickly and safely.
            </motion.p>

            <motion.div variants={itemVariants} className="space-y-4 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.2 }}
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                    <FiCheckCircle className="text-primary" size={14} />
                  </div>
                  <p className="dark:text-neutral-light font-medium">
                    {feature}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <motion.a
                href="#contact"
                className="btn btn-primary text-center group relative overflow-hidden px-8 py-3 rounded-lg"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10 flex items-center justify-center font-medium">
                  Sell My Licenses
                  <motion.span
                    className="ml-2 inline-flex"
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <FiArrowRight />
                  </motion.span>
                </span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-primary to-secondary"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{
                    type: "tween",
                    ease: "easeInOut",
                    duration: 0.3,
                  }}
                />
              </motion.a>

              <motion.a
                href="#how-it-works"
                className="btn btn-outline text-center dark:text-white dark:border-white flex items-center justify-center font-medium"
                whileHover={{
                  scale: 1.03,
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                Learn How It Works
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full lg:w-1/2 lg:pl-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            <div className="relative bg-white dark:bg-neutral-dark rounded-2xl shadow-xl p-5 md:p-8 perspective-800">
              <motion.div
                className="bg-gradient-to-br from-primary/40 to-secondary/40 rounded-xl p-4 md:p-6"
                initial={{ rotateY: -15, rotateX: 10 }}
                animate={{ rotateY: 0, rotateX: 0 }}
                transition={{ duration: 1.2, delay: 1 }}
                whileHover={{
                  rotateY: 5,
                  rotateX: -5,
                  transition: { duration: 0.5 },
                }}
              >
                <div className="bg-white dark:bg-neutral-darkest rounded-lg p-4 shadow-inner">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-md flex items-center justify-center">
                        <span className="text-white font-bold text-xs">S</span>
                      </div>
                      <h3 className="ml-2 font-medium dark:text-white">
                        SoftSell Portal
                      </h3>
                    </div>
                    <div className="text-xs px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded-full font-medium flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                      Connected
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        name: "Adobe Creative Cloud",
                        price: "$349.99",
                        type: "Enterprise License",
                        expires: "18mo remaining",
                        index: 0,
                      },
                      {
                        name: "Microsoft Office Suite",
                        price: "$219.50",
                        type: "Professional License",
                        expires: "12mo remaining",
                        index: 1,
                      },
                      {
                        name: "Autodesk AutoCAD",
                        price: "$594.75",
                        type: "Commercial License",
                        expires: "24mo remaining",
                        index: 2,
                      },
                    ].map((license) => (
                      <motion.div
                        key={license.name}
                        className="bg-neutral-light dark:bg-neutral-dark rounded-lg p-4 border border-transparent hover:border-primary/20 transition-colors"
                        variants={cardVariants}
                        custom={license.index}
                        initial="hidden"
                        animate="visible"
                        whileHover={{
                          y: -4,
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          transition: { duration: 0.2 },
                        }}
                      >
                        <div className="flex justify-between mb-1">
                          <p className="text-sm font-semibold dark:text-white">
                            {license.name}
                          </p>
                          <p className="text-sm font-bold text-green-600">
                            {license.price}
                          </p>
                        </div>
                        <div className="flex justify-between text-xs text-neutral-dark dark:text-neutral-light">
                          <p>{license.type}</p>
                          <p>Expires: {license.expires}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 0.5 }}
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: "rgba(99, 102, 241, 0.15)",
                      transition: { duration: 0.2 },
                    }}
                  >
                    <p className="text-sm text-primary dark:text-primary-light font-semibold">
                      Total Value: $1,164.24
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -top-6 -right-6 bg-white dark:bg-neutral-dark shadow-lg rounded-full p-3 z-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.9, duration: 0.5 }}
                whileHover={{
                  y: -5,
                  rotate: 10,
                  transition: { duration: 0.3, type: "spring" },
                }}
              >
                <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-100 flex items-center justify-center font-bold">
                  $$$
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 bg-white dark:bg-neutral-dark shadow-lg rounded-full p-2 z-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.5 }}
                whileHover={{
                  y: -5,
                  rotate: -10,
                  transition: { duration: 0.3, type: "spring" },
                }}
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-100 flex items-center justify-center text-xs font-bold">
                  +45%
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
