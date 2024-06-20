import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

export function CommentCard({ comment }) {
    const [deleteMsg, setDeleteMsg] = useState("");
    const [error, setError] = useState(null);
    const { user } = useContext(UserContext);
    const [isDeletingComment, setIsDeletingComment] = useState(false);
    const username = user.username;
    console.log(comment.comment_id);

    const handleDelete = () => {
        setIsDeletingComment(true);
        axios
            .delete(
                `https://xqnews.onrender.com/api/comments/${comment.comment_id}`
            )
            .then((response) => {
                console.log("Delete response:", response);
                setDeleteMsg("The comment was deleted");
            })
            .catch((error) => {
                setError("There was an error deleting the comment");
            })
            .finally(() => {
                setIsDeletingComment(false);
            });
    };
    return (
        <li>
            {deleteMsg.length === 0 ? (
                <>
                    {username === comment.author ? (
                        <button onClick={handleDelete}>🗑️</button>
                    ) : null}
                    {isDeletingComment ? "Deleting comment..." : null}
                    <p>{comment.author}</p>
                    <p>{comment.created_at}</p>
                    <p>{comment.body}</p>
                    <div className='comment-options'>
                        <p>
                            Votes <span>{comment.votes}</span>
                        </p>
                        <button className='vote-btn vote-increase'>+</button>
                        <button className='vote-btn vote-decrease'>-</button>
                    </div>
                </>
            ) : (
                <p className='delete-msg'>{deleteMsg}</p>
            )}
            {error && <p className='error-msg'>{error}</p>}
        </li>
    );
}
