import React from "react";
//import {Row, Col} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faYoutube, faFacebook, faTwitter, faInstagram
} from "@fortawesome/free-brands-svg-icons";


export const Footer = () => {
    return (
        <div className="containe social-container">
                <h3 className="footer-header">Follow us on</h3>
                <a
                    href="https://www.youtube.com/channel/UCW1cNz9HZGZ32OK2FWE2nLg/featured"
                    className="youtube social"
                >
                    <FontAwesomeIcon icon={faYoutube} size="2x" />
                </a>
                <a
                    href="https://www.facebook.com"
                    className="facebook social"
                >
                    <FontAwesomeIcon icon={faFacebook} size="2x" />
                </a>
                <a href="https://www.twitter.com" className="twitter social">
                    <FontAwesomeIcon icon={faTwitter} size="2x" />
                </a>
                <a
                    href="https://www.instagram.com"
                    className="instagram social"
                >
                    <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>
         </div>
    )
}