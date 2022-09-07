import React from "react";


interface IProps {
    isChecked: boolean,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    label: string
}
const CheckBox = (props:IProps) => {
    return (
        <div>
            <input
                type="checkbox"
                id={props.label}
                checked={props.isChecked}
                onChange={props.handleChange}
            />
            <label htmlFor={props.label}>{props.label}</label>

        </div>
    )
}

export default CheckBox;