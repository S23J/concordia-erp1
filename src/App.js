import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import PrivateRouteComp from "./auth/PrivateRoute";
import Home from "./pages/Home";
import SalesHomePage from "./pages/Sales/Home";
import SalesManagerHomePage from "./pages/SalesManager/Home";
import Funnels from "./pages/Sales/Funnels";
import OrderRequest from "./pages/Sales/OrderRequest";
import AddNewFunnels from "./pages/Sales/AddNewFunnels";
import EditFunnels from "./pages/Sales/EditFunnels";

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
              <SalesManagerHomePage />
            </PrivateRouteComp>
          }
        />
        <Route path="/sales"
          element={
            <PrivateRouteComp >
              <SalesHomePage />
            </PrivateRouteComp>
          }
        />
        <Route path="/funnels"
          element={
            <PrivateRouteComp >
              <Funnels />
            </PrivateRouteComp>
          }
        />
        <Route path="/tambah-funnels"
          element={
            <PrivateRouteComp >
              <AddNewFunnels />
            </PrivateRouteComp>
          }
        />
        <Route path="/edit-funnels/:transid"
          element={
            <PrivateRouteComp >
              <EditFunnels />
            </PrivateRouteComp>
          }
        />
        <Route path="/order-request"
          element={
            <PrivateRouteComp >
              <OrderRequest />
            </PrivateRouteComp>
          }
        />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
