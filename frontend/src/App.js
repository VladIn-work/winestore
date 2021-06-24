import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Home } from "./components/Home";
import { Layout } from "./ui/Layout";
import { NavigationBar } from "./ui/NavigationBar";
import { Jumbotron } from "./ui/Jumbotron";
import { ProductView } from "./views/ProductView";
import { Footer } from "./components/Footer";
import { CartView } from "./views/CartView";
import { LogInView } from "./views/LogInView";
import { SignUp } from "./views/SignUp";
import {PaymentView} from "./views/PaymentView";
import {PlaceOrderView} from "./views/PlaceOrderView";
import {AdminRoute} from "./components/AdminRoute";
import {ProductListView} from "./views/ProductListView";
import {ProductEditView} from "./views/ProductEditView";



function App() {
  return (
    <React.Fragment>
        <NavigationBar />
        <Jumbotron />
        <Layout>
            <Router>
                <Switch>
                    <Route exact path="/product/:id" component={ ProductView } />
                    <Route exact path="/product/:id/edit" component={ ProductEditView } />
                    <Route path="/login" component={ LogInView } />
                    <Route path="/signup" component={ SignUp } />
                    <Route path="/payment" component={ PaymentView } />
                    <Route path="/placeorder" component={ PlaceOrderView } />
                    <Route path="/cart/:id?" component={ CartView } />
                    <AdminRoute path="/productlist" component={ProductListView} />
                    <Route exact path="/" component={ Home } />
                </Switch>
            </Router>
        </Layout>
        <Footer/>
    </React.Fragment>
  );
}

export default App;
