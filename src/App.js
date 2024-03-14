import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import PrivateRouteComp from "./auth/PrivateRoute";
import Home from "./pages/Home";
import SalesManagerPage from "./pages/SalesManagerPage";
import SalesPage from "./pages/SalesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Login /> } />
        {/* <Route path="/home"
          element={
            <PrivateRouteComp >
              <Home />
            </PrivateRouteComp>
          }
        /> */}
        <Route path="/sales-manager"
          element={
            <PrivateRouteComp >
              <SalesManagerPage />
            </PrivateRouteComp>
          }
        />
        <Route path="/sales"
          element={
            <PrivateRouteComp >
              <SalesPage />
            </PrivateRouteComp>
          }
        />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
