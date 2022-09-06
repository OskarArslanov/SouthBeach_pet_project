import React from "react";
import {Route, Routes} from "react-router-dom";
import LoginPage from "../header/LoginPage";
import RegistrationPage from "../header/RegistrationPage";
import ContactsPage from "../pages/contacts/ContactsPage";
import UserPage from "../pages/profile/UserPage";
import CataloguePage from "../pages/catalogue/CataloguePage";
import "../styles/Body.css"
import HelpPage from "../pages/help/HelpPage";
import MainPage from "../pages/main/MainPage";

const Body = () => {
    return (
        <div className={"body"}>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/registration" element={<RegistrationPage/>}/>
                <Route path="/contacts" element={<ContactsPage/>}/>
                <Route path="/profile" element={<UserPage/>}/>
                <Route path="/catalogue" element={<CataloguePage/>}/>
                <Route path="/help" element={<HelpPage/>}/>
            </Routes>

        </div>
    )
}
export default Body;