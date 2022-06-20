import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={LandingPage}></Route>
      <Route exact path='/home' component={Home}></Route>
    </div>
  );
}

export default App;
