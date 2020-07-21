import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { Icon } from "react-fa";

/**
 * About component for the landing page
 */
class Footer extends Component {
    render() {
        return (
            <div style={{marginLeft: -15, marginRight: -15 }}>
                <Grid>
                    <div className="footer bg-gradient-right"
                        style={{ zIndex: 15, boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)" }}>
                        <Grid container style={{ marginRight: 0, textAlign: "center" }}>
                            <div className="text-center col-lg-4"
                                style={{ padding: 0 }}>
                                <h6 className="align-middle mb-4">
                                    <a 
                                        href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer">MLH's Code of Conduct</a>
                                </h6>
                            </div>
                            <div className="col-lg-4 text-center align-middle mb-4 my-2"
                                style={{ padding: 0 }}>
                                <a href="mailto:info@hackru.org"
                                    className="social-links"
                                    target="_blank"
                                    rel="noopener noreferrer"><Icon size="2x"
                                        name="envelope" /></a>
                                <a href="https://www.facebook.com/theHackRU/"
                                    className="social-links"
                                    target="_blank"
                                    rel="noopener noreferrer"><Icon size="2x"
                                        name="facebook-square" /></a>
                                <a href="https://www.instagram.com/thehackru/"
                                    className="social-links"
                                    target="_blank"
                                    rel="noopener noreferrer"><Icon size="2x"
                                        name="instagram" /></a>
                                <a href="https://medium.com/the-hackru"
                                    className="social-links"
                                    target="_blank"
                                    rel="noopener noreferrer"><Icon size="2x"
                                        name="medium" /></a>
                                <a href="https://twitter.com/theHackRU"
                                    className="social-links"
                                    target="_blank"
                                    rel="noopener noreferrer"><Icon size="2x"
                                        name="twitter-square" /></a>
                            </div>
                            <div className="mb-5 mb-lg-0 text-center col-lg-4 mb-4 align-middle"
                                style={{ padding: 0 }}>
                                <a href="https://mlh.io/"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <img className="footer-logo"
                                        src="https://static.mlh.io/brand-assets/logo/official/mlh-logo-white.png"
                                        alt="MLH logo" />
                                </a>
                            </div>
                        </Grid>
                    </div>
                </Grid>
            </div>
        );
    }
}
export default Footer;
