import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartItem";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { local_url } from "../redux/actions";
import swal from "sweetalert";
import axios from "axios";

const PayPal = (props) => {
  const { product } = props;
  const history = useHistory();
  const { userStorage } = useAuth();
  const { cartItem } = useContext(CartContext);
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  console.log(userStorage);

  async function doThePay() {
    const items = cartItem.map(r => {
      return {
        id: r.id,
        title: r.title,
        description: `${r.title}, ${r.brand}, ${r.model}`,
        picture_url: r.image,
        category_id: r.category,
        quantity: r.amount,
        unit_price: r.price,
      };
    });

    const payload = {
      items: items,
      email: userStorage.email,
      user_id: userStorage.uid,
    };

    const response = await axios.post(`${local_url}/paypal`, payload).then((res) => res.data[0]);
    await cartItem.map(async r => await axios.put(`${local_url}/shoes/shoppingcart/${r.id}`, {stock: r.amount , sold: r.amount}));

    return response;
  };

  const handleApprove = (orderId) => {
    // Call backend function to fulfill order

    // if response is success
    setPaidFor(true);
    doThePay();
    // Refresh user's account or subscription status

    // if response is error
    // alert("Your payment was processed successfully. However, we are unable to fulfill your purchase. Please contact us at support@designcode.io for assistance.");
  };

  if (paidFor) {
    // Display success message, modal or redirect user to success page
    alert("Gracias por la compra, serás redirigido a la pagina principal");
    localStorage.clear();
    window.location.reload();
    history.push('/');
  }

  if (error) {
    // Display error message, modal or redirect user to error page
    alert(error);
  }

	return (
		<PayPalButtons
      disabled={cartItem.length === 0}
      style={{
        color: "black",
        label: "buynow"
      }}
      onClick={(data, actions) => {
        // Validate on button click, client or server side
        if(!userStorage) {
          setError("Necesitas estar logueado capo");
          history.push("/login");
          return actions.reject();
        } else {
          return actions.resolve();
        }
      }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: "nose",
              amount: {
                value: product.price
              }
            }
          ]
        });
      }}
      onApprove={async (data, actions) => {
        const order = await actions.order.capture(); 
        console.log("order", order);

        handleApprove(data.orderID);
      }}
      onError={(err) => {
        setError(err);
        console.error("PayPal Checkout onError", err);
      }}
      onCancel={() => {
        // Display cancel message, modal or redirect user to cancel page or back to cart
        alert('No caceles, porfa. I need the money')
      }}
    />
	);
};

export default PayPal;
