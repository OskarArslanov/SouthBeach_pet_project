import React, {FunctionComponent, useState} from "react";

interface IProps {
    title : string,
    type : string,
    value? : string,
    placeholder? : string,
    onChange : any
}
const InputControl:FunctionComponent<IProps> = (props) => {
    const [name] = useState(Math.random().toString());
    return(
        <div>
            <label htmlFor={name}>{props.title}</label>
            <input type={props.type} className={"form-control"} id={name}
                   value={props.value}
                   placeholder={props.placeholder}
                   onChange={(e) => {
                       props.onChange(e.target.value)
                   }}/>
        </div>
    )
}
export default InputControl;