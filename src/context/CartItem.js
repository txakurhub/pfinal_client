import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/authContext";
import swal from 'sweetalert';
import {local_url} from '../redux/actions'

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const history = useHistory();
  const { userData } = useAuth();
  const [cartItem, setCartItem] = useState(() => {
    try {
      const productosEnLocalStorage = localStorage.getItem("cartProducts");
      return productosEnLocalStorage ? JSON.parse(productosEnLocalStorage) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartItem));
    // console.log(cartItem);
  }, [cartItem]);

  const addToCart = (product) => {
    const inCart = cartItem.find(
      (productInCart) => productInCart.id === product.id
    );
    if (inCart) {
      setCartItem(
        cartItem.map((productInCart) => {
          if (productInCart.id === product.id && inCart.amount < product.stock) {
            return { ...inCart, amount: inCart.amount + 1 };
          } else return productInCart;
        })
      );
    } else {
      setCartItem([...cartItem, { ...product, amount: 1 }]);
    }
    
    swal({
        title: "Product added to Cart",
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
        buttons:{
          confirm: {text:'Go to Cart'},
          cancel:'Keep buying'
        }
    })
    .then((will)=>{
      if(will){
          history.push('/cart')
      }else{
          return null
      }
  });
  };
  const addToCart2 = (product) => {
    const inCart = cartItem.find(
      (productInCart) => productInCart.id === product.id
    );
    if (inCart) {
      setCartItem(
        cartItem.map((productInCart) => {
          if (productInCart.id === product.id && inCart.amount < product.stock) {
            return { ...inCart, amount: inCart.amount + 1 };
          } else return productInCart;
        })
      );
    } else {
      setCartItem([...cartItem, { ...product, amount: 1 }]);
    }
    

  };

  const deleteItemToCart = (product) => {
    const inCart = cartItem.find(
      (productInCart) => productInCart.id === product.id
    );

    if (inCart.amount === 1) {
      return inCart;
    } else {
      setCartItem(
        cartItem.map((productInCart) => {
          if (productInCart.id === product.id) {
            return { ...inCart, amount: inCart.amount - 1 };
          } else return productInCart;
        })
      );
    }

  };

  const deleteItemCantidad = (product) => {
    const inCart = cartItem.find(
      (productInCart) => productInCart.id === product.id
    );
    swal({
      title: "Are you sure?",
      input: "text",
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      buttons:{
        confirm: {text:'Yes'},
        cancel:'No'
      }
  })
  .then((will)=>{
    if(will){
      if (inCart.amount > 0) {
        setCartItem(
          cartItem.filter((productInCart) => productInCart.id !== product.id)
        );
      } else {
        setCartItem((productInCart) => {
          if (productInCart.id === product.id) {
            return { ...inCart, amount: inCart.amount - inCart.amount };
          } else return productInCart;
        });
      }
      
    }else{
        return null
    }

  });
  };

  const deleteTotal = (cartItem) =>{
    swal({
      title: "Are you sure?",
      input: "text",
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      buttons:{
        confirm: {text:'Yes'},
        cancel:'No'
      }
  })
  .then((will)=>{
    if(will){
      localStorage.clear(cartItem)
      window.location.reload()
    }else{
        return null
    }
    });
  }

  const sendMP = async () => {
    const currentUser = await userData();
    if (currentUser) {
      try {
        const items = cartItem.map((e) => {
          axios.put(`${local_url}/shoes/${e.id}`, {stock: e.amount , sold: e.sold})
          return {
            id: e.id,
            title: e.title,
            description: `${e.title}, ${e.brand}, ${e.model}`,
            picture_url: e.image,
            category_id: "category234",
            quantity: e.amount,
            unit_price: e.price,
          };
        });
        const body = {
          items: items,
          email: currentUser.email,
          user_id: currentUser.uid,
        };

        const response = axios
          .post("http://localhost:3001/payments", body)
          .then((res) => res.data[0]);
        return response
      } catch (error) {
        console.log(error);
      }
    } else {
      swal("You have to be logged in to be able to buy!");
      history.push("/login");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItem,
        addToCart,
        deleteItemToCart,
        deleteItemCantidad,
        sendMP,
        deleteTotal,
        addToCart2
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
