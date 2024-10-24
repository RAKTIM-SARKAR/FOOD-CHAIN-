import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
    setData(response.data.data);
  }

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => {
          // Calculate the total item price without delivery charges
          const totalItemPrice = order.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
          return (
            <div key={index} className='my-orders-order'>
              {/* <img src={assets.parcel_icon} alt='parcel_icon' /> */}
              <div className='order-details'>
                {order.items.map((item, itemIndex) => (
                  <div key={itemIndex} className='order-item'>
                    <img src={item.image} alt={item.name} className='food-image' />
                    <div className='item-info'>
                      <p>{item.name} x {item.quantity}</p>
                      <p>Price: Rs.{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className='order-summary'>
                <p>Total: Rs.{totalItemPrice}</p>
                <p>Items: {order.items.length}</p>
                <p><span> &#x25cf;</span><b>{order.status}</b></p>
                {/* <button onClick={fetchOrders}>Track Order</button> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyOrders;
