import { useContext, useEffect, useState } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { Comments } from "./Comments";
import { UserContext } from "./UserContext";
import "../App.css";
import {
	getArticleById,
	patchArticleById,
	postCommentByArticleId,
} from "../../utils/api";

export function ArticleContent() {
	const { article_id } = useParams();
	const [articleContent, setArticleContent] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [commentList, setCommentList] = useState([]);
	const [articlePoints, setArticlePoints] = useState(null);
	const [error, setError] = useState(null);
	const [commentFeedback, setCommentFeedback] = useState("");
	const [isPostingComment, setIsPostingComment] = useState(false);
	const { user } = useContext(UserContext);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		setIsLoading(true);
		getArticleById(article_id)
			.then(({ article }) => {
				setArticleContent(article);
				setArticlePoints(article.votes);
				setIsLoading(false);
			})
			.catch((error) => {
				if (error.response && error.response.status === 404) {
					navigate("/not-found", {
						state: { message: error.response.data.msg },
					});
				} else {
					setError(
						"There was an error fetching the article content!"
					);
				}
				setIsLoading(false);
			});
	}, [article_id, navigate]);

	const handleVote = (inc_votes) => {
		patchArticleById(article_id, inc_votes)
			.then((data) => {
				setArticlePoints(data.article.votes);
			})
			.catch((error) => {
				setError(
					`There was an error ${
						inc_votes > 0 ? "increasing" : "decreasing"
					} the vote!`
				);
			});
	};

	const handleCommentSubmit = (event) => {
		event.preventDefault();
		const commentBody = event.target.elements.comment.value;

		setIsPostingComment(true);

		axios;
		postCommentByArticleId(article_id, user.username, commentBody)
			.then(({ comment }) => {
				setCommentList([comment, ...commentList]);
				event.target.reset();
				setCommentFeedback("Your comment has been posted!");
				setIsPostingComment(false);
				setError(null);
			})
			.catch((error) => {
				setError("There was an error posting the comment.");
				setCommentFeedback("");
				setIsPostingComment(false);
			});
	};

	if (isLoading) return <p className="loading-msg">Page is Loading...</p>;
	if (error) return <p className="error-msg">{error}</p>;

	return (
		<>
			{/* {error && <p className='error-msg'>{error}</p>} */}
			<article className="content-wrapper">
				<div className="heading-wrapper">
					<h2>{articleContent.title}</h2>
				</div>
				<div className="article-meta-data">
					<p>{articleContent.topic}</p>
					<p>{articleContent.author}</p>
					<p>{articleContent.created_at}</p>
				</div>
				<p className="article-body">{articleContent.body}</p>
				<img
					className="article-img"
					src={articleContent.article_img_url}
					alt=""
				/>
				<div className="article-comments-votes">
					<a>Comments {articleContent.comment_count}</a>
					<div className="points-wrapper">
						<p>
							Points
							<span className="points-num">{articlePoints}</span>
						</p>
						<button
							onClick={() => handleVote(1)}
							className="vote-btn vote-increase"
						>
							+
						</button>
						<button
							onClick={() => handleVote(-1)}
							className="vote-btn vote-decrease"
						>
							-
						</button>
					</div>
				</div>
			</article>
			{user ? (
				<form onSubmit={handleCommentSubmit}>
					<textarea
						name="comment"
						placeholder="Write your comment..."
						id=""
						required
					></textarea>
					<button type="submit" disabled={isPostingComment}>
						{isPostingComment ? "Posting..." : "Post Comment"}
					</button>
					{commentFeedback && (
						<p className="feedback-msg">{commentFeedback}</p>
					)}
				</form>
			) : (
				<p>
					<Link to="/login" state={{ from: location }}>
						Login to leave your comment!
					</Link>
				</p>
			)}
			<Comments
				article_id={article_id}
				commentList={commentList}
				setCommentList={setCommentList}
			/>
		</>
	);
}
