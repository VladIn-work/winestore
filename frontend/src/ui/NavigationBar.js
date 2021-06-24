import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Nav, Navbar, NavItem, NavLink, } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  { faBars }  from "@fortawesome/free-solid-svg-icons";

import { logout } from "../actions/userActions";
import { NavBarStyled } from "./StyledForm";


export const NavigationBar = () => {
    const cart = useSelector((state) => state.cart);
    const {cartItems} = cart;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(logout());
    };
    return (
        <NavBarStyled>
        <Navbar className ="nav-bar" expand="lg" fixed="top">
            <Navbar.Brand className ="logo" href='/'>wine store</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav">
                <FontAwesomeIcon icon={faBars} />
            </Navbar.Toggle>
            <Navbar.Collapse id ="responsive-navbar-nav">

                <Nav className ="mr-auto">
                    <Nav.Item><Nav.Link  href="/">Home</Nav.Link></Nav.Item >
                </Nav>

                <Nav className="ml-auto">
                    <Nav.Item><NavLink className ="cart" href="/cart">Basket
                        {cartItems.length > 0 && (
                          <span className="cart-basket">{cartItems.length}</span>
                        )}
                    </NavLink></Nav.Item>
                    {
                        userInfo ? (
                          <NavItem className="dropdown">
                              <NavLink
                                href="#">{userInfo.name} <i className="fa fa-caret-down"></i>
                             </NavLink>
                              <ul className="dropdown-content">
                                  <NavLink href="#logout" onClick={logoutHandler}>Log Out</NavLink>
                              </ul>
                          </NavItem>
                        ) : (
                          <Nav.Item><NavLink href="/login">Log In</NavLink></Nav.Item>
                        )
                    }
                    {
                        userInfo && userInfo.isAdmin && (
                           <NavItem className="dropdown">
                               <NavLink href="#admin">
                                   Admin <i className="fa fa-caret-down"></i>
                               </NavLink>
                               <ul className="dropdown-content">
                                   <li>
                                       <NavLink href="/productlist">Products</NavLink>
                                   </li>
                                   <li>
                                       <NavLink href="/userlist">Users</NavLink>
                                   </li>
                               </ul>
                           </NavItem>
                        )
                    }
                    <Nav.Item><NavLink href="/signup">Sign Up</NavLink></Nav.Item>

                </Nav>
            </Navbar.Collapse>
        </Navbar>

    </NavBarStyled>
    )
};
