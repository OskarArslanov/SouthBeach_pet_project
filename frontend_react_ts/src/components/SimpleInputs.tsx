import React, {FunctionComponent} from "react";
import "./Buttons.css"

interface ITextProps {
    name: string ,
    title? : string,
    type : string,
    value : string,
    placeholder? : string,
    onChange : Function
}
export const TextInput:FunctionComponent<ITextProps> = (props) => {
    return(
        <div>
            <label htmlFor={props.name}>{props.title}</label>
            <input type={props.type} className={"form-control"} id={props.name} value={props.value}
                   placeholder={props.placeholder}
                   onChange={(e) => {props.onChange(e.target.value)}}/>
        </div>
    )
}


interface ICheckProps {
    title: string,
    checked: boolean | undefined,
    name: string,
    onChange: any
}
export const CheckInput = (props:ICheckProps) => {
    return (
        <label className="container">
            <input name={props.name} type="checkbox" checked={props.checked}  onChange={props.onChange}/>
            {props.title}
        </label>
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
