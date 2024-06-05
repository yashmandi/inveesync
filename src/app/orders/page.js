"use client";

import { useState } from "react";
import { data } from "../../utils/data";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import Spinner from "../../components/spinner";

const OrderList = ({ searchTerm }) => {
    const [orders, setOrders] = useState(data.orders);
    const [filter, setFilter] = useState('');
    const [newOrder, setNewOrder] = useState({ item: '', quantity: '' });
    const [editOrder, setEditOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const handleAddOrder = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            const newOrderData = {
                id: orders.length + 1,
                item: newOrder.item,
                quantity: parseInt(newOrder.quantity)
            };
            setOrders([...orders, newOrderData]);
            setNewOrder({ item: '', quantity: '' });
            setIsModalOpen(false);
            setLoading(false);
            toast.success('Order added successfully!');
        }, 1000);
    };

    const handleEditOrder = (id) => {
        const orderToEdit = orders.find(order => order.id === id);
        setEditOrder(orderToEdit);
    };

    const handleSaveEdit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setOrders(orders.map(order => order.id === editOrder.id ? editOrder : order));
            setEditOrder(null);
            setLoading(false);
            toast.success('Order updated successfully!');
        }, 1000);
    };

    const handleShowDetails = (id) => {
        router.push(`/orders/${id}`);
    };

    const filteredOrders = orders.filter(order => {
        if (filter === 'quantity') {
            return order.quantity > 0;
        } else if (searchTerm) {
            return order.customer.toLowerCase().includes(searchTerm.toLowerCase());
        } else {
            return true;
        }
    });

    const indexOfLastOrder = currentPage * itemsPerPage;
    const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredOrders.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto p-4">
            {loading && <Spinner />}
            <h1 className="text-2xl font-bold mb-4">Order List</h1>

            <div className="mb-4">
                <label htmlFor="quantityFilter" className="mr-2">Filter by quantity:</label>
                <select
                    id="quantityFilter"
                    onChange={handleFilterChange}
                    className="focus:outline-none text-gray-900 bg-gray-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm h-8 items px-1 w-32 dark:bg-white dark:hover:bg-gray-200 ml-2 dark:focus:ring-gray-900"
                >
                    <option value="">All</option>
                    <option value="quantity">Quantity</option>
                </select>
            </div>

            <button
                onClick={() => setIsModalOpen(true)}
                className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
            >
                Add New Order
            </button>

            {typeof window !== 'undefined' && isModalOpen && (
                <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
                    <div className="bg-[#232933] p-4 rounded-lg border border-gray-500 shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Add New Order</h2>
                        <form onSubmit={handleAddOrder}>
                            <input
                                type="text"
                                placeholder="Order Item"
                                value={newOrder.item}
                                onChange={e => setNewOrder({ ...newOrder, item: e.target.value })}
                                className="border rounded px-2 py-1 mb-2 w-full text-black"
                            />
                            <input
                                type="number"
                                placeholder="Quantity"
                                value={newOrder.quantity}
                                onChange={e => setNewOrder({ ...newOrder, quantity: e.target.value })}
                                className="border rounded px-2 py-1 mb-2 w-full text-black"
                            />
                            <div className="flex justify-end gap-4 mt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="focus:outline-none text-gray bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm p-2 px-4 mb-2 dark:bg-gray-700 dark:hover:bg-gray-900 dark:focus:ring-gray-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-2 px-4 mb-2 dark:bg-blue-700 dark:hover:bg-blue-900 dark:focus:ring-blue-800"
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="border border-2 bg-gray-600 font-extrabold px-4 py-2">Order Item</th>
                        <th className="border border-2 bg-gray-600 font-extrabold px-4 py-2">Quantity</th>
                        <th className="border border-2 bg-gray-600 font-extrabold px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentOrders.map(order => (
                        <tr key={order.id}>
                            <td className="border px-4 py-2">
                                {order.items.map(item => (
                                    <div key={item.id}>{item.name}</div>
                                ))}
                            </td>
                            <td className="border px-4 py-2">
                                {order.items.map(item => (
                                    <div key={item.id}>{item.quantity}</div>
                                ))}
                            </td>
                            <td className="border px-4 py-4 flex justify-center">
                                <button
                                    onClick={() => handleShowDetails(order.id)}
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
