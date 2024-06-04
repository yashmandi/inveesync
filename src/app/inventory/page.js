"use client";

import { useState } from "react";
import { data } from "../../utils/data";

const InventoryList = () => {
    const [items, setItems] = useState(data.items);

    const handleDelete = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Inventory List</h1>
            <ul>
                {items.map(item => (
                    <li key={item.id} className="border-b py-2 flex justify-between">
                        <div>
                            <p>Name: {item.name}</p>
                            <p>Stock: {item.stock}</p>
                        </div>
                        <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-500"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InventoryList;
