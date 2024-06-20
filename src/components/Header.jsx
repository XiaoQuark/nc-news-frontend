import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { SearchBar } from "./SearchBar";
import { SearchresultsList } from "./SearchResultsList";

export function Header({ setArticleList, setTopic, topic }) {
    const [results, setResults] = useState([]);
    const [input, setInput] = useState("");
    const { user } = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();

    const clearSearch = () => {
        setResults([]);
        navigate("/");
    };

    const handleHomeClick = () => {
        setTopic("");
        clearSearch();
        navigate("/");
    };

    return (
        <header>
            <h1 onClick={handleHomeClick} style={{ cursor: "pointer" }}>
                XQ News
            </h1>
            <div className='search-bar-container'>
                <SearchBar
                    setResults={setResults}
                    setTopic={setTopic}
                    topic={topic}
                    setInput={setInput}
                    input={input}
                />
                <SearchresultsList
                    results={results}
                    setResults={setResults}
                    setTopic={setTopic}
                    clearSearch={clearSearch}
                    setInput={setInput}
                />
            </div>
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
