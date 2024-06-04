import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'InveeSync Assignment',
  description: 'Inventory and Manufacturing Management System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Toaster position="top-center" />
      <body>{children}</body>
    </html>
  );
}
