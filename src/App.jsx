import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Header } from "./Header";
import { Articles } from "./Articles";
import { ArticleContent } from "./ArticleContent";

function App() {
    const [articleList, setArticleList] = useState([]);
    const [topic, setTopic] = useState({});

    return (
        <>
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
                    {/* <Route path='/user' element={<User />}/>
                    <Route path='/post-article' element='' /> */}
                </Routes>
            </main>
            {/* <Footer setTopic={setTopic} topic={topic} /> */}
        </>
    );
}

export default App;
