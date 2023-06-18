import { Navigate } from 'react-router-dom';

function UserProtectRouter(props) {
    
    if (!localStorage.getItem("token")) {
        return props.children;
    } else if (localStorage.getItem("token")) {
        return <Navigate to="/profile" />;
    }
}

export default UserProtectRouter;