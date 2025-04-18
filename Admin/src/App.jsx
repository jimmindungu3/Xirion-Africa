import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import SignIn from "./components/SignIn";
import ProductUploader from "./components/ProductUploader";
import Orders from "./components/Orders";
import Nav from "./components/Nav";

// Do not show Nav on sign in page
const NavWrapper = () => {
  const location = useLocation();
  return location.pathname !== "/" && <Nav />;
};

const App = () => {
  return (
    <Router>
      <NavWrapper />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/upload-product" element={<ProductUploader />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </Router>
  );
};

export default App;
