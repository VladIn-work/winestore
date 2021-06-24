import styled from "styled-components";


export const NavBarStyled = styled.div`
 .navbar {
     background-color: #AF9D82;
     //background-color: #B19062;
 }
 .navbar-nav .nav-link {
     //color: #0A0A0A;
     color: #fff;
     font-weight: 500;
     letter-spacing: 1px;
 }
  .navbar-nav .nav-link:hover {
     color: #fff;
     //margin-bottom: -2px;
     //border-bottom: 2px solid #0A0A0A;
     //border-bottom: 2px solid #fff;
}
 .navbar-nav .nav-link:after {
    content: '';
    display: block;
    color: #fff;
    padding-top: 3px;
    margin: 0 0 0 auto;
    width: 0;
    border-bottom: 3px solid #000;
    transition: .3s;
}
 .navbar-nav .nav-link:hover::after {
    color: #fff;
    width: 100%;
}
 .logo {
    color: #fff;
    font-size: 1.5rem;
    font-weight: bold;
    font-family: BrowalliaUPC;
    text-transform: uppercase;
    padding: 0;
 }
 .logo:hover {
   border: none;
   color: #fff;
 }
 .ml-auto {
   position: relative;
 }
 .navbar-toggler {
   color: #fff;
   border: 1px solid #fff;
 }
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const InputError = styled.span`
  color: #b32e2e;
  font-size: 14px;
  min-height: 18px;
`;