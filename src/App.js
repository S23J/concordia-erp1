import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";

import {
  AddCustomer,
  AddNewFunnels,
  EditCustomer,
  EditFunnels,
  EditOrderRequest,
  Funnels,
  ListCustomer,
  ListFunnels,
  Login,
  OrderRequest,
  SalesHomePage,
  SalesManagerHomePage
} from "./pages";
import { PrivateRouteComp } from "./auth";
import AddNewOrderRequest from "./pages/Sales/AddNewOrderRequest";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
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
        <Route path="/data-funnels"
          element={
            <PrivateRouteComp >
              <ListFunnels />
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

        <Route path="/tambah-order-request"
          element={
            <PrivateRouteComp >
              <AddNewOrderRequest />
            </PrivateRouteComp>
          }
        />
        <Route path="/ubah-order-request/:order_id"
          element={
            <PrivateRouteComp >
              <EditOrderRequest />
            </PrivateRouteComp>
          }
        />
        <Route path="/customer"
          element={
            <PrivateRouteComp >
              < ListCustomer />
            </PrivateRouteComp>
          }
        />
        <Route path="/add-customer"
          element={
            <PrivateRouteComp >
              < AddCustomer />
            </PrivateRouteComp>
          }
        />
        <Route path="/edit-customer/:custid"
          element={
            <PrivateRouteComp >
              <EditCustomer />
            </PrivateRouteComp>
          }
        />
      </Routes>
    </BrowserRouter>

  );
}

export default App;