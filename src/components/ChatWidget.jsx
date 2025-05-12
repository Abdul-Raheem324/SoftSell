import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi there! How can I help you with SoftSell today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [chatHeight, setChatHeight] = useState(400);

  useEffect(() => {
    const updateHeight = () => {
      const maxHeight = window.innerHeight * 0.7;
      setChatHeight(Math.min(400, maxHeight));
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // Sample Q&A database for the chatbot
  const qaPairs = {
    "how do i sell my license":
      "To sell your license with SoftSell, simply click on the 'Sell My License' button, fill out the form with details about your software license, and our team will get back to you with a valuation within 24 hours.",
    "what types of software do you buy":
      "We purchase licenses for a wide range of business software including Adobe Creative Suite, Microsoft Office, AutoCAD, SQL Server, Oracle, SAP, and many more enterprise applications. If you're unsure about your software, just ask us!",
    "how much can i get for my license":
      "License values depend on various factors including software type, remaining validity period, and current market demand. Typically, you can expect 40-70% of the original purchase price for licenses with significant time remaining.",
    "how long does the process take":
      "Our process is quick! After submitting your license details, you'll receive a valuation within 24 hours. Once you accept our offer, payment is typically processed within 2-3 business days.",
    "is this legal":
      "Absolutely! Software license resale is completely legal as long as it adheres to the specific terms of the license agreement. SoftSell ensures all transactions are compliant with applicable laws and license terms.",
    "what payment methods do you offer":
      "We offer multiple payment options including direct bank transfer, PayPal, and cryptocurrency transfers for your convenience.",
    "how do you determine the value":
      "Our valuation algorithm considers the current market rate, remaining license duration, demand trends, and original purchase price to offer you the most competitive rate possible.",
    "who buys these licenses":
      "Our customers include businesses of all sizes looking to reduce software costs, from startups to established enterprises who prefer pre-owned software licenses for better value.",
    hello:
      "Hello! Welcome to SoftSell. How can I assist you with selling your software licenses today?",
    hi: "Hi there! How can I help you with SoftSell today?",
    help: "I'd be happy to help! You can ask me about how to sell your licenses, what types of software we accept, payment methods, or any other questions about SoftSell's services.",
  };

  const getAIResponse = (userMessage) => {
    setIsTyping(true);

    setTimeout(() => {
      const userMessageLower = userMessage.toLowerCase();

      let response = null;
      for (const [question, answer] of Object.entries(qaPairs)) {
        if (userMessageLower.includes(question)) {
          response = answer;
          break;
        }
      }

      // If no match found, provide a default response
      if (!response) {
        if (
          userMessageLower.includes("thank") ||
          userMessageLower.includes("thanks")
        ) {
          response =
            "You're welcome! Let me know if you have any other questions about SoftSell.";
        } else if (
          userMessageLower.includes("bye") ||
          userMessageLower.includes("goodbye")
        ) {
          response =
            "Thank you for chatting with SoftSell! Feel free to reach out anytime you have questions.";
        } else {
          response =
            "I don't have specific information about that yet. For detailed assistance, please contact our support team through the contact form or try asking about how to sell licenses, our process, or payment methods.";
        }
      }

      setMessages((prev) => [...prev, { sender: "bot", text: response }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const userMessage = input;
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");

    getAIResponse(userMessage);
  };

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Example questions for user selection
  const exampleQuestions = [
    "How do I sell my license?",
    "What types of software do you buy?",
    "How much can I get for my license?",
    "Is this legal?",
  ];

  const handleExampleClick = (question) => {
    setMessages((prev) => [...prev, { sender: "user", text: question }]);
    getAIResponse(question);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#2D9CDB] text-white shadow-lg hover:bg-[#1B7DBB] transition-all"
        aria-label="Open chat"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? "close" : "open"}
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 180, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <X size={20} /> : <MessageSquare size={20} />}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-20 right-0 w-80 sm:w-96 bg-white rounded-lg shadow-xl flex flex-col"
            style={{ height: `${chatHeight}px`, maxHeight: "70vh" }}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
          >
            <div className="bg-[#2D9CDB] text-white p-4 rounded-t-lg flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <motion.div
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                <h3 className="font-medium">SoftSell Assistant</h3>
              </div>
              <motion.button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={18} />
              </motion.button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F9FAFB]">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div
                    className={`max-w-3/4 p-3 rounded-lg shadow-sm ${
                      message.sender === "user"
                        ? "bg-[#2D9CDB] text-white rounded-br-none"
                        : "bg-[#E9F7EF] text-gray-800 rounded-bl-none border border-[#D4EFDF]"
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="bg-white text-gray-800 p-3 rounded-lg rounded-bl-none shadow-sm border border-gray-100">
                    <div className="flex space-x-1">
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.6,
                          delay: 0.2,
                        }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.6,
                          delay: 0.4,
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <motion.div
              className="px-4 py-2 border-t border-gray-200 bg-[#F9FAFB]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-gray-500">
                  SUGGESTED QUESTIONS
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {exampleQuestions.map((question, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleExampleClick(question)}
                    className="text-xs bg-[#F9FAFB] hover:bg-[#EAF4FB] rounded-full px-3 py-1 text-gray-700 transition-colors border border-[#E0F0FA] shadow-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    {question}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.form
              onSubmit={handleSend}
              className="p-3 border-t border-gray-200 flex bg-white rounded-b-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border border-gray-200 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D9CDB]"
              />
              <motion.button
                type="submit"
                className="bg-[#2D9CDB] text-white rounded-r-lg px-4 py-2 hover:bg-[#1B7DBB] transition-colors flex items-center justify-center"
                disabled={input.trim() === ""}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send size={18} />
              </motion.button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWidget;
