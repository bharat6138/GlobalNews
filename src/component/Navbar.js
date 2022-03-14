import React, { useContext, useEffect, useState } from "react";
import { NewsContext } from "../emitter/NewsContext";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactFlagsSelect from "react-flags-select";
function Navbar(props) {
  const { country, setCountry,apiKey} = useContext(NewsContext);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  //const onSelect = (code) => setCountry(code.target.value);
  const onSelect = (code) => setCountry(code);
  
  //console.log("SELECT", onSelect);
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-bg">
      <div className="container mx-5 news-header">
        <a className="navbar-brand" href="/">
		Global News 
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link"
                aria-current="page"
                to="/"
                category="general"
              >
                Home
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/about" category="about">
                About
              </Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link" to="/business" category="business">
                business
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/entertainment">
                entertainment
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/health">
                health
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/science">
                science
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sports">
                sports
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/technology">
                technology
              </Link>
            </li>
          </ul>

          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
