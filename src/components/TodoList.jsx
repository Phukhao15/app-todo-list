import { AnimatePresence, motion } from "framer-motion";
import TodoItem from "./TodoItem";
import { FaClipboardList } from "react-icons/fa";

export default function TodoList({ todos, toggleTodo, deleteTodo }) {
  return (
    <div className="mt-4">
      <AnimatePresence mode="popLayout">
        {todos.length === 0 ? (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center py-8 text-center"
          >
            <FaClipboardList className="text-4xl text-gray-300 mb-4" />
            <motion.p className="text-gray-500 text-lg">
              ไม่มีโน๊ต
            </motion.p>
            <motion.p className="text-gray-400 mt-2">
              เริ่มต้นวันใหม่ ด้วยงานแรกของคุณ
            </motion.p>
          </motion.div>
        ) : (
          <motion.ul 
            key="todo-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            <AnimatePresence>
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                />
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}