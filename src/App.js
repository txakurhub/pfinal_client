import { Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
// import Login from "./pages/Login";
import ShoppingCart from "./pages/ShoppingCart"
import Signup from "./pages/Signup";
import Wishlist from "./pages/Wishlist";
import {AuthProvider} from './context/authContext'
import Signin from "./pages/Signin";

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/:id" component={Detail}></Route>
      <Route exact path="/login" component={Signin}></Route>
      <Route exact path="/register" component={Signup}></Route>
      <Route exact path="/:user/:id" component={Dashboard}></Route>
      <Route exact path='/user/:id/cart' component={ShoppingCart}></Route>
      <Route exact path='/user/:id/wishlist' component={Wishlist}></Route>
      </AuthProvider>
    </div>
  );
}

export default App;
