import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '../axios/axios';

function UserPublicRoute(props) {
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            const data = await Auth()
            console.log(data);
            if (!data.status) {
                localStorage.clear()
                navigate('/login')
            }
        })()
    },[])
    if (!localStorage.getItem("token")) {
        return navigate('/login')
    }
    if (localStorage.getItem("token")) {
        return props.children;
    }
}

export default UserPublicRoute;