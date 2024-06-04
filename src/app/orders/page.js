"use client";

import { useEffect, useState } from "react";
import { data } from "../../utils/data";
import Link from 'next/link';

const OrderList = () => {
    const [orders, setOrders] = useState(data.orders);
    const [filter, setFilter] = useState('');
    const [sortKey, setSortKey] = useState('');

    useEffect(() => {
        let filteredOrders = data.orders;

        if (filter) {
            filteredOrders = filteredOrders.filter(order => order.status === filter);
        }

        if (sortKey === 'customer') {
            filteredOrders = filteredOrders.sort((a, b) => a.customer.localeCompare(b.customer));
        } else if (sortKey === 'itemCount') {
            filteredOrders = filteredOrders.sort((a, b) => b.items.length - a.items.length);
        }

        setOrders(filteredOrders);
    }, [filter, sortKey]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Orders List</h1>
            <div className="mb-4">
                <label htmlFor="statusFilter" className="mr-2">Filter by status:</label>
                <select
                    id="statusFilter"
                    onChange={e => setFilter(e.target.value)}
                    className="border rounded px-2 py-1 bg-black"
                >
                    <option value="">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="sortKey" className="mr-2">Sort by:</label>
                <select
                    id="sortKey"
                    onChange={e => setSortKey(e.target.value)}
                    className="border rounded px-2 py-1 bg-black"
                >
                    <option value="">None</option>
                    <option value="customer">Customer Name</option>
                    <option value="itemCount">Item Count</option>
                </select>
            </div>
            <ul>
                {orders.map(order => (
                    <li key={order.id} className="border-b py-2">
                        <div className="flex justify-between">
                            <div>
                                <h2 className="text-xl font-semibold">Order ID: {order.id}</h2>
                                <p>Customer: {order.customer}</p>
                                <p>Status: {order.status}</p>
                                <p>Item Count: {order.items.length}</p>
                            </div>
                            <Link href={`/orders/${order.id}`}>
                                <button className="text-blue-500">View Details</button>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderList;
