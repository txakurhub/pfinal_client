
import logo from './logo.svg';
import { Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home'
import Detalle from './components/Card/Card';

function App() {
  return (
    <div className="App">
      <Route exact path='/home' component={Home}></Route>
      <Route exact path='/detalle/:id' component={Detalle}></Route>

    </div>
  );
}

export default App;
