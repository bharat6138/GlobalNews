import React, { Component, useState, useContext}from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NewsContext } from "../emitter/NewsContext";
import Navbar from "../component/Navbar";
import News from "../component/News";
import LoadingBar from 'react-top-loading-bar'


export default class NavigationLink extends Component {
  pageSize=6;
  state={
    progress:"0"
  }
    setProgress = (progress) => {
  this.setState({progress:progress})
    }
    render() {
  return (
    <>
   <LoadingBar color='#f11946' progress={this.state.progress} />
      <BrowserRouter>
     
        <Navbar />
        <Routes>
          <Route
            exact
            path="/"
            element={<News key="/" setProgress={this.setProgress}   category="general" pageSize={this.pageSize} />}
          ></Route>
          <Route
            exact
            path="/business"
            element={<News key="/business" setProgress={this.setProgress}   category="business" pageSize={this.pageSize} />}
          ></Route>
          <Route
            exact
            path="/entertainment"
            element={<News key="/entertainment" setProgress={this.setProgress}   category="entertainment" pageSize={this.pageSize}/>}
          ></Route>
          <Route
            exact
            path="/health"
            element={<News key="/health" setProgress={this.setProgress}   category="health" pageSize={this.pageSize}/>}
          ></Route>
          <Route
            exact
            path="/science"
            element={<News key="/science" setProgress={this.setProgress}   category="science" pageSize={this.pageSize}/>}
          ></Route>
          <Route
            exact
            path="/sports"
            element={<News key="/sports" setProgress={this.setProgress}   category="sports" pageSize={this.pageSize}/>}
          ></Route>
          <Route
            exact
            path="/technology"
            element={<News key="/technology" setProgress={this.setProgress}   category="technology" pageSize={this.pageSize}/>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
    }
};


