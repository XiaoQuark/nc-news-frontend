import { useEffect } from "react";
import axios from "axios";
import { ArticleCard } from "./ArticleCard";

export function Articles({ topic, articleList, setArticleList }) {
    useEffect(() => {
        axios
            .get("https://xqnews.onrender.com/api/articles", {
                params: { topic: topic },
            })
            .then((response) => {
                setArticleList(response.data.articles);
            });
    }, [topic]);
    return (
        <>
            <div className='title-container'>
                <h2>Feed</h2>
            </div>
            <ul>
                {articleList.map((article) => {
                    return (
                        <ArticleCard
                            key={article.article_id}
                            article={article}
                        />
                    );
                })}
            </ul>
        </>
    );
}
