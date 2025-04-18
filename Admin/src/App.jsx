import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import ProductUploader from "./components/ProductUploader";
import Orders from "./components/Orders";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/upload-product" element={<ProductUploader />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </Router>
  );
};

export default App;
