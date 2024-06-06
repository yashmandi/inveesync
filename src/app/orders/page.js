"use client";

import { useState } from "react";
import { data } from "../../utils/data";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import Spinner from "../../components/spinner";

const OrderList = ({ searchTerm }) => {
    const [orders, setOrders] = useState(data.orders);
    const [filter, setFilter] = useState('');
    const [sortKey, setSortKey] = useState('');
    const [isAscending, setIsAscending] = useState(true);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const router = useRouter();

    const handleDelete = (id) => {
        setLoading(true);
        setTimeout(() => {
            setOrders(orders.filter(order => order.id !== id));
            setLoading(false);
            toast.success('Order deleted successfully!');
        }, 1000);
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleSort = (key) => {
        setSortKey(key);
        setIsAscending(prev => !prev);
    };

    const sortedOrders = [...orders].sort((a, b) => {
        if (sortKey === 'customer') {
            return isAscending
                ? a.customer.localeCompare(b.customer)
                : b.customer.localeCompare(a.customer);
        } else if (sortKey === 'itemCount') {
            return isAscending
                ? a.items.length - b.items.length
                : b.items.length - a.items.length;
        }
        return 0;
    });

    const filteredOrders = sortedOrders.filter(order => {
        if (filter) {
            return order.status.toLowerCase() === filter.toLowerCase();
        }
        if (searchTerm) {
            return order.customer.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return true;
    });

    const indexOfLastOrder = currentPage * itemsPerPage;
    const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredOrders.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber) => {
        setLoading(true);
        setTimeout(() => {
            setCurrentPage(pageNumber);
            setLoading(false);
        }, 500);
    };

    return (
        <div className="container mx-auto p-4">
            {loading && <Spinner />}
            <h1 className="text-2xl font-bold mb-4">Order List</h1>

            <div className="mb-4">
                <label htmlFor="statusFilter" className="mr-2">Filter by status:</label>
                <select
                    id="statusFilter"
                    onChange={handleFilterChange}
                    className="focus:outline-none text-gray-900 bg-gray-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm h-8 items px-1 w-32 dark:bg-white dark:hover:bg-gray-200 ml-2 dark:focus:ring-gray-900"
                >
                    <option value="">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="border border-2 bg-gray-600 font-extrabold px-4 py-2">ID</th>
                        <th className="border border-2 bg-gray-600 font-extrabold px-4 py-2">
                            Customer <span> </span>
                            <button onClick={() => handleSort('customer')}>
                                {isAscending ? '🔼' : '🔽'}
                            </button>
                        </th>
                        <th className="border border-2 bg-gray-600 font-extrabold px-4 py-2">Status</th>
                        <th className="border border-2 bg-gray-600 font-extrabold px-4 py-2">
                            Item Count <span> </span>
                            <button onClick={() => handleSort('itemCount')}>
                                {isAscending ? '🔼' : '🔽'}
                            </button>
                        </th>
                        <th className="border border-2 bg-gray-600 font-extrabold px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentOrders.map(order => (
                        <tr key={order.id}>
                            <td className="border px-4 py-2">{order.id}</td>
                            <td className="border px-4 py-2">{order.customer}</td>
                            <td className="border px-4 py-2">{order.status}</td>
                            <td className="border px-4 py-2">{order.items.length}</td>
                            <td className="border px-4 py-4 flex justify-center">
                                <button
                                    onClick={() => router.push(`/orders/${order.id}`)}
                                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
                                >
                                    Show Details
                                </button>
                                <button
                                    onClick={() => handleDelete(order.id)}
                                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-center mt-4">
                <nav>
                    <ul className="inline-flex items-center -space-x-px">
                        {pageNumbers.map(number => (
                            <li key={number}>
                                <button
                                    onClick={() => paginate(number)}
                                    className={`px-3 py-2 leading-tight ${currentPage === number ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-white text-gray-900 hover:bg-gray-200'} border border-gray-300 rounded-lg ml-2 mt-8`}
                                >
                                    {number}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default OrderList;
