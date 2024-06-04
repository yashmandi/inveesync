// src/app/layout.js
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Link from 'next/link';

export const metadata = {
  title: 'InveeSync Assignment',
  description: 'Inventory and Manufacturing Management System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Toaster position="top-center" />
      <body>
        <div className="container mx-auto p-2">
          <h1 className="text-4xl font-bold mb-12 text-center">
            Inventory and Manufacturing Management System
          </h1>
          <div className="flex space-x-4 justify-items-start mb-4">
            <Link href="/inventory">
              <button className="focus:outline-none text-gray-900 hover:text-gray-900 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm h-10 items px-5 dark:bg-white dark:hover:bg-gray-200 dark:focus:ring-gray-900">Inventory</button>
            </Link>
            <Link href="/orders">
              <button className="focus:outline-none text-gray-900 hover:text-gray-900 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm h-10 items px-5 dark:bg-white dark:hover:bg-gray-200 dark:focus:ring-gray-900">Orders</button>
            </Link>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
