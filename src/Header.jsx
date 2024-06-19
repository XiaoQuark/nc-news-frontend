import { useEffect, useContext } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "./UserContext";

export function Header({ setArticleList, setTopic, topic }) {
    const { user } = useContext(UserContext);
    const location = useLocation();

    useEffect(() => {
        axios.get("https://xqnews.onrender.com/api/topics").then((response) => {
            console.log(response.data.topics);
        });
    }, []);

    return (
        <header>
            <Link to='/'>
                <h1>XQ News</h1>
            </Link>
            <SearchBar
                setArticleList={setArticleList}
                setTopic={setTopic}
                topic={topic}
            />
            {user ? (
                <Link to='/user'>
                    <img
                        src={user.avatar_url}
                        alt='User avatar'
                        className='user-avatar'
                    />
                </Link>
            ) : (
                <Link to='/login' state={{ from: location }}>
                    Log In
                </Link>
            )}
        </header>
    );
}

function SearchBar() {
    return <input type='text' placeholder='search' id='search-bar' />;
}
