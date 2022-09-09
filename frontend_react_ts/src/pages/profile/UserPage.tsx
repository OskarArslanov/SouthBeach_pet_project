import React, {useEffect, useState} from "react";
import "../../styles/Body.css"
import Main from "./content/Main";

const UserPage = () => {

    let [state, setState] = useState(0)

    return (
            <>
                <div className={"bodyNavs"}>
                    <div className={"menuButton"} onClick={()=> setState(0)}>Главная</div>
                    <div className={"menuButton"} onClick={()=> setState(1)}>Мои товары</div>
                    <div className={"menuButton"} onClick={()=> setState(2)}>Моя корзина</div>
                    <div className={"menuButton"} onClick={()=> setState(3)}>Мои избранные</div>
                </div>
                <div className={"bodyContent"}>

                </div>
                <div className={"bodyRecommends"}>
                        Recommends
                </div>
            </>
    )
}
export default UserPage;