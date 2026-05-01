import { useState, useEffect } from 'react';
import { getMessages, markMessageRead } from '../../api/adminApi';
import { motion } from 'framer-motion';
import { FiEye } from 'react-icons/fi';

const MessagesManager = () => {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchMessages = async () => {
    const data = await getMessages();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleOpen = async (msg) => {
    if (!msg.read) {
      await markMessageRead(msg._id);
      msg.read = true;
    }
    setSelected(msg);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Contact Messages</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {/* Message list */}
        <div className="md:col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow p-4 space-y-3">
          {messages.map((msg) => (
            <motion.div
              key={msg._id}
              whileHover={{ scale: 1.01 }}
              className={`p-3 rounded-lg cursor-pointer ${
                selected?._id === msg._id ? 'bg-primary-100 dark:bg-primary-900' : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
              onClick={() => handleOpen(msg)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{msg.name}</h3>
                {!msg.read && <span className="w-2 h-2 bg-primary-500 rounded-full"></span>}
              </div>
              <p className="text-sm text-gray-500 truncate">{msg.subject}</p>
              <p className="text-xs text-gray-400">{new Date(msg.createdAt).toLocaleDateString()}</p>
            </motion.div>
          ))}
        </div>

        {/* Message detail */}
        <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
          {selected ? (
            <>
              <h3 className="text-xl font-bold mb-2">{selected.subject}</h3>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                From: {selected.name} ({selected.email}) | Date: {new Date(selected.createdAt).toLocaleString()}
              </div>
              <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">{selected.message}</p>
            </>
          ) : (
            <p className="text-gray-500">Select a message to view.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesManager;