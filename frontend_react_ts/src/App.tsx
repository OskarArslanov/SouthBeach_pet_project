import './styles/App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import NavbarHeader from "../src/global/navbar/NavbarHeader";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "../src/pages/main/MainPage";
import ContactsPage from "../src/pages/contacts/ContactsPage";
import CataloguePage from "../src/pages/catalogue/CataloguePage";
import UserPage from "./pages/user/UserPage";
import Interceptors from "./axios";
import LoginPage from "./pages/user/LoginPage";
import RegistrationPage from "./pages/user/RegistrationPage";

export default function() {
  Interceptors();
  localStorage.setItem("_logged", "false");
  return (
      <>
          <BrowserRouter>
          <NavbarHeader logged={localStorage.getItem("_logged")} onClick={() => localStorage.setItem("_logged", "false")}/>
          <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/registration" element={<RegistrationPage/>}/>
            <Route path="/contact" element={<ContactsPage/>}/>
            <Route path="/profile" element={<UserPage/>}/>
            <Route path="/catalogue" element={<CataloguePage/>}/>
          </Routes>
        </BrowserRouter>
      </>
  )
}