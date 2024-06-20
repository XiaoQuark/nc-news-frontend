import { FaSearch } from "react-icons/fa";
import "./styling/SearchBar.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SearchBar({ setResults, setTopic, setInput, input }) {
    const navigate = useNavigate();

    const handleSearchInput = (event) => {
        const value = event.target.value;
        setInput(value);
        axios
            .get("https://xqnews.onrender.com/api/topics/", {
                params: { topic: value },
            })
            .then((response) => {
                const searchResults = response.data.topics.filter((topic) => {
                    return (
                        value &&
                        topic &&
                        topic.slug &&
                        topic.slug.toLowerCase().includes(value.toLowerCase())
                    );
                });
                setResults(searchResults);
            });
    };

    const handleReturnKey = (event) => {
        if (event.key === "Enter") {
            setTopic(input);
            setInput("");
            setResults([]);
            navigate(`/${input}`);
        }
    };

    return (
        <div className='input-wrapper'>
            <FaSearch id='search-icon' />
            <input
                type='text'
                placeholder='Search Topic...'
                value={input}
                onChange={handleSearchInput}
                onKeyDown={handleReturnKey}
            />
        </div>
    );
}
