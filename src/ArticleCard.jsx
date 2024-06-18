import { Link } from "react-router-dom";

export function ArticleCard({ article }) {
    return (
        <Link
            to={`/articles/${article.article_id}`}
            aria-label={`navigate to ${article.title}`}
        >
            <li className='article-card'>
                <div className='card-title-topic'>
                    <p className='card-topic'>{article.topic}</p>
                    <h3 className='card-title'>{article.title}</h3>
                    <div className='card-meta-data'>
                        <p className='card-username'>{article.author}</p>
                        <p className='card-date'>{article.created_at}</p>
                    </div>
                </div>

                <img
                    className='card-img'
                    src={article.article_img_url}
                    alt=''
                />
                <div className='card-comments-votes'>
                    <p className='card-comment-count'>
                        comments {article.comment_count}
                    </p>
                    <p className='card-votes'>votes {article.votes}</p>
                </div>
            </li>
        </Link>
    );
}
