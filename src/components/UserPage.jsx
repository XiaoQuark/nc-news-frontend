import { useContext } from "react";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";
import "./styling/UserPage.css";
import { PageTitleWrapper } from "./PageTitleWrapper";
import ContentWrapper from "./ContentWrapper";
import "./styling/UserPage.css";

export function UserPage() {
    const { user, setUser } = useContext(UserContext);

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <section>
            <PageTitleWrapper>
                <h2>{user.username}</h2>
            </PageTitleWrapper>
            {user ? (
                <ContentWrapper className='content-wrapper'>
                    <img
                        className='user-page-avatar'
                        src={user.avatar_url}
                        alt='User avatar'
                    />
                    <div className='user-data'>
                        <p>Username: {user.username}</p>
                        <p>Name: {user.name}</p>
                    </div>
                    <Link to='/' onClick={handleLogout} id='logout'>
                        Log Out
                    </Link>
                </ContentWrapper>
            ) : (
                <p>No user is logged in.</p>
            )}
        </section>
    );
}
