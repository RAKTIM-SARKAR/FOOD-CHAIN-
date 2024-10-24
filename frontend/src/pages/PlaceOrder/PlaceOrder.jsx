import React, { useCallback, useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    Name: "",
    street: "",
    zipcode: "", 
    phone: "",
    paymentMethod: "cod"  // default payment method is COD
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 250,
      paymentMethod: data.paymentMethod
    };

    try {
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
      if (response.data.success) {
        if (data.paymentMethod === "online") {
          const { session_url } = response.data;
          window.location.replace(session_url);
        } else {
          navigate('/thankyou');
        }
      } else {
        alert("Error");
      }
    } catch (error) {
      console.error("There was an error placing the order!", error);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token, navigate, getTotalCartAmount]);

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
         <p className='title'>Add Your Information</p>
        <div className="multi-fields">
          <input required name='Name' onChange={onChangeHandler} value={data.Name} type='text' placeholder='Name' />
        </div>
        <input required name='street' onChange={onChangeHandler} value={data.street} type='text' placeholder='Street/Landmark' />
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type='text' placeholder='Zip code' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type='text' placeholder='Phone' />
        <div className="payment-method">
          <h1>Payment Method:</h1>
          <h2>(COD) Cash On Delivery</h2>
          <p>Online Payment is not available right now It is under ,maintanance (Coming soon)</p>
        </div>
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>Rs.{getTotalCartAmount()}</p>
            </div>
            <hr />
            {/* <div className="cart-total-details"> */}
              {/* <p>gst fee</p>
              <p>Rs.{getTotalCartAmount() === 0 ? 0 : 0}</p> */}
            {/* </div>
            <hr /> */}
            <div className="cart-total-details">
              <b>Total</b>
              <b>Rs.{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 0}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO ORDER</button>
        </div>
      </div>
    </form>
  )
};

export default PlaceOrder;
