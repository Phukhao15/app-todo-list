import { motion } from "framer-motion";
import { FaCheck, FaTrash, FaRegCircle, FaCircle } from "react-icons/fa";

export default function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      layout
      className="flex items-center justify-between bg-white dark:bg-gray-800 px-4 py-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center flex-1">
        <motion.button
          onClick={() => toggleTodo(todo.id)}
          whileTap={{ scale: 0.9 }}
          className="mr-3 text-gray-400 hover:text-green-500 focus:outline-none"
          aria-label={todo.done ? "Mark as incomplete" : "Mark as complete"}
        >
          {todo.done ? (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-green-500"
            >
              <FaCheck className="text-xl" />
            </motion.div>
          ) : (
            <FaRegCircle className="text-xl" />
          )}
        </motion.button>

        <motion.span
          className={`flex-1 cursor-pointer ${
            todo.done ? "line-through text-gray-400 dark:text-gray-500" : "text-gray-800 dark:text-gray-200"
          }`}
          onClick={() => toggleTodo(todo.id)}
          initial={{ x: 0 }}
          animate={{
            x: todo.done ? 4 : 0,
            opacity: todo.done ? 0.8 : 1
          }}
          transition={{ duration: 0.2 }}
        >
          {todo.text}
        </motion.span>
      </div>

      <motion.button
        onClick={() => deleteTodo(todo.id)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="ml-4 text-gray-400 hover:text-red-500 dark:hover:text-red-400 p-1 rounded-full focus:outline-none"
        aria-label="Delete task"
      >
        <FaTrash />
      </motion.button>
    </motion.li>
  );
}