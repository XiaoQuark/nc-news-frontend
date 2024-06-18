export function CommentCard({ comment }) {
    return (
        <li>
            <p>{comment.author}</p>
            <p>{comment.created_at}</p>
            <button>...</button>
            <p>{comment.body}</p>
            <div className='points-wrapper'>
                <p>{comment.votes}</p>
                <button className='vote-btn vote-increase'>+</button>
                <button className='vote-btn vote-decrease'>-</button>
            </div>
        </li>
    );
}
