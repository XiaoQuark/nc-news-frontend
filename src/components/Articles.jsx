import { useEffect, useState } from "react";
import axios from "axios";
import { ArticleCard } from "./ArticleCard";
import "../App.css";
import { useSearchParams } from "react-router-dom";
import { CardWrapper } from "./CardWrapper";
import { FaSort } from "react-icons/fa";
import { CgOptions } from "react-icons/cg";
import { FilterList } from "./FilterList";

export function Articles({ topic, articleList, setArticleList }) {
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get("sort_by") || "created_at";
    const order = searchParams.get("order") || "desc";

    useEffect(() => {
        axios
            .get("https://xqnews.onrender.com/api/articles", {
                params: { topic: topic, sort_by: sortBy, order: order },
            })
            .then((response) => {
                setArticleList(response.data.articles);
                setIsLoading(false);
            });
    }, [topic, sortBy, order]);

    const handleOrderToggle = () => {
        const newOrder = order === "asc" ? "desc" : "asc";
        setSearchParams({ sort_by: sortBy, order: newOrder });
    };

    if (isLoading) return <p className='loading-msg'>Page is Loading...</p>;
    return (
        <section className='content-wrapper'>
            <div className='heading-wrapper'>
                <h2>Feed</h2>
                <div className='tools'>
                    <FilterList
                        setSearchParams={setSearchParams}
                        sortBy={sortBy}
                        order={order}
                    />
                    <CgOptions
                        onClick={() =>
                            document
                                .getElementById("filter-list")
                                .classList.toggle("hidden")
                        }
                    />
                    <FaSort onClick={handleOrderToggle} />
                </div>
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
