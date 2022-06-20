import logo from './logo.svg';
import { Route } from 'react-router-dom';
import './App.css';
<<<<<<< HEAD
import Home from './components/Home/Home'
import Landing from './components/LandingPage/Landing'
=======
import { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/Landing';
import Home from './components/Home/Home';
>>>>>>> b651ca077994ade24642290ae4cee0ccadd97533

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Landing}></Route>
      <Route exact path='/home' component={Home}></Route>
    </div>
  );
}

export default App;
