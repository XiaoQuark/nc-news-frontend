import { useState } from "react";
import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import { Header } from "./components/Header";
import { Articles } from "./components/Articles";
import { ArticleContent } from "./components/ArticleContent";
import { UserProvider } from "./components/UserContext";
import { LoginPage } from "./components/LoginPage";
import { UserPage } from "./components/UserPage";
import { ErrorPage } from "./components/ErrorPage";

function App() {
    const [articleList, setArticleList] = useState([]);
    const [topic, setTopic] = useState({});

    return (
        <UserProvider>
            <Header
                setArticleList={setArticleList}
                setTopic={setTopic}
                topic={topic}
            />

            <main className='main-wrapper'>
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
                    <Route
                        path='/:topic'
                        element={
                            <Articles
                                articleList={articleList}
                                setArticleList={setArticleList}
                                topic={topic}
                            />
                        }
                    />
                    <Route
                        path='/articles/:article_id'
                        element={<ArticleContent />}
                    />
                    <Route path='/login' element={<LoginPage />} />

                    <Route path='/user' element={<UserPage />} />
                    <Route path='*' element={<ErrorPage />} />
                    <Route path='/not-found' element={<ErrorPage />} />
                    {/* <Route path='/post-article' element='' /> */}
                </Routes>
            </main>
            {/* <Footer setTopic={setTopic} topic={topic} /> */}
        </UserProvider>
    );
}

export default App;
