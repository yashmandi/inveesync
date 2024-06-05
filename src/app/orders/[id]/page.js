"use client";

import { useRouter } from 'next/router';
import { data } from '../../../utils/data';
import Link from 'next/link';

const OrderDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const order = data.orders.find(order => order.id === parseInt(id));

  if (!order) {
    return <p>Order not found</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <p><strong>Order ID:</strong> {order.id}</p>
      <p><strong>Customer:</strong> {order.customer}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <h2 className="text-xl font-bold mt-4">Items</h2>
      <ul>
        {order.items.map(item => (
          <li key={item.id}>
            {item.name} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
      <Link href="/orders">
        <button className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4">
          Back to Orders
        </button>
      </Link>
    </div>
  );
};

export default OrderDetail;
