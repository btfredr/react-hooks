import { useState } from 'react';

const Order = () => {
    const [order, setOrder] = useState({
        id: 2,
        item: 'Product',
        price: 55,
        stock: 10
    });

    const updateOrder = () => {
        // Calling setUser
        setOrder(
            // Passing the user object into a callback function
            order => (
                { ...order, item: 'Hello', price: 1337 }
            )
        );
    };

    return (
        <div className="form">
            <div className="form-item">
                <div>
                    <label>{order.item}</label>
                </div>
                <input
                    type="text" value={setOrder.item}>
                </input>
            </div>
            <div className="form-item">
                <div>
                    <label>${order.price}</label>
                </div>
                <input
                    type="number" value={setOrder.price}>
                </input>
            </div>
            <button className="form-button" onClick={updateOrder}>Update Order</button>
        </div>
    )
};

export default Order
