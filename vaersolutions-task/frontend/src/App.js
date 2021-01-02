import './App.css';
import { Switch, Route} from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import ProtectedRouter from './components/protect';
import Home from './components/Home';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './components/profile';

function App() {
  return (
    <div>
       <Switch>
       <Route exact path="/" component = {Register}/>
        <Route exact path="/login" component = {Login}/>
        <Route exact path="/register" component = {Register}/>
        <Route exact path="/profile" component = {Profile}/>
        <ProtectedRouter exact path="/home" component = {Home} />
      </Switch>
      <ToastContainer/>
    </div>
  );
}

export default App;
