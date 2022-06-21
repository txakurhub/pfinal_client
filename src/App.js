import { Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ShoppingCart from "./pages/ShoppingCart"
import Wishlist from "./pages/Wishlist";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/:id" component={Detail}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/:user/:id" component={Dashboard}></Route>
      <Route exact path='/user/:id/cart' component={ShoppingCart}></Route>
      <Route exact path='/user/:id/wishlist' component={Wishlist}></Route>
    </div>
  );
}

export default App;
