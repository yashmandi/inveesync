// src/app/inventory/page.js
"use client";

import { useState, useEffect } from "react";
import { data } from "../../utils/data";
import toast from "react-hot-toast";
import Spinner from "../../components/spinner";

const InventoryList = ({ searchTerm }) => {
    const [items, setItems] = useState(data.items);
    const [filter, setFilter] = useState('');
    const [newItem, setNewItem] = useState({ name: '', stock: '' });
    const [editItem, setEditItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state

    const handleDelete = (id) => {
        setLoading(true); // Show spinner
        setTimeout(() => { // Simulate async operation
            setItems(items.filter(item => item.id !== id));
            setLoading(false); // Hide spinner
            toast.success('Item deleted successfully!');
        }, 1000);
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleAddItem = (e) => {
        e.preventDefault();
        setLoading(true); // Show spinner
        setTimeout(() => { // Simulate async operation
            const newItemData = {
                id: items.length + 1,
                name: newItem.name,
                stock: parseInt(newItem.stock)
            };
            setItems([...items, newItemData]);
            setNewItem({ name: '', stock: '' });
            setIsModalOpen(false);
            setLoading(false); // Hide spinner
            toast.success('Item added successfully!');
        }, 1000);
    };

    const handleEditItem = (id) => {
        const itemToEdit = items.find(item => item.id === id);
        setEditItem(itemToEdit);
    };

    const handleSaveEdit = (e) => {
        e.preventDefault();
        setLoading(true); // Show spinner
        setTimeout(() => { // Simulate async operation
            setItems(items.map(item => item.id === editItem.id ? editItem : item));
            setEditItem(null);
            setLoading(false); // Hide spinner
            toast.success('Item updated successfully!');
        }, 1000);
    };

    const filteredItems = items.filter(item => {
        if (filter === 'inStock') {
            return item.stock > 0;
        } else if (filter === 'outOfStock') {
            return item.stock === 0;
        } else if (searchTerm) {
            return item.name.toLowerCase().includes(searchTerm.toLowerCase());
        } else {
            return true;
        }
    });

    return (
        <div className="container mx-auto p-4">
            {loading && <Spinner />} {/* Show spinner if loading */}
            <h1 className="text-2xl font-bold mb-4">Inventory List</h1>

            <div className="mb-4">
                <label htmlFor="stockFilter" className="mr-2">Filter by stock:</label>
                <select
                    id="stockFilter"
                    onChange={handleFilterChange}
                    className="focus:outline-none text-gray-900  bg-gray-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm h-8 items px-1 w-32 dark:bg-white dark:hover:bg-gray-200 ml-2 dark:focus:ring-gray-900"
                >
                    <option value="">All</option>
                    <option value="inStock">In Stock</option>
                    <option value="outOfStock">Out of Stock</option>
                </select>
            </div>

            <button
                onClick={() => setIsModalOpen(true)}
                className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
            >
                Add New Item
            </button>

            {typeof window !== 'undefined' && isModalOpen && (
                <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
                    <div className="bg-[#232933] p-4 rounded-lg border border-gray-500 shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Add New Item</h2>
                        <form onSubmit={handleAddItem}>
                            <input
                                type="text"
                                placeholder="Item Name"
                                value={newItem.name}
                                onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                                className="border rounded px-2 py-1 mb-2 w-full text-black"
                            />
                            <input
                                type="number"
                                placeholder="Stock"
                                value={newItem.stock}
                                onChange={e => setNewItem({ ...newItem, stock: e.target.value })}
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

            {editItem && (
                <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
                    <div className="bg-[#191d24] p-4 rounded-lg border border-gray-500 shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Edit Item</h2>
                        <form onSubmit={handleSaveEdit}>
                            <input
                                type="text"
                                placeholder="Item Name"
                                value={editItem.name}
                                onChange={e => setEditItem({ ...editItem, name: e.target.value })}
                                className="border rounded px-2 py-1 mb-2 w-full text-black"
                            />
                            <input
                                type="number"
                                placeholder="Stock"
                                value={editItem.stock}
                                onChange={e => setEditItem({ ...editItem, stock: parseInt(e.target.value) })}
                                className="border rounded px-2 py-1 mb-2 w-full text-black"
                            />
                            <div className="flex justify-end gap-4 mt-2">
                                <button
                                    type="button"
                                    onClick={() => setEditItem(null)}
                                    className="focus:outline-none text-gray bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm p-2 px-4 mb-2 dark:bg-gray-700 dark:hover:bg-gray-900 dark:focus:ring-gray-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-2 px-4 mb-2 dark:bg-blue-700 dark:hover:bg-blue-900 dark:focus:ring-blue-800"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Item</th>
                        <th className="px-4 py-2">Stock</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.map(item => (
                        <tr key={item.id}>
                            <td className="border px-4 py-2">{item.name}</td>
                            <td className="border px-4 py-2">{item.stock}</td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1 mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleEditItem(item.id)}
                                    className="focus:outline-none text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-2 py-1 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-900"
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InventoryList;
