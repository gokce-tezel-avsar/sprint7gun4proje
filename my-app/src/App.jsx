import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login'
import Success from './pages/Success'
import { BrowserRouter, Route, Router} from 'react-router-dom/cjs/react-router-dom.min';

function App() {
  return (
    <BrowserRouter>
  
    <Route> <Login/></Route>
    <Route> <Success/></Route>
  
    </BrowserRouter>
  )
}

export default App
