import axios from "axios";

const ncNewsApi = axios.create({
	baseURL: "https://xqnews.onrender.com/api",
});

export const getArticles = (topic, sortBy, order, page, limit) => {
	return ncNewsApi
		.get("/articles", {
			params: {
				topic: topic,
				sort_by: sortBy,
				order: order,
				p: page,
				limit: limit,
			},
		})
		.then((response) => {
			return response.data;
		});
};

export const getArticleById = (article_id) => {
	return ncNewsApi.get(`/articles/${article_id}`).then((response) => {
		return response.data;
	});
};

export const patchArticleById = (article_id, inc_votes) => {
	return ncNewsApi
		.patch(`/articles/${article_id}`, { inc_votes })
		.then((response) => {
			return response.data;
		});
};

export const getCommentsByArticleId = (article_id) => {
	return ncNewsApi
		.get(`/articles/${article_id}/comments`)
		.then((response) => {
			return response.data;
		});
};

export const postCommentByArticleId = (article_id, username, body) => {
	return ncNewsApi
		.post(`articles/${article_id}/comments`, { username, body })
		.then((response) => {
			return response.data;
		});
};

export const deleteCommentById = (comment_id) => {
	return ncNewsApi.delete(`/comments/${comment_id}`).then((response) => {
		return response.data;
	});
};

export const getTopics = () => {
	return ncNewsApi.get("/topics").then((response) => {
		return response.data;
	});
};

export const getUsers = () => {
	return ncNewsApi.get("/users").then((response) => {
		return response.data;
	});
};
