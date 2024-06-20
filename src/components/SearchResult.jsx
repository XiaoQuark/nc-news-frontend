import "./styling/SearchResult.css";
import { useNavigate } from "react-router-dom";

export function SearchResult({
    result,
    setTopic,
    clearSearch,
    setResults,
    setInput,
}) {
    const navigate = useNavigate();

    const handleTopicSelection = () => {
        setTopic(result.slug);
        clearSearch();
        setInput("");
        setResults([]);
        navigate(`/${result.slug}`);
    };

    return (
        <li className='search-result' onClick={handleTopicSelection}>
            {result.slug}
        </li>
    );
}
