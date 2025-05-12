import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";

const ContactForm = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    licenseType: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'
  const [activeField, setActiveField] = useState(null);
  const [formCompletion, setFormCompletion] = useState(0);

  const licenseTypes = [
    "Select License Type",
    "Microsoft Office",
    "Adobe Creative Cloud",
    "Autodesk AutoCAD",
    "Enterprise ERP Systems",
    "CRM Software",
    "Database Management",
    "Virtual Machine Licenses",
    "Design Software",
    "Development Tools",
    "Other",
  ];

  // Calculate form completion percentage
  useEffect(() => {
    const requiredFields = ["name", "email", "company", "licenseType"];
    const filledFields = requiredFields.filter(
      (field) => formData[field] && formData[field] !== "Select License Type"
    ).length;

    setFormCompletion(Math.round((filledFields / requiredFields.length) * 100));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }

    if (
      !formData.licenseType ||
      formData.licenseType === "Select License Type"
    ) {
      newErrors.licenseType = "Please select a license type";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus("success");

        // Reset form after success
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            company: "",
            licenseType: "",
            message: "",
          });
          setSubmitStatus(null);
        }, 2000);
      }, 1500);
    } else {
      // Shake the form on error
      formRef.current.classList.add("shake");
      setTimeout(() => {
        formRef.current.classList.remove("shake");
      }, 500);
    }
  };

  const handleFocus = (fieldName) => {
    setActiveField(fieldName);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
        when: "beforeChildren",
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const infoVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 15 },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.2,
      },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.4,
      },
    },
  };

  const successVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section
      id="contact"
      className="section bg-white dark:bg-neutral-darkest py-20"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 text-center"
        >
          <motion.h2
            variants={titleVariants}
            className="text-4xl font-bold mb-4 text-gray-800 dark:text-white"
          >
            Get Your License Valuation
          </motion.h2>
          <motion.p
            variants={subtitleVariants}
            className="text-lg text-gray-600 dark:text-neutral-light max-w-2xl mx-auto"
          >
            Fill out the form below to get a free valuation of your software
            licenses. Our experts will contact you within 24 hours.
          </motion.p>
        </motion.div>

        <motion.div
          className="max-w-5xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="bg-neutral-lightest dark:bg-neutral-dark rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-5">
              {/* Contact information */}
              <motion.div
                className="bg-gradient-to-br from-primary to-primary-dark text-white p-8 md:p-10 md:col-span-2"
                variants={infoVariants}
              >
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <p className="mb-8 opacity-90">
                  Fill out the form and our team will get back to you within 24
                  hours
                </p>

                <div className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-start"
                  >
                    <div className="bg-white/20 p-3 rounded-full mr-4">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">Email</h4>
                      <p className="opacity-90">valuation@softsell.com</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex items-start"
                  >
                    <div className="bg-white/20 p-3 rounded-full mr-4">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">Office</h4>
                      <p className="opacity-90">
                        123 Software Lane, Suite 500
                        <br />
                        San Francisco, CA 94107
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="flex items-start"
                  >
                    <div className="bg-white/20 p-3 rounded-full mr-4">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">Phone</h4>
                      <p className="opacity-90">(555) 123-4567</p>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="mt-12"
                >
                  <h4 className="text-lg font-semibold mb-4">
                    We Accept All Major Licenses
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Microsoft",
                      "Adobe",
                      "Oracle",
                      "Autodesk",
                      "IBM",
                      "SAP",
                    ].map((license, index) => (
                      <motion.span
                        key={license}
                        variants={tagVariants}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 1.3 + index * 0.1 }}
                        className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-sm transition-all duration-300"
                      >
                        {license}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Form */}
              <motion.div
                className="p-8 md:p-10 md:col-span-3"
                variants={formVariants}
              >
                {submitStatus === "success" ? (
                  <motion.div
                    className="h-full flex flex-col items-center justify-center text-center"
                    variants={successVariants}
                  >
                    <div className="bg-green-100 dark:bg-green-900/30 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                      <svg
                        className="w-10 h-10 text-green-500 dark:text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                      Request Submitted!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">
                      Thank you for contacting us. We'll be in touch within 24
                      hours.
                    </p>
                    <motion.button
                      onClick={() => setSubmitStatus(null)}
                      className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Submit Another Request
                    </motion.button>
                  </motion.div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Your Information
                      </h3>
                      <div className="flex items-center">
                        <div className="w-16 h-2 bg-gray-200 dark:bg-neutral-800 rounded-full overflow-hidden mr-2">
                          <motion.div
                            className="h-full bg-primary rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${formCompletion}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {formCompletion}%
                        </span>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} ref={formRef} className="">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <motion.div
                          variants={itemVariants}
                          className="relative"
                        >
                          <motion.div
                            initial={{ height: 2 }}
                            animate={{
                              height: activeField === "name" ? 4 : 2,
                              backgroundColor:
                                activeField === "name" ? "#3B82F6" : "#E5E7EB",
                            }}
                            className="absolute bottom-0 left-0 w-full bg-gray-200 dark:bg-neutral-700 rounded-full"
                          />
                          <label
                            htmlFor="name"
                            className="block mb-2 font-medium text-gray-700 dark:text-white"
                          >
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onFocus={() => handleFocus("name")}
                            onBlur={handleBlur}
                            className="w-full px-4 py-3 bg-transparent border-none focus:outline-none text-gray-800 dark:text-white"
                            placeholder="John Doe"
                          />
                          <AnimatePresence>
                            {errors.name && (
                              <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mt-2 text-sm text-red-500"
                              >
                                {errors.name}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </motion.div>

                        <motion.div
                          variants={itemVariants}
                          className="relative"
                        >
                          <motion.div
                            initial={{ height: 2 }}
                            animate={{
                              height: activeField === "email" ? 4 : 2,
                              backgroundColor:
                                activeField === "email" ? "#3B82F6" : "#E5E7EB",
                            }}
                            className="absolute bottom-0 left-0 w-full bg-gray-200 dark:bg-neutral-700 rounded-full"
                          />
                          <label
                            htmlFor="email"
                            className="block mb-2 font-medium text-gray-700 dark:text-white"
                          >
                            Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => handleFocus("email")}
                            onBlur={handleBlur}
                            className="w-full px-4 py-3 bg-transparent border-none focus:outline-none text-gray-800 dark:text-white"
                            placeholder="john@company.com"
                          />
                          <AnimatePresence>
                            {errors.email && (
                              <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mt-2 text-sm text-red-500"
                              >
                                {errors.email}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </motion.div>

                        <motion.div
                          variants={itemVariants}
                          className="relative"
                        >
                          <motion.div
                            initial={{ height: 2 }}
                            animate={{
                              height: activeField === "company" ? 4 : 2,
                              backgroundColor:
                                activeField === "company"
                                  ? "#3B82F6"
                                  : "#E5E7EB",
                            }}
                            className="absolute bottom-0 left-0 w-full bg-gray-200 dark:bg-neutral-700 rounded-full"
                          />
                          <label
                            htmlFor="company"
                            className="block mb-2 font-medium text-gray-700 dark:text-white"
                          >
                            Company <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            onFocus={() => handleFocus("company")}
                            onBlur={handleBlur}
                            className="w-full px-4 py-3 bg-transparent border-none focus:outline-none text-gray-800 dark:text-white"
                            placeholder="Your Company"
                          />
                          <AnimatePresence>
                            {errors.company && (
                              <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mt-2 text-sm text-red-500"
                              >
                                {errors.company}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </motion.div>

                        <motion.div
                          variants={itemVariants}
                          className="relative"
                        >
                          <motion.div
                            initial={{ height: 2 }}
                            animate={{
                              height: activeField === "licenseType" ? 4 : 2,
                              backgroundColor:
                                activeField === "licenseType"
                                  ? "#3B82F6"
                                  : "#E5E7EB",
                            }}
                            className="absolute bottom-0 left-0 w-full bg-gray-200 dark:bg-neutral-700 rounded-full"
                          />
                          <label
                            htmlFor="licenseType"
                            className="block mb-2 font-medium text-gray-700 dark:text-white"
                          >
                            License Type <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="licenseType"
                            name="licenseType"
                            value={formData.licenseType}
                            onChange={handleChange}
                            onFocus={() => handleFocus("licenseType")}
                            onBlur={handleBlur}
                            className="w-full px-4 py-3 bg-transparent border-none focus:outline-none text-gray-800 dark:text-white"
                          >
                            {licenseTypes.map((type) => (
                              <option
                                className="bg-white text-gray-800 dark:bg-neutral-800 dark:text-white"
                                key={type}
                                value={type}
                              >
                                {type}
                              </option>
                            ))}
                          </select>
                          <AnimatePresence>
                            {errors.licenseType && (
                              <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mt-2 text-sm text-red-500"
                              >
                                {errors.licenseType}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </motion.div>

                        <motion.div
                          variants={itemVariants}
                          className="sm:col-span-2 relative"
                        >
                          <motion.div
                            initial={{ height: 2 }}
                            animate={{
                              height: activeField === "message" ? 4 : 2,
                              backgroundColor:
                                activeField === "message"
                                  ? "#3B82F6"
                                  : "#E5E7EB",
                            }}
                            className="absolute bottom-0 left-0 w-full bg-gray-200 dark:bg-neutral-700 rounded-full"
                          />
                          <label
                            htmlFor="message"
                            className="block mb-2 font-medium text-gray-700 dark:text-white"
                          >
                            Message
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            onFocus={() => handleFocus("message")}
                            onBlur={handleBlur}
                            rows="4"
                            className="w-full px-4 py-3 bg-transparent border-none focus:outline-none resize-none text-gray-800 dark:text-white"
                            placeholder="Provide details about your software licenses (quantity, expiration date, etc.)"
                          ></textarea>
                        </motion.div>

                        <motion.div
                          variants={itemVariants}
                          className="sm:col-span-2 mt-4"
                        >
                          <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 px-6 bg-primary text-white rounded-full font-medium flex items-center justify-center"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {isSubmitting ? (
                              <div className="flex items-center">
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: "linear",
                                  }}
                                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                                />
                                Processing...
                              </div>
                            ) : (
                              <div className="flex items-center">
                                <svg
                                  className="w-5 h-5 mr-2"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                  ></path>
                                </svg>
                                Submit Request
                              </div>
                            )}
                          </motion.button>
                        </motion.div>
                      </div>
                    </form>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        
        @keyframes shake {
          10%, 90% { transform: translateX(-1px); }
          20%, 80% { transform: translateX(2px); }
          30%, 50%, 70% { transform: translateX(-4px); }
          40%, 60% { transform: translateX(4px); }
        }
      `}</style>
    </section>
  );
};

export default ContactForm;
