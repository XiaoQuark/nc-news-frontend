import { useContext, useEffect, useState } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { Comments } from "./Comments";
import { UserContext } from "./UserContext";
import {
	Box,
	Flex,
	Text,
	Image,
	Heading,
	Avatar,
	Container,
	Tooltip,
	VStack,
	Button,
} from "@chakra-ui/react";
import {
	getArticleById,
	patchArticleById,
	postCommentByArticleId,
	getUsers,
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
	const [authorAvatarUrl, setAuthorAvatarUrl] = useState("");
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
				return article.author;
			})
			.then((author) => {
				return getUsers().then(({ users }) => {
					const authorData = users.find(
						(user) => user.username === author
					);
					if (authorData) {
						setAuthorAvatarUrl(authorData.avatar_url);
					}
				});
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

	const articleBodyArray = articleContent.body
		? articleContent.body
				.split(". ")
				.filter((sentence) => sentence.trim() !== "")
		: [];

	return (
		<Container as="section" maxW={"4xl"} py={{ base: 8, md: 10 }}>
			<VStack
				spacing={{ base: 6, md: 8 }}
				alignItems="start"
				mt={{ base: "130px", md: "180px" }}
			>
				<Box w="100%">
					<Flex
						as="header"
						border="3px solid white"
						px={{ base: 4, md: 8, lg: 16 }}
						width="100%"
						boxSizing="border-box"
						justifyContent="space-between"
						alignItems="center"
						mb={4}
					>
						<Box>
							<Heading
								as="h2"
								fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
								fontWeight="bold"
							>
								{articleContent.title}
							</Heading>
							<Flex mt={2} alignItems="center">
								<Text fontSize="md" mr={4}>
									{articleContent.topic}
								</Text>
								<Text fontSize="md" color="gray.500">
									{new Date(
										articleContent.created_at
									).toLocaleString()}
								</Text>
							</Flex>
						</Box>
						<Tooltip label={articleContent.author} fontSize="md">
							{authorAvatarUrl.length !== 0 ? (
								<Avatar size="sm" src={authorAvatarUrl} />
							) : (
								<Avatar src="https://bit.ly/broken-link" />
							)}
						</Tooltip>
					</Flex>
				</Box>
				<Box w="100%">
					<Image
						rounded="md"
						alt={articleContent.title}
						src={articleContent.article_img_url}
						fit="cover"
						w="100%"
						h={{ base: "100%", sm: "400px", lg: "500px" }}
						mb={10}
					/>
					<VStack alignItems="start" spacing={4}>
						{articleBodyArray.map((sentence, index) => (
							<Text key={index} fontSize="lg">
								{sentence.trim()}.
							</Text>
						))}
					</VStack>
				</Box>
				<Box w="100%" mt={4}>
					<div className="article-comments-votes">
						<a>Comments {articleContent.comment_count}</a>
						<div className="points-wrapper">
							<p>
								Points
								<span className="points-num">
									{articlePoints}
								</span>
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
				</Box>
				<Box w="100%">
					{user ? (
						<form onSubmit={handleCommentSubmit}>
							<textarea
								name="comment"
								placeholder="Write your comment..."
								required
							></textarea>
							<Button type="submit" disabled={isPostingComment}>
								{isPostingComment
									? "Posting..."
									: "Post Comment"}
							</Button>
							{commentFeedback && <Text>{commentFeedback}</Text>}
						</form>
					) : (
						<Text>
							<Link to="/login" state={{ from: location }}>
								Login to leave your comment!
							</Link>
						</Text>
					)}
				</Box>
				<Box w="100%">
					<Comments
						article_id={article_id}
						commentList={commentList}
						setCommentList={setCommentList}
					/>
				</Box>
			</VStack>
		</Container>
	);
}
