import React, {FunctionComponent, useEffect, useState} from "react";
import "../styles/Buttons.css"

interface ITextProps {
    name: string ,
    title? : string,
    type : string,
    value : string,
    placeholder? : string,
    onChange : Function,
    required?: boolean,
    pattern?: string
}
export const TextInput:FunctionComponent<ITextProps> = (props) => {
    return(
        <div>
            {props.title ? <label htmlFor={props.name}>{props.title}</label> : '' }
            <input type={props.type} className={"form-control"} id={props.name} value={props.value}
                   placeholder={props.placeholder} required={props.required} pattern={props.pattern}
                   onChange={(e) => {props.onChange(e.target.value)}}/>
        </div>
    )
}


interface ICheckProps {
    name: string,
    title: string,
    checked?: boolean,
    onClick: any
}
export const CheckInput = (props:ICheckProps) => {

    let [pressed, setPressed] = useState(props.checked)
    const handleClick = () => {
        setPressed(!pressed)
        props.onClick(!pressed)
    }
    return (
        <div className={"stateButton"} onClick={handleClick} style={{backgroundColor: (pressed? "green" : "gray")}}>
            {props.title}
        </div>
    )
}

export const MenuButton = () => {
    return (
        <>

        </>
    )
}

export const SearchButton = () => {
    return (
        <>

        </>
    )
}
