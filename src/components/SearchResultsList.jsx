import { SearchResult } from "./SearchResult";
import "./styling/SearchResultsList.css";

export function SearchresultsList({
    results,
    setTopic,
    clearSearch,
    setResults,
    setInput,
}) {
    return (
        <ul className='results-list'>
            {results.map((result) => {
                return (
                    <SearchResult
                        key={result.slug}
                        result={result}
                        setTopic={setTopic}
                        clearSearch={clearSearch}
                        setResults={setResults}
                        setInput={setInput}
                    />
                );
            })}
        </ul>
    );
}
