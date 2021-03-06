import { Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ShoppingCart from "./components/ShoppingCart";
import Wishlist from "./pages/Wishlist";
import { AuthProvider } from "./context/authContext";
import { CartProvider } from "./context/CartItem";
import PageShopingCart from "./pages/PageShopingCart";
import Register from "./pages/Register";
import CreationForm from "./components/CreationForm";
import PrivateRouteUser from "./components/PrivateRouteUser";
import Homeee from "./pages/Homeee";

function App() {
  return (
    <div className="App h-full">
      <AuthProvider>
        <CartProvider>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/detail/:id" component={Detail}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/:user/:id" component={Dashboard}></Route>
          <Route exact path="/user/:id/cart" component={ShoppingCart}></Route>
          <PrivateRouteUser exact path="/user/:id/wishlist" component={Wishlist} />
          <Route exact path="/cart" component={PageShopingCart}></Route>
          <Route exact path="/form" component={CreationForm} />
          <Route exact path="/home2" component={Homeee} />
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
