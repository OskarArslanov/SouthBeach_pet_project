import React, {useEffect, useState} from "react";
import "../../styles/Body.css"
import "../../styles/Buttons.css"
import MyProfile from "./content/MyProfile";
import MyProducts from "./content/MyProducts";
import MyCart from "./content/MyCart";
import MyBookmarks from "./content/MyBookmarks";

const UserPage = () => {
    let [state, setState] = useState(0)

    const content = (state:number) => {
        let result;
        switch (state) {
            case 0 : result = <MyProfile></MyProfile>;break;
            case 1 : result = <MyProducts></MyProducts>;break;
            case 2 : result = <MyCart></MyCart>;break;
            case 3 : result = <MyBookmarks></MyBookmarks>;break;
        }
        return result
    }
    return (
            <>
                <div className={"bodyNavs"}>
                    <div className={"menuButton"} onClick={()=> setState(0)}>Мой профиль</div>
                    <div className={"menuButton"} onClick={()=> setState(1)}>Мои товары</div>
                    <div className={"menuButton"} onClick={()=> setState(2)}>Моя корзина</div>
                    <div className={"menuButton"} onClick={()=> setState(3)}>Мои избранные</div>
                </div>
                <div className={"bodyContent"}>
                    {content(state)}
                </div>
                <div className={"bodyRecommends"}>
                        Recommends
                </div>
            </>
    )
}
export default UserPage;