import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

const Testimonials = () => {
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const maxTestimonials = testimonialData.length;
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const { theme } = useTheme();

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % maxTestimonials);
  };

  const prevTestimonial = () => {
    setActiveTestimonial(
      (prev) => (prev - 1 + maxTestimonials) % maxTestimonials
    );
  };

  useEffect(() => {
    if (!isInView || isDragging) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);

    return () => clearInterval(interval);
  }, [isInView, isDragging]);

  // Drag functionality
  const handleDragStart = (e) => {
    setIsDragging(true);
    setDragStartX(e.clientX || (e.touches && e.touches[0].clientX) || 0);
  };

  const handleDragEnd = (e) => {
    if (!isDragging) return;

    const dragEndX =
      e.clientX || (e.changedTouches && e.changedTouches[0].clientX) || 0;
    const diff = dragEndX - dragStartX;

    if (Math.abs(diff) > 50) {
      // If dragged more than 50px
      if (diff > 0) {
        prevTestimonial();
      } else {
        nextTestimonial();
      }
    }

    setIsDragging(false);
  };

  const handleDragMove = (e) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
  };
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const quoteVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  return (
    <section
      id="testimonials"
      className={`section py-16 transition-colors duration-500 ${
        theme === "light"
          ? "bg-gradient-to-b from-blue-50 to-white text-gray-800"
          : "bg-gray-900 text-white"
      }`}
      ref={sectionRef}
    >
      <div className="container mx-auto px-4 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 text-center"
        >
          <motion.div variants={itemVariants} className="inline-block mb-2">
            <span
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                theme === "light"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-blue-900 text-blue-200"
              }`}
            >
              Client Stories
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className={`text-4xl font-bold mb-4 ${
              theme === "light" ? "text-gray-800" : "text-white"
            }`}
          >
            What Our Clients Say
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="w-24 h-1 mx-auto mb-6 rounded"
            style={{
              background: "linear-gradient(90deg, #3B82F6 0%, #60A5FA 100%)",
            }}
          />

          <motion.p
            variants={itemVariants}
            className={`max-w-2xl mx-auto text-lg ${
              theme === "light" ? "text-gray-600" : "text-gray-300"
            }`}
          >
            Hear from businesses that have successfully recovered value from
            their unused software licenses with SoftSell.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-5xl mx-auto"
        >
          <div
            className="relative overflow-hidden pb-10"
            ref={carouselRef}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="px-4"
              >
                <motion.div
                  className={`rounded-xl shadow-xl p-8 relative ${
                    theme === "light"
                      ? "bg-white border border-gray-100"
                      : "bg-gray-800 border border-gray-700"
                  }`}
                  variants={quoteVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full flex items-center justify-center bg-blue-600">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 11H6.5C5.67 11 5 10.33 5 9.5V9C5 7.34 6.34 6 8 6H8.5C9.05 6 9.5 5.55 9.5 5V4.5C9.5 3.95 9.05 3.5 8.5 3.5H8C4.96 3.5 2.5 5.96 2.5 9V9.5C2.5 12.54 4.96 15 8 15H10C10.55 15 11 14.55 11 14V12C11 11.45 10.55 11 10 11ZM21.5 11H18C17.17 11 16.5 10.33 16.5 9.5V9C16.5 7.34 17.84 6 19.5 6H20C20.55 6 21 5.55 21 5V4.5C21 3.95 20.55 3.5 20 3.5H19.5C16.46 3.5 14 5.96 14 9V9.5C14 12.54 16.46 15 19.5 15H21.5C22.05 15 22.5 14.55 22.5 14V12C22.5 11.45 22.05 11 21.5 11Z"
                        fill="white"
                      />
                    </svg>
                  </div>

                  <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
                    <motion.div
                      className={`w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 ${
                        theme === "light"
                          ? "border-blue-100"
                          : "border-blue-900"
                      } shadow-lg`}
                      whileHover={{ scale: 1.05 }}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                          testimonialData[activeTestimonial].name
                        )}&background=random&bold=true`}
                        alt={testimonialData[activeTestimonial].name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>

                    <motion.div
                      className="text-center md:text-left"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h4
                        className={`font-bold text-xl mb-1 ${
                          theme === "light" ? "text-gray-800" : "text-white"
                        }`}
                      >
                        {testimonialData[activeTestimonial].name}
                      </h4>
                      <p
                        className={`text-lg ${
                          theme === "light" ? "text-gray-600" : "text-gray-300"
                        }`}
                      >
                        {testimonialData[activeTestimonial].role}
                      </p>
                      <p
                        className={`font-medium ${
                          theme === "light" ? "text-blue-600" : "text-blue-400"
                        }`}
                      >
                        {testimonialData[activeTestimonial].company}
                      </p>
                      <div className="flex items-center justify-center md:justify-start mt-2">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + i * 0.1 }}
                          >
                            <FiStar
                              size={18}
                              className={`${
                                i < testimonialData[activeTestimonial].stars
                                  ? "text-yellow-400 fill-yellow-400"
                                  : theme === "light"
                                  ? "text-gray-300"
                                  : "text-gray-600"
                              }`}
                            />
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  <motion.blockquote
                    className={`text-xl italic mb-6 leading-relaxed ${
                      theme === "light" ? "text-gray-700" : "text-gray-200"
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    "{testimonialData[activeTestimonial].quote}"
                  </motion.blockquote>

                  <motion.div
                    className={`mt-6 flex items-center ${
                      theme === "light" ? "text-gray-600" : "text-gray-300"
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        theme === "light"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-gray-700 text-blue-300"
                      }`}
                    >
                      {testimonialData[activeTestimonial].licenseType}
                    </span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <motion.button
              onClick={prevTestimonial}
              className={`p-4 rounded-full shadow-lg ${
                theme === "light"
                  ? "bg-white text-gray-800 hover:bg-gray-50"
                  : "bg-gray-800 text-gray-200 hover:bg-gray-700"
              } transition-colors duration-300`}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous testimonial"
            >
              <FiChevronLeft size={20} />
            </motion.button>

            <div className="flex gap-3 mx-2">
              {testimonialData.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === activeTestimonial
                      ? "bg-blue-600"
                      : theme === "light"
                      ? "bg-gray-200"
                      : "bg-gray-700"
                  } transition-all duration-300`}
                  animate={{
                    scale: index === activeTestimonial ? 1.2 : 1,
                    opacity: index === activeTestimonial ? 1 : 0.7,
                  }}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              className={`p-4 rounded-full shadow-lg ${
                theme === "light"
                  ? "bg-white text-gray-800 hover:bg-gray-50"
                  : "bg-gray-800 text-gray-200 hover:bg-gray-700"
              } transition-colors duration-300`}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next testimonial"
            >
              <FiChevronRight size={20} />
            </motion.button>
          </div>

          <motion.div
            className="text-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <span
              className={`text-sm font-medium ${
                theme === "light" ? "text-gray-500" : "text-gray-400"
              }`}
            >
              {activeTestimonial + 1} of {maxTestimonials}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Testimonial data
const testimonialData = [
  {
    name: "Sarah Johnson",
    role: "IT Director",
    company: "Global Tech Solutions",
    quote:
      "SoftSell helped us recover over $50,000 from unused Adobe and Microsoft licenses after a department restructuring. The entire process was smooth and their valuation exceeded our expectations by 22%.",
    stars: 5,
    licenseType: "Enterprise Software Bundle",
  },
  {
    name: "David Chen",
    role: "CFO",
    company: "Innovative Designs Inc.",
    quote:
      "As we migrated to cloud services, we had dozens of CAD software licenses sitting idle. SoftSell found qualified buyers within days and handled all the complex compliance issues. Exceptional service!",
    stars: 5,
    licenseType: "Design & Engineering Software",
  },
  {
    name: "Michael Rodriguez",
    role: "Operations Manager",
    company: "Streamline Manufacturing",
    quote:
      "Working with SoftSell was refreshingly straightforward. Their transparent process and regular updates kept us informed, and the final payment for our excess ERP licenses came through faster than promised.",
    stars: 4,
    licenseType: "ERP System Licenses",
  },
];

export default Testimonials;
