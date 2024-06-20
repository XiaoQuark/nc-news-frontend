import { useEffect, useState } from "react";
import axios from "axios";
import { CommentCard } from "./CommentCard";
import { CardWrapper } from "./CardWrapper";

export function Comments({ article_id, commentList, setCommentList }) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(
                `https://xqnews.onrender.com/api/articles/${article_id}/comments`
            )
            .then((response) => {
                setCommentList(response.data.comments);
                setIsLoading(false);
            })
            .catch((error) => {
                setError("There was an error fetching the comments.");
                setIsLoading(false);
            });
    }, [article_id]);

    if (isLoading)
        return <p className='loading-msg'>Comments are Loading...</p>;
    if (error) return <p className='error-msg'>{error}</p>;
    if (commentList.length === 0)
        return (
            <p className='no-comments-msg'>
                No comments yet. Be the first to comment on this article!
            </p>
        );

    return (
        <section className='content-wrapper'>
            <h3>Comments</h3>
            <ul>
                {commentList.map((comment) => {
                    return (
                        <CardWrapper key={comment.comment_id}>
                            <CommentCard comment={comment} />
                        </CardWrapper>
                    );
                })}
            </ul>
        </section>
    );
}
