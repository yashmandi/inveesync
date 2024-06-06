"use client";

import React, { useState } from 'react';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import Spinner from '../components/spinner';

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(false);

  const handleNavigation = (url) => {
    setLoading(true);
    setTimeout(() => {
      window.location.href = url;
    }, 500);
  };

  return (
    <html lang="en">
      <Toaster position="top-center" />
      <body>
        <div className="container mx-auto p-2">
          <h1 className="text-4xl font-bold mb-12 text-center">
            Inventory and Manufacturing Management System
          </h1>
          <div className="flex flex-col sm:flex-row sm:justify-between mb-4 space-y-4 sm:space-y-0 sm:space-x-4">
            <div className='flex flex-col sm:flex-row sm:space-x-4'>
              <button
                onClick={() => handleNavigation('/inventory')}
                className="focus:outline-none text-gray-900 hover:text-gray-900 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium transition-all rounded-lg text-sm h-10 px-5 mb-3 dark:bg-white dark:hover:bg-gray-300 dark:focus:ring-gray-900"
              >
                Inventory
              </button>
              <button
                onClick={() => handleNavigation('/orders')}
                className="focus:outline-none text-gray-900 hover:text-gray-900 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium transition-all rounded-lg text-sm h-10 px-5 dark:bg-white dark:hover:bg-gray-200 dark:focus:ring-gray-900"
              >
                Orders
              </button>
            </div>

          </div>
        </div>
        {loading ? <Spinner /> : React.cloneElement(children)}
      </body>
    </html>
  );
}
