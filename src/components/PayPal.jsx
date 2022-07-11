import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/authContext";
import swal from "sweetalert";

const PayPal = (props) => {
  const history = useHistory();
  const { user, userStorage } = useAuth();
  const { product } = props;
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);

  const handleAprrove = (orderID) => {
    //Llamada de una función del backend para completar la órden de compra

    //Si la respuesta es exitosa
    setPaidFor(true);
    //Refresar el carrito
    
    //Si la respuesta es error
    //setError("El pago fue exitoso pero no pudimos pero lastimosamente no está disponible porcesar sus requerimientos, algo así")
  };

  if (paidFor) {
    //Desplegar algún modal, swal o redirección al usuario
    swal('Compra exitosa')
    localStorage.clear()
    window.location.reload()
    history.push('/')
    // alert("Gracias por la compra, por el momento es alert esta vaina")
  };

  if (error) {
    //Desplegar algún modal, swal o redirección al usuario
    swal("Cierre emergente detectado")
  };

  return (
    <PayPalButtons
      disabled={product.price === 0}
      onClick={(data, actions) => {
        if (userStorage === null) {
          setError("Tienes que estar registrado para poder comprar");
          history.push("/login");
          return actions.reject();
        } else {
          return actions.resolve();
        };
      }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: product.description,
              amount: {
                value: product.price
              }
            }
          ]
        })
      }}
      onAprove={async (data, actions) => {
        const order = await actions.order.capture();
        console.log("order", order);
        handleAprrove(data.orderID)
      }}
      onCancel={() => {
        //Desplegar algún modal, swal o redirección al usuario
        swal("Su orden ha sido cancelada")
      }}
      onError={(err) => {
        setError(err);
        console.error("PayPal Checkout onError", err)
      }}
    />
  );
};

export default PayPal;
