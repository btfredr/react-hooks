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
                // Here I'm using the spread operator "..." to make a copy of the user object.
                // what my setUser function sees at this point is:
                // setUser({name: 'John Doe',email: 'john@email.com',age: 28})
                { ...order },
                // Now i change the name value of the copied object to "Nathan"
                // This is what setUser sees in the end:
                // setUser({name: 'Nathan',email: 'john@email.com',age: 28})
                { item: 'Shit', price: 1337 }
            )
        );
    };

    return (
        <>
            <h1>{order.id}</h1>
            <h1>{order.item}</h1>
            <h1>{order.price}</h1>
            <h1>{order.stock}</h1>
            <button onClick={updateOrder}>Update Order</button>
        </>
    )
};

export default Order
