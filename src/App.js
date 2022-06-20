import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/Landing';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={LandingPage}></Route>
      <Route exact path='/home' component={Home}></Route>
    </div>
  );
}

export default App;
