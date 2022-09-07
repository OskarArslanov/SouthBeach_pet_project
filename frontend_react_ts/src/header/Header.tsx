import "../styles/Header.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Header = () => {
    let navigate = useNavigate();
    const unAuthenticated =
        <>
            <div className={"headerButton"} onClick={() => navigate("/login")}>Войти</div>
            <div className={"headerButton"} onClick={() => navigate("/registration")}>Регистрация</div>
        </>

    const handleLogout = async () => {
        const response = await axios.get("/auth/logout");
        if (response.status === 200) {
            localStorage.clear()
            navigate("/")
        }
    }
    const authenticated =
        <>
            <div className={"headerButton"} onClick={() => navigate("/profile")}>Профиль</div>
            <div className={"headerButton"} onClick={handleLogout}>Выйти</div>
        </>


    return (
        <div className={"header"}>
                <div className={"headerLogo"}>
                    <div className={"link"} onClick={() => navigate("/")}>SouthBeach</div>
                </div>
                <div className={"headerContent"}>
                    <div className={"link"} onClick={() => navigate("/catalogue")}>Каталог</div>
                    <div className={"link"} onClick={() => navigate("/contacts")}>Контакты</div>
                    <div className={"link"} onClick={() => navigate("/help")}>Помощь</div>
                </div>
                <div className={"headerAuth"}>
                    {localStorage.getItem("_logged") === "true" ? authenticated : unAuthenticated}
                </div>
        </div>

    )
}
export default Header;