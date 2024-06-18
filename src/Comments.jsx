import { useEffect, useState } from "react";
import axios from "axios";
import { CommentCard } from "./CommentCard";

export function Comments({ article_id, commentList, setCommentList }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
            .get(
                `https://xqnews.onrender.com/api/articles/${article_id}/comments`
            )
            .then((response) => {
                console.log(response.data.comments[0]);
                setCommentList(response.data.comments);
            });
    }, []);
    return (
        <section className='content-wrapper'>
            <h3>Comments</h3>
            <ul>
                {commentList.map((comment) => {
                    return (
                        <CommentCard
                            comment={comment}
                            key={comment.comment_id}
                        />
                    );
                })}
            </ul>
        </section>
    );
}
