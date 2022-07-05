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
import FormShoes from "./components/FormShoes";
import Shopping from "./pages/Shopping";
import UpdateUser from "./components/UpdateUser";
import Users from "./components/Users";
import Reviews from "./components/Reviews";
import PayPal from "./components/PayPal";
import UserDash from './pages/UserDashboard/UserDash'
import { PayPalScriptProvider } from "@paypal/react-paypal-js"

import UserProfile from "./pages/UserProfile";
import PrivateRouteAdmin from "./components/PrivateRouteAdmin";

function App() {
  return (
    <div className="App h-full">
      <AuthProvider>
        <PayPalScriptProvider options={{ "client-id": "AXAlXaLLWCzJX-5bYV9Aipb0kLvhidtU9uYyZIEwMtDKYOdle8MJttBT7CS2XIGRV_w84KE75YD2_eG3" }}>
          <CartProvider>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/detail/:id" component={Detail}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>
            <PrivateRouteAdmin exact path="/admin/:id" component={Dashboard} />
            <Route exact path="/user/:id/cart" component={ShoppingCart}></Route>
            <PrivateRouteUser exact path="/user/:id/wishlist" component={Wishlist} />
            <Route exact path="/cart" component={PageShopingCart}></Route>
            <Route exact path="/form" component={CreationForm} />
            <Route exact path="/home2" component={Homeee} />
            <Route exact path="/admin/edit/:id" component={FormShoes} />
            <Route exact path="/users" component={Users} />
            <Route exact path='/shopping/' component={Shopping} />
            <PrivateRouteUser exact path="/user/profile/:id" component={UserDash} />
          </CartProvider>
        </PayPalScriptProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
