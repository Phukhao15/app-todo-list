import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaCheck, FaPlus, FaClipboardList } from 'react-icons/fa';

export default function Header({ todoCount = 0, showTaskPrompt = true }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6 text-center"
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        <motion.div
          whileHover={{ rotate: 10, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaCheck className="text-2xl text-green-500" />
        </motion.div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          My To-Do List
        </h1>
      </div>

      {showTaskPrompt && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-4"
        >
          <p className="text-gray-600 dark:text-gray-300">
            เพิ่มงานใหม่...
          </p>
        </motion.div>
      )}

      {todoCount === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400"
        >
          <FaClipboardList />
          <span>เพิ่ม To-Do ของคุณ...</span>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="inline-flex items-center mt-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-800 dark:text-blue-200 text-sm"
        >
          <FaCheck className="mr-2" />
          <span>
            {todoCount} {todoCount === 1 ? 'เพิ่ม' : 'tasks'} สำเร็จ
          </span>
        </motion.div>
      )}
    </motion.header>
  );
}

Header.propTypes = {
  todoCount: PropTypes.number,
  showTaskPrompt: PropTypes.bool,
};

Header.defaultProps = {
  todoCount: 0,
  showTaskPrompt: true,
};