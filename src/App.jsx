import { useState } from "react";
import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import { Header } from "./Header";
import { Articles } from "./Articles";
import { ArticleContent } from "./ArticleContent";
import { UserProvider } from "./UserContext";
import { LoginPage } from "./LoginPage";
import { UserPage } from "./UserPage";

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
                        path='/articles/:article_id'
                        element={<ArticleContent />}
                    />

                    <Route path='/login' element={<LoginPage />} />

                    <Route path='/user' element={<UserPage />} />

                    {/* <Route path='/post-article' element='' /> */}
                </Routes>
            </main>

            {/* <Footer setTopic={setTopic} topic={topic} /> */}
        </UserProvider>
    );
}

export default App;
