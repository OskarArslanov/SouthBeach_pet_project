import React, {ChangeEventHandler} from "react";


interface IProps {
    label: string,
    value: string,
    onChange: ChangeEventHandler<HTMLInputElement>
}
const CheckBox = (props:IProps) => {
    return (
        <label className="container">
            <input type="checkbox" value={props.value} onChange={props.onChange}/>
            {props.label}
            <span className="checkmark"></span>
        </label>
    )
}
export default CheckBox;
