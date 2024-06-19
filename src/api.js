import axios from "axios";

const xqNewsApi = axios.create({
    baseURL: "https://xqnews.onrender.com/api",
});

export const getArticles = (topic) => {
    return xqNewsApi.get("/articles").then((response) => {
        return response.data;
    });
};
