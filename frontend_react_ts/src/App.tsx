import './styles/App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "./header/Header";
import Footer from "./footer/Footer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Interceptors from "./axios";
import React from "react";
import Body from "./body/Body"

const App = () => {
  Interceptors();
  return (
      <BrowserRouter>
            <div className={"app"}>
                <Header/>
                <Body/>
                <Footer/>
            </div>
      </BrowserRouter>
    )
}
export default App;