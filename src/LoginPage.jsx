import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export function LoginPage() {
    const [userList, setUserList] = useState([]);
    const { setUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        axios
            .get("https://xqnews.onrender.com/api/users")
            .then((response) => {
                setUserList(response.data.users);
            })
            .catch((error) => {
                setError("There was an error fetching the users!");
            });
    }, []);

    const handleLogin = (user) => {
        setUser(user);
        navigate(from);
    };

    return (
        <section>
            {error && <p className='error-msg'>{error}</p>}
            <h2>Select your account</h2>
            <ul className='user-list'>
                {userList.map((user) => (
                    <UserCard
                        key={user.username}
                        user={user}
                        onLogin={handleLogin}
                    />
                ))}
            </ul>
        </section>
    );
}

function UserCard({ user, onLogin }) {
    return (
        <div onClick={() => onLogin(user)}>
            <li>
                <img className='avatar' src={user.avatar_url} alt='' />
                <p>{user.username}</p>
            </li>
        </div>
    );
}
