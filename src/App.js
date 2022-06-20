import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import Landing from './components/LandingPage/Landing'
import Detalle from './components/Card/Card';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <Route exact path='/home' component={Home}></Route>
      <Route exact path='/detalle/:id' component={Detalle}></Route>

    </div>
  );
}

export default App;
