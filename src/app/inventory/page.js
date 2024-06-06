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
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 8;

    const handleDelete = (id) => {
        setItemToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        setLoading(true);
        setTimeout(() => {
            setItems(items.filter(item => item.id !== itemToDelete));
            setLoading(false);
            toast.success('Item deleted successfully!');
            setIsDeleteModalOpen(false);
            setItemToDelete(null);
        }, 1000);
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleAddItem = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            const newItemData = {
                id: items.length + 1,
                name: newItem.name,
                stock: parseInt(newItem.stock)
            };
            setItems([...items, newItemData]);
            setNewItem({ name: '', stock: '' });
            setIsModalOpen(false);
            setLoading(false);
            toast.success('Item added successfully!');
        }, 1000);
    };

    const handleEditItem = (id) => {
        const itemToEdit = items.find(item => item.id === id);
        setEditItem(itemToEdit);
    };

    const handleSaveEdit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setItems(items.map(item => item.id === editItem.id ? editItem : item));
            setEditItem(null);
            setLoading(false);
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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredItems.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber) => {
        setLoading(true);
        setTimeout(() => {
            setCurrentPage(pageNumber);
            setLoading(false);
        }, 500);
    }

    return (
        <div className="container mx-auto p-4">
            {loading && <Spinner />}
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">Inventory List</h1>

            <div className="flex flex-col sm:flex-row justify-between p-2">
                <div className="mb-2 sm:mb-0">
                    <label htmlFor="stockFilter" className="mr-2">Filter by stock:</label>
                    <select
                        id="stockFilter"
                        onChange={handleFilterChange}
                        className="focus:outline-none text-gray-900 bg-gray-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm h-8 items px-1 w-full sm:w-32 dark:bg-white dark:hover:bg-gray-200 sm:ml-2 dark:focus:ring-gray-900"
                    >
                        <option value="">All</option>
                        <option value="inStock">In Stock</option>
                        <option value="outOfStock">Out of Stock</option>
                    </select>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-2 mb-2 sm:mb-2">

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 transition-all py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
                    >
                        Add New Item
                    </button>
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="focus:ring-gray-300 text-black hover:bg-gray-200 transition-all font-medium rounded-lg ml-2 text-sm h-10 px-5 dark:focus:ring-gray-900"
                    />
                </div>
            </div>

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
                                    className="focus:outline-none text-gray bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg transition-all text-sm p-2 px-4 mb-2 dark:bg-gray-700 dark:hover:bg-gray-900 dark:focus:ring-gray-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium transition-all rounded-lg text-sm p-2 px-4 mb-2 dark:bg-blue-700 dark:hover:bg-blue-900 dark:focus:ring-blue-800"
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
                                    className="focus:outline-none text-gray bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg transition-all text-sm p-2 px-4 mb-2 dark:bg-gray-700 dark:hover:bg-gray-900 dark:focus:ring-gray-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium transition-all rounded-lg text-sm p-2 px-4 mb-2 dark:bg-blue-700 dark:hover:bg-blue-900 dark:focus:ring-blue-800"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && (
                <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
                    <div className="bg-[#191d24] p-4 rounded-lg border border-gray-500 shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                        <p className="mb-4">Are you sure you want to delete this item?</p>
                        <div className="flex justify-end gap-4 mt-2">
                            <button
                                type="button"
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="focus:outline-none text-gray bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg transition-all text-sm p-2 px-4 mb-2 dark:bg-gray-700 dark:hover:bg-gray-900 dark:focus:ring-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={confirmDelete}
                                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg transition-all text-sm p-2 px-4 mb-2 dark:bg-red-700 dark:hover:bg-red-900 dark:focus:ring-red-800"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="border border-2 bg-gray-600 font-extrabold px-2 sm:px-4 py-2">Items</th>
                        <th className="border border-2 bg-gray-600 font-extrabold px-2 sm:px-4 py-2">Stock</th>
                        <th className="border border-2 bg-gray-600 font-extrabold px-2 sm:px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map(item => (
                        <tr key={item.id}>
                            <td className="border px-2 sm:px-4 py-2">{item.name}</td>
                            <td className="border px-2 sm:px-4 py-2">{item.stock}</td>
                            <td className="border px-2 sm:px-4 py-2 flex flex-col sm:flex-row justify-center">
                                <button
                                    onClick={() => handleEditItem(item.id)}
                                    className="focus:outline-none text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium transition-all rounded-lg mb-2 sm:mb-0 sm:mr-2 text-sm px-3 py-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-900"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg transition-all text-sm px-2 py-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
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
                                    className={`px-2 sm:px-4 py-2 leading-tight ${currentPage === number
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                        : 'bg-white text-blue-600 hover:text-blue-700 hover:bg-blue-100'
                                        } border border-blue-300 rounded-lg ml-2 mt-8 shadow transition duration-300 ease-in-out transform hover:-translate-y-1`}
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

export default InventoryList;
