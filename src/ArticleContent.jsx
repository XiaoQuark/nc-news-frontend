import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Comments } from "./Comments";
import "./App.css";

export function ArticleContent() {
    const { article_id } = useParams();
    const [articleContent, setArticleContent] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [commentList, setCommentList] = useState([]);

    useEffect(() => {
        axios
            .get(`https://xqnews.onrender.com/api/articles/${article_id}`)
            .then((response) => {
                setArticleContent(response.data.article);
                setIsLoading(false);
            });
    }, []);
    if (isLoading) return <p className='loading-msg'>Page is Loading...</p>;

    return (
        <>
            <article className='content-wrapper'>
                <div className='title-wrapper'>
                    <h2>{articleContent.title}</h2>
                </div>
                <div className='article-meta-data'>
                    <p>{articleContent.topic}</p>
                    <p>{articleContent.author}</p>
                    <p>{articleContent.created_at}</p>
                </div>
                <p className='article-body'>{articleContent.body}</p>
                <img
                    className='article-img'
                    src={articleContent.article_img_url}
                    alt=''
                />
                <div className='article-comments-votes'>
                    <a>Comments {articleContent.comment_count}</a>

                    <div className='points-wrapper'>
                        <p>Points {articleContent.votes}</p>
                        <button className='vote-btn vote-increase'>+</button>
                        <button className='vote-btn vote-decrease'>-</button>
                    </div>
                </div>
            </article>
            <Comments
                article_id={article_id}
                commentList={commentList}
                setCommentList={setCommentList}
            />
        </>
    );
}
