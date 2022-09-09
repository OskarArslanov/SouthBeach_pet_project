import React, {FunctionComponent} from "react";

interface IProps {
    name: string ,
    title : string,
    type : string,
    value : string,
    placeholder? : string,
    onChange : Function
}
const InputControl:FunctionComponent<IProps> = (props) => {
    return(
        <div>

            <label htmlFor={props.name}>{props.title}</label>
            <input type={props.type} className={"form-control"} id={props.name}
                   value={props.value}
                   placeholder={props.placeholder}
                   onChange={(e) => {
                       props.onChange(e.target.value)
                   }}/>
        </div>
    )
}
export default InputControl;