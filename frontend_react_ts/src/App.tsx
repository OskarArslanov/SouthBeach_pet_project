import './styles/App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import NavbarHeader from "../src/global/navbar/NavbarHeader";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "../src/pages/main/MainPage";
import ContactsPage from "../src/pages/contacts/ContactsPage";
import CataloguePage from "../src/pages/catalogue/CataloguePage";
import UserPage from "../src/pages/user/UserPage";
import Interceptors from "./global/Interceptors";
import LoginPage from "../src/pages/login/LoginPage";
import RegistrationPage from "../src/pages/registration/RegistrationPage";
import {useState} from "react";

export default function() {
    localStorage.setItem("auth", "false");
  Interceptors();
  return (
      <>
        <BrowserRouter>
          <NavbarHeader/>
          <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/registration" element={<RegistrationPage/>}/>
            <Route path="/contact" element={<ContactsPage/>}/>
            <Route path="/users/:username" element={<UserPage/>}/>
            <Route path="/catalogue" element={<CataloguePage/>}/>
          </Routes>
        </BrowserRouter>
      </>
  )
}