import React, { Component } from "react";

class MLHBadge extends Component {
    render() {
        return (
            <a
                id="mlh-trust-badge"
                style={{
                    display: "block",
                    maxWidth: "100px",
                    minWidth: "60px",
                    position: "absolute",
                    right: "50px",
                    top: "0",
                    width: "10%",
                    zIndex: "10",
                }}
                href="https://mlh.io/seasons/2021/events?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2021-season&utm_content=white"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img
                    src="https://s3.amazonaws.com/logged-assets/trust-badge/2022/mlh-trust-badge-2022-white.svg"
                    alt="Major League Hacking 2022 Hackathon Season"
                    style={{ width: "100%" }}
                />
            </a>
        );
    }
}

export default MLHBadge;
