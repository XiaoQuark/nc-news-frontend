import { useEffect, useState } from "react";
import { CommentCard } from "./CommentCard";
import { getCommentsByArticleId } from "../../utils/api";
import { VStack, Text, Spinner } from "@chakra-ui/react";

export function Comments({ article_id, commentList, setCommentList }) {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		setIsLoading(true);
		getCommentsByArticleId(article_id)
			.then(({ comments }) => {
				setCommentList(comments);
				setIsLoading(false);
			})
			.catch(() => {
				setError("There was an error fetching the comments.");
				setIsLoading(false);
			});
	}, [article_id, setCommentList]);

	if (isLoading) {
		return (
			<Text className="loading-msg" fontSize="md">
				Comments are Loading...
			</Text>
		);
	}

	if (error) {
		return (
			<Text className="error-msg" color="red.500">
				{error}
			</Text>
		);
	}

	if (commentList.length === 0) {
		return (
			<Text className="no-comments-msg" fontSize="md">
				No comments yet. Be the first to comment on this article!
			</Text>
		);
	}

	return (
		<VStack as="section" w="100%" align="stretch" spacing={4} mt={6}>
			<Text as="h3" fontSize="xl" fontWeight="bold">
				Comments
			</Text>
			<VStack as="ul" align="stretch" spacing={4}>
				{commentList.map((comment) => (
					<CommentCard key={comment.comment_id} comment={comment} />
				))}
			</VStack>
		</VStack>
	);
}
