import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { addMessage } from '../store/slices/chatSlice';
import { getChatResponse } from '../api/aiApi';
import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  PaperAirplaneIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

const Chat = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      text: input,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    dispatch(addMessage(userMessage));
    setInput('');
    setIsLoading(true);

    try {
      const response = await getChatResponse(input);
      const aiMessage = {
        text: response,
        sender: 'ai',
        timestamp: new Date().toISOString(),
      };
      dispatch(addMessage(aiMessage));
    } catch (error) {
      console.error('Error getting AI response:', error);
      dispatch(addMessage({
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'ai',
        timestamp: new Date().toISOString(),
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const MessageComponent = ({ message }) => {
    const isUser = message.sender === 'user';

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mb-4 ${isUser ? 'text-right' : 'text-left'}`}
      >
        <div
          className={`inline-block max-w-[80%] p-4 rounded-lg ${
            isUser
              ? 'bg-blue-600 text-white rounded-br-none'
              : 'bg-gray-100 text-gray-800 rounded-bl-none'
          }`}
        >
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={materialDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {message.text}
          </ReactMarkdown>
          <div
            className={`text-xs mt-1 ${
              isUser ? 'text-blue-200' : 'text-gray-500'
            }`}
          >
            {new Date(message.timestamp).toLocaleTimeString()}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg h-[85vh] flex flex-col">
        <div className="p-4 border-b bg-gray-50 rounded-t-xl">
          <h2 className="text-xl font-semibold text-gray-800">AI Assistant</h2>
          <p className="text-sm text-gray-600">Ask me anything!</p>
        </div>

        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
          {messages.map((message, index) => (
            <MessageComponent key={index} message={message} />
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center space-x-2"
            >
              <ArrowPathIcon className="h-5 w-5 text-gray-500 animate-spin" />
              <span className="text-gray-500">AI is thinking...</span>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t bg-gray-50">
          <div className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
              disabled={isLoading || !input.trim()}
            >
              <PaperAirplaneIcon className="h-5 w-5" />
              <span>Send</span>
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;