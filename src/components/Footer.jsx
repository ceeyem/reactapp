import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer>
            <p className="credits">Project by <Link to="https://twitter.com/shl">Sahil Lavingia</Link> •  <Link to="https://github.com/slavingia/askmyboo">Fork on GitHub</Link> </p>
        </footer>
    );
}

export default Footer
