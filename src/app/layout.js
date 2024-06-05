"use client";

import React, { useState } from 'react';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Link from 'next/link';

export default function RootLayout({ children }) {

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <html lang="en">
      <Toaster position="top-center" />
      <body>
        <div className="container mx-auto p-2">
          <h1 className="text-4xl font-bold mb-24 text-center">
            Inventory and Manufacturing Management System
          </h1>
          <div className="flex space-x-4 justify-between mb-4">
            <div className='flex space-x-4 justify-items-start '>
              <Link href="/inventory">
                <button className="focus:outline-none text-gray-900 hover:text-gray-900 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm h-10 items px-5 dark:bg-white dark:hover:bg-gray-200 dark:focus:ring-gray-900">Inventory</button>
              </Link>
              <Link href="/orders">
                <button className="focus:outline-none text-gray-900 hover:text-gray-900 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm h-10 items px-5 dark:bg-white dark:hover:bg-gray-200 dark:focus:ring-gray-900">Orders</button>
              </Link>
            </div>

            <div className='flex space-x-4 justify-items-end '>
              <input
                type="text"
                className='focus:ring-gray-300 text-black hover:bg-gray-200 font-medium rounded-lg text-sm h-10 items px-5 dark:focus:ring-gray-900'
                placeholder='Search'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        {React.cloneElement(children, { searchTerm })}
      </body>
    </html>
  );
}
