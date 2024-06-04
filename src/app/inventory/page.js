"use client";

import { useState, useEffect } from "react";
import { data } from "../../utils/data";
import toast from "react-hot-toast";
import Spinner from "../../components/spinner";

const InventoryList = () => {
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
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
                Add New Item
            </button>

            {typeof window !== 'undefined' && isModalOpen && (
                <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-500 shadow-lg">
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
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
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
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-500 shadow-lg">
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
                                onChange={e => setEditItem({ ...editItem, stock: e.target.value })}
                                className="border rounded px-2 py-1 mb-2 w-full text-black"
                            />
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setEditItem(null)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <ul>
                {filteredItems.map(item => (
                    <li key={item.id} className="border-b py-2 flex justify-between">
                        <div>
                            <p>Name: {item.name}</p>
                            <p>Stock: {item.stock}</p>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => handleEditItem(item.id)}
                                className="focus:outline-none text-gray-900  hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4  mb-2 dark:bg-gray-100 dark:hover:bg-gray-200 dark:focus:ring-gray-900"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 mb-2 dark:bg-red-700 dark:hover:bg-red-900 dark:focus:ring-red-800"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InventoryList;
