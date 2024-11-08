import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const features = [
    {
      title: 'Smart Conversations',
      description: 'Engage in intelligent discussions with our advanced AI.',
      icon: '🤖',
    },
    {
      title: 'Code Support',
      description: 'Get help with coding questions and debugging.',
      icon: '💻',
    },
    {
      title: 'Learning Assistant',
      description: 'Learn new concepts with interactive explanations.',
      icon: '📚',
    },
    {
      title: 'Real-time Responses',
      description: 'Get instant answers to your questions.',
      icon: '⚡',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
            Welcome to AI Chat Pro
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Experience the future of conversation with our advanced AI assistant
          </p>

          {!isAuthenticated ? (
            <div className="space-x-4">
              <motion.div
                className="inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                >
                  Get Started
                </Link>
              </motion.div>
              <motion.div
                className="inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/register"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors shadow-lg border border-blue-600"
                >
                  Sign Up
                </Link>
              </motion.div>
            </div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/chat"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                Start Chatting
              </Link>
            </motion.div>
          )}
        </motion.div>

        <div className="mt-24 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;