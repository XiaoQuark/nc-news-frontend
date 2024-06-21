export function FilterList({ setSearchParams, sortBy, order }) {
    const handleSortChange = (e) => {
        setSearchParams({ sort_by: e.target.value, order: order });
    };
    return (
        <div id='filter-list' className='hidden'>
            <button
                className='sort-option'
                onClick={() =>
                    handleSortChange({ target: { value: "created_at" } })
                }
            >
                Date
            </button>
            <button
                className='sort-option'
                onClick={() =>
                    handleSortChange({ target: { value: "comment_count" } })
                }
            >
                Comments
            </button>
            <button
                className='sort-option'
                onClick={() => handleSortChange({ target: { value: "votes" } })}
            >
                Votes
            </button>
        </div>
    );
}
