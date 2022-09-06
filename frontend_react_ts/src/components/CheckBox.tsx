import React from "react";
import "./Components.css"
const CheckBox = (props:any) => {
    return (
        <div className={"checkbox-wrapper"}>
            <label>
                <input type={"checkbox"}/>
                <span>{props.label}</span>
            </label>
        </div>
    )
}
export default CheckBox;