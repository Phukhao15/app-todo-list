import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import ErrorBoundary from "./components/ErrorBoundary";

// Custom Hook สำหรับจัดการ localStorage
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }, [key, value]);

  return [value, setValue];
}

export default function App() {
  const [todos, setTodos] = useLocalStorage("todos", []);

  const createTodoItem = (text) => ({
    id: Date.now(),
    text: text.trim(),
    done: false,
    createdAt: new Date().toISOString()
  });

  const addTodo = useCallback((text) => {
    const trimmedText = text.trim();
    const isDuplicate = todos.some(
      todo => todo.text.toLowerCase() === trimmedText.toLowerCase()
    );

    if (!trimmedText) return alert("Todo text cannot be empty!");
    if (isDuplicate) return alert("This todo already exists!");

    setTodos(prev => [...prev, createTodoItem(trimmedText)]);
  }, [todos, setTodos]);

  const toggleTodo = useCallback((id) => {
    setTodos(prev =>
      prev.map(todo => 
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }, [setTodos]);

  const deleteTodo = useCallback((id) => {
    if (window.confirm("คุณต้องการลบใช่ไหม ?")) {
      setTodos(prev => prev.filter(todo => todo.id !== id));
    }
  }, [setTodos]);

  return (
    <ErrorBoundary>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-gradient-to-tr from-blue-100 to-purple-200 p-4"
      >
        <div className="max-w-xl mx-auto bg-white shadow-2xl rounded-2xl p-6 mt-10">
          <Header todoCount={todos.length} />
          <TodoForm addTodo={addTodo} />
          <TodoList 
            todos={todos} 
            toggleTodo={toggleTodo} 
            deleteTodo={deleteTodo} 
          />
        </div>
      </motion.div>
    </ErrorBoundary>
  );
}