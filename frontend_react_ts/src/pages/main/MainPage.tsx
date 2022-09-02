import React, {useEffect} from "react";
import Slider from "./Slider";
import {fetchUserInfo} from "../../store/actions/userInfoActions";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";

export default function () {

    return (
        <>
            <Slider/>
        </>
    )
}