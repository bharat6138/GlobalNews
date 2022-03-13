import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import LoadingBar from 'react-top-loading-bar'
export const NewsContext = createContext();


export const NewsContextProvider = (props) => {
  const [country, setCountry] = useState("IN");
  const [progress, setProgress] = useState(10);
  const [page, setPage] = useState(1);
  const apiKey = "8db59a7b9e90473aba85e22410ace8fb";
  // 8db59a7b9e90473aba85e22410ace8fb
  // fba72aee925d4e64b93080ffa0f04836
  return (
    <>
    {/* <LoadingBar
    color='#f11946'
    progress={progress}
  /> */}
    <NewsContext.Provider value={{ country, setCountry,apiKey, setProgress}} category={props.category}>
      {props.children}
    </NewsContext.Provider>
    </>
  );

};
  




