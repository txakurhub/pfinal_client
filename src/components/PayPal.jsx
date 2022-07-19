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
    setPaidFor(true);
    doThePay();
  };
  
  if (paidFor) {
    
    localStorage.clear();
    history.push('/');
    window.location.reload();

  }

  // if (error) {
  //   alert(error);
  // } // esto tira error cuando cerras rápido la ventana de paypal, dejar comentado

	return (
		<PayPalButtons
      disabled={cartItem.length === 0}
      style={{
        color: "black",
        label: "buynow"
      }}
      onClick={(data, actions) => {
        if(!userStorage) {
          setError("Necesitas estar registrado");
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
        handleApprove(data.orderID);
        // swal("Gracias por la compra, serás redirigido a la pagina principal");
      }}
      onError={(err) => {
        setError(err);
        console.error("PayPal Checkout onError", err);
      }}
      onCancel={() => {
        swal('Compra cancelada')
      }}
    />
	);
};

export default PayPal;
