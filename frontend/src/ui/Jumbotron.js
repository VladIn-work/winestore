import React from "react";
import { Jumbotron as Jumbo, Container } from "react-bootstrap";

import styled from "styled-components";
import jumbo from "../images/logo/wine-barrels.png";

const StyledJumboTron = styled.div`
  .bg-image {
      background: url(${jumbo}) no-repeat fixed bottom;
      background-size: cover;
      height: 320px;
      position: relative;
      z-index: -3;
      display: flex;
      justify-content: center;
      align-items: center;
  }
  .overlay-bg {
      background-color: #2d2d2e;
      opacity: 0.5;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
  }
  .banner {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  margin-top: 65px;
  text-transform: uppercase;
`;


export const Jumbotron = () => {
    return (
        <StyledJumboTron>
            <Jumbo fluid className="bg-image">
                <div className="overlay-bg"></div>
                    <Container>
                        <h1 className="banner">wine store</h1>
                    </Container>
            </Jumbo>
        </StyledJumboTron>
    )
}