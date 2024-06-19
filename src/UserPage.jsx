import { useContext } from "react";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";

export function UserPage() {
    const { user, setUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <section>
            <h2>User Information</h2>
            {user ? (
                <div>
                    <img src={user.avatar_url} alt='User avatar' />
                    <p>Username: {user.username}</p>
                    <p>Name: {user.name}</p>
                    <Link to='/' onClick={handleLogout}>
                        Log Out
                    </Link>
                </div>
            ) : (
                <p>No user is logged in.</p>
            )}
        </section>
    );
}
