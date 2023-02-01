// import { useGoogleLogin } from '@react-oauth/google';
import "./App.css";

import { Route, Routes } from 'react-router-dom';
import HomePage from './components/Home/page';
import Login from './components/Home/Login';
import Register from './components/Home/Register';
import Product from './components/Shop/Product';
import Shop from './components/Shop';



const App = () => {




  return (

    <Routes>
      <Route path="/" element={<HomePage />} >
        <Route index element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/:title" element={<Product />} />
        <Route path="/Shop" element={<Shop />} />
      </Route>
    </Routes>







  );
};

export default App;
