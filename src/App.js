import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Product from "./component/Product";
import Admin from "./component/Admin";
import "./style/admin.css";


function App() {

  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Product />}></Route>
      <Route path='/admin' element={<Admin />}></Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App;

