import React from 'react'
import {useSelector} from "react-redux";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";

export const AdminRoute = ({component: Component, ...rest}) => {
   const userLogin = useSelector((state) => state.userLogin);
   const {userInfo} = userLogin;
   return (
      <Router>
         <Route
            {...rest}
         render={(props) =>
            userInfo && userInfo.isAdmin ?
               (<Component {...props}></Component>
               ) : (
                  <Redirect to="/login"/>
               )
           }
        />
      </Router>

   );
};