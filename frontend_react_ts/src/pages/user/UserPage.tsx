import {Container} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchUser} from "../../store/actions/userActions";
import UserGenInfo from "./UserGenInfo";

const UserPage = () => {
    const dispatch = useAppDispatch();
    const {error, loading, user} = useAppSelector(state => state.user);

    useEffect(() => {
        dispatch(fetchUser())
    }, [])

    let [userInfo, setUserInfo] = useState(user)

    useEffect(() => {
        setUserInfo(user)
    }, [user])

    return (
        <Container>
            <div className={"row"}>
                <div className={"col"}>
                    {loading ? <div> Loading... </div> : <UserGenInfo onChange={setUserInfo} userInfo={userInfo} />}
                    {error? <div className={"text-center text-red-600"}>{error}</div> : ''}
                </div>
                <div className={"col"}>
                    <div className={"row"}>
                        Cart
                    </div>
                    <div className={"row"}>
                        Cart elements
                    </div>
                </div>
            </div>
        </Container>
    )
}
export default UserPage;