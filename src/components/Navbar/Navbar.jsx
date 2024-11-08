import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { motion } from 'framer-motion';
import {
  ChatBubbleLeftIcon,
  UserCircleIcon,
  HomeIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const navItems = isAuthenticated
    ? [
        { to: '/', icon: HomeIcon, text: 'Home' },
        { to: '/chat', icon: ChatBubbleLeftIcon, text: 'Chat' },
        { to: '/profile', icon: UserCircleIcon, text: 'Profile' },
      ]
    : [
        { to: '/', icon: HomeIcon, text: 'Home' },
        { to: '/login', text: 'Login' },
        { to: '/register', text: 'Register' },
      ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center space-x-2"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-white text-xl font-bold"
            >
              AI Chat Pro
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <motion.div
                key={item.to}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.to}
                  className="flex items-center space-x-1 text-white hover:text-blue-200 transition-colors"
                >
                  {item.icon && <item.icon className="h-5 w-5" />}
                  <span>{item.text}</span>
                </Link>
              </motion.div>
            ))}
            {isAuthenticated && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center space-x-1 text-white hover:text-blue-200 transition-colors"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                <span>Logout</span>
              </motion.button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pb-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="block py-2 text-white hover:text-blue-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.text}
              </Link>
            ))}
            {isAuthenticated && (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left py-2 text-white hover:text-blue-200"
              >
                Logout
              </button>
            )}
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;