import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export function Header({ setArticleList, setTopic, topic }) {
    useEffect(() => {
        console.log("useEffect is here");
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
            <UserAvatar />
        </header>
    );
}

function SearchBar() {
    return <input type='text' placeholder='search' id='search-bar' />;
}

function UserAvatar() {
    return (
        <Link to='/user' className='user-avatar'>
            <div></div>
        </Link>
    );
}
