import React, { useEffect, useState } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [previousOrderCount, setPreviousOrderCount] = useState(0);

  // Function to fetch all orders
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        const newOrders = response.data.data;
        // Check if there are new orders
        if (newOrders.length > previousOrderCount) {
          const newOrderCount = newOrders.length - previousOrderCount;
          toast.success(`${newOrderCount} new order(s) received!`);  // Notify admin via toast
          showBrowserNotification(newOrderCount);  // Show browser notification
        }
        setOrders(newOrders);
        setPreviousOrderCount(newOrders.length);  // Update order count
        console.log(newOrders);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Error fetching orders");
      console.error(error);
    }
  };

  // Function to handle status updates
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders();  // Fetch orders again to update status
      } else {
        toast.error("Error updating status");
      }
    } catch (error) {
      toast.error("Error updating status");
      console.error(error);
    }
  };

  // Polling mechanism to fetch orders every 30 seconds
  useEffect(() => {
    fetchAllOrders();  // Initial fetch
    const intervalId = setInterval(fetchAllOrders, 30000);  // Poll every 30 seconds
    return () => clearInterval(intervalId);  // Clean up interval on component unmount
  }, [previousOrderCount]);  // Re-run when order count changes

  // Function to calculate the total cost of items in an order
  const calculateItemTotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Request permission for browser notifications
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then(permission => {
        if (permission !== "granted") {
          toast.warning("Please enable notifications to receive alerts!");
        }
      });
    }
  }, []);

  // Function to show browser notification
  const showBrowserNotification = (newOrderCount) => {
    if (Notification.permission === "granted") {
      const notification = new Notification(`${newOrderCount} New Order(s)`, {
        body: "You have received new orders. Please check the admin panel.",
        icon: assets.parcel_icon,  // Optional icon for the notification
      });

      // Optional: add click behavior to notification
      notification.onclick = () => {
        window.focus();  // Bring the window into focus if it's minimized
      };
    }
  };

  return (
    <div className="order-add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="parcel_icon" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, itemIndex) => (
                  <span key={itemIndex}>
                    {item.name} x {item.quantity}
                    {itemIndex < order.items.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
              <p className="order-item-name">
                {order.address.firstName} {order.address.lastName}
              </p>
               <div className="order-item-address">
                <p></p>
                <p>
                {order.address.city}, {order.address.state}, {order.address.street} {order.address.country}, {order.address.zipcode}
                </p>
              </div> 
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>Rs.{calculateItemTotal(order.items)}</p>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Paid(online)">Paid(online)</option>
              <option value="Paid(COD)">Paid(COD)</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
