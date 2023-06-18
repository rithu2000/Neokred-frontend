import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Auth } from '../axios/axios';

function UserPublicRoute(props) {

    useEffect(() => {
        (async () => {
            const data = await Auth()
            console.log(data);
            if (!data.status) {
                localStorage.clear()
            }
        })()
    }, [])
    if (!localStorage.getItem("token")) {
        return <Navigate to="/login" />;
    }
    if (localStorage.getItem("token")) {
        return props.children;
    }
}

export default UserPublicRoute;