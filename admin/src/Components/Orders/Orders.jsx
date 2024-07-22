import React, { useEffect, useState } from 'react';
import './Orders.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('https://shopeasy-76ql.onrender.com/orders');
                const data = await response.json();
                setOrders(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="orders-container">
            <h1 className="orders-title">Orders</h1>
                <hr className='hr'/>
            {orders.length === 0 ? (
                <p className="no-orders">No orders found.</p>
            ) : (
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th className='remove'>Order ID</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Products</th>
                            <th>Total Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td className='remove'>{order._id}</td>
                                <td>{order.userId.name}</td>
                                <td>{order.userId.email}</td>
                                <td>
                                    <ul>
                                        {order.products.map(product => (
                                            <li key={product.productId}>
                                                {product.productId} (Quantity: {product.quantity})
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td>₹{order.totalAmount.toFixed(2)}</td>
                                <td>{new Date(order.date).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Orders;
