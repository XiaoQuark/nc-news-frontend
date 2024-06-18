import { useEffect, useState } from "react";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import axios from "axios";
import { Header } from "./Header";

function App() {
    const [articleList, setArticleList] = useState([]);
    const [article, setArticle] = useState({});
    const [topicList, setTopicList] = useState([]);
    const [topic, setTopic] = useState({});

    return (
        <>
            <Header
                setArticleList={setArticleList}
                setTopic={setTopic}
                topic={topic}
            />
            <section>
                <Routes>
                    <Route
                        path='/'
                        element={
                            <Articles
                                articleList={articleList}
                                setArticleList={setArticleList}
                                topic={topic}
                            />
                        }
                    />
                    {/* <Route path='/article_id' element='' />
                  <Route path='/user' element='' />
                  <Route path='/post-article' element='' /> */}
                </Routes>
            </section>
            {/* <User />
            <Footer setTopic={setTopic} topic={topic} /> */}
        </>
    );
}

export default App;

function Articles({ topic, articleList, setArticleList }) {
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

function ArticleCard({ article }) {
    return (
        <Link
            to={`/articles/${article.article_id}`}
            aria-label={`navigate to ${article.title}`}
        >
            <li className='article-card'>
                <p className='article-card-topic'>{article.topic}</p>
                <h3 className='article-card-title'>{article.title}</h3>
                <div className='card-user-date'>
                    <p className='article-card-username'>{article.author}</p>
                    <p className='article-card-date'>{article.created_at}</p>
                </div>
                <img
                    className='article-card-img'
                    src={article.article_img_url}
                    alt=''
                />
                <div className='card-comments-votes'>
                    <p className='article-card-comment-count'>
                        comments {article.comment_count}
                    </p>
                    <p className='article-card-votes'>votes {article.votes}</p>
                </div>
            </li>
        </Link>
    );
}
