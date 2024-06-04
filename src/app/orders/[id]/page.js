import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { data } from "../../../utils/data";

const OrderDetails = () => {
    const router = useRouter();
    const { id } = router.query || {}; // Use destructuring with default value

    const order = data.orders.find(order => order.id === parseInt(id));

    const [orderStatus, setOrderStatus] = useState(order ? order.status : '');

    if (!router.query.id) { // Check if id exists in router.query
        return <div>Order not found</div>;
    }

    const handleMarkAsCompleted = () => {
        order.status = 'Completed';
        setOrderStatus('Completed');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Order Details - {order.id}</h1>

            <p>Customer: {order.customer}</p>
            <p>Status: {orderStatus}</p>
            <h2 className="text-xl font-semibold ">Items: </h2>
            <ul>
                {order.items.map(item => (
                    <li key={item.id} className="border-b py-2">
                        <p>Name: {item.name}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Stock: {data.items.find(i => i.id === item.id).stock}</p>
                    </li>
                ))}
            </ul>
            {orderStatus === 'Pending' && (
                <button
                    onClick={handleMarkAsCompleted}
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
                >
                    Mark as Completed
                </button>
            )}
        </div>
    );
};

export default OrderDetails;