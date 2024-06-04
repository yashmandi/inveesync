import './globals.css'; 

export const metadata = {
  title: 'InveeSync Assignment',
  description: 'Inventory and Manufacturing Management System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
