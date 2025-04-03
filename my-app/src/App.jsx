import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login'
import Success from './pages/Success'
import { Route, Switch} from 'react-router-dom/cjs/react-router-dom.min';

function App() {
  return (
    <Switch>
  
    <Route exact path='/'><Login/></Route>
    <Route path='/success'><Success/></Route>
  
    </Switch>
  )
}

export default App
