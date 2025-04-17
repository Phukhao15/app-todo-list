import { useState } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaPaperPlane, FaEdit } from "react-icons/fa";

export default function TodoForm({ addTodo }) {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      addTodo(text);
      setText("");
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="flex gap-2 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="relative flex-1"
        whileFocus={{ scale: 1.01 }}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Enter a new task..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 pl-10"
        />
        <motion.div
          className="absolute left-3 top-1/2 transform -translate-y-1/2"
          animate={{
            color: isFocused ? "#8b5cf6" : "#9ca3af",
            scale: isFocused ? 1.1 : 1
          }}
          transition={{ duration: 0.2 }}
        >
          {text.length > 0 ? <FaEdit /> : <FaPlus />}
        </motion.div>
      </motion.div>

      <motion.button
        type="submit"
        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={text.trim() === ""}
      >
        <FaPaperPlane />
        <span>Add</span>
      </motion.button>
    </motion.form>
  );
}