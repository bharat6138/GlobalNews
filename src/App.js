import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import Navbar from './component/Navbar'
import News from './component/News'
import { NewsContextProvider } from "./emitter/NewsContext";
import NavigationLink from "./router/NavigationLink";
import LoadingBar from 'react-top-loading-bar'
const App =() => {
  return (
    <div>
     <NewsContextProvider>
       <NavigationLink/>
        </NewsContextProvider>
      </div>
  )
}
export default App