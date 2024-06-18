import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export function ArticleContent() {
    const { article_id } = useParams();
    const [articleContent, setArticleContent] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`https://xqnews.onrender.com/api/articles/${article_id}`)
            .then((response) => {
                setArticleContent(response.data.article);
                setIsLoading(false);
            });
    }, []);
    if (isLoading) return <p>Page is Loading...</p>;

    return (
        <article>
            <h2 className='title-container'>{articleContent.title}</h2>
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
    );
}
