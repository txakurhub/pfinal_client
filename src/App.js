import { Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home'

function App() {
  return (
    <div className="App">
      <Route exact path='/home' component={Home}></Route>
    </div>
  );
}

export default App;
