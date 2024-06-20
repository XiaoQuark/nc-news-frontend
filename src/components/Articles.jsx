import { useEffect, useState } from "react";
import axios from "axios";
import { ArticleCard } from "./ArticleCard";
import "../App.css";
import { useParams } from "react-router-dom";
import { CardWrapper } from "./CardWrapper";

export function Articles({ topic, articleList, setArticleList }) {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        axios
            .get("https://xqnews.onrender.com/api/articles", {
                params: { topic: topic },
            })
            .then((response) => {
                setArticleList(response.data.articles);
                setIsLoading(false);
            });
    }, [topic]);

    if (isLoading) return <p className='loading-msg'>Page is Loading...</p>;
    return (
        <section className='content-wrapper'>
            <div className='title-wrapper'>
                <h2>Feed</h2>
            </div>
            <ul>
                {articleList.map((article) => {
                    return (
                        <CardWrapper key={article.article_id}>
                            <ArticleCard article={article} />
                        </CardWrapper>
                    );
                })}
            </ul>
        </section>
    );
}
