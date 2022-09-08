import React, {ChangeEventHandler} from "react";


interface IProps {
    title: string,
    checked: boolean | undefined,
    name: string,
    onChange: any
}
const CheckBox = (props:IProps) => {
    return (
        <label className="container">
            <input name={props.name} type="checkbox" checked={props.checked}  onChange={props.onChange}/>
            {props.title}
            {/*<span className="checkmark"></span>*/}
        </label>
    )
}
export default CheckBox;
