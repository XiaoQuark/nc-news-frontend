import {
	Card,
	CardBody,
	CardFooter,
	Box,
	Text,
	Button,
	Flex,
	Avatar,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { deleteCommentById } from "../../utils/api";

export function CommentCard({ comment }) {
	const [deleteMsg, setDeleteMsg] = useState("");
	const [error, setError] = useState(null);
	const { user } = useContext(UserContext);
	const [isDeletingComment, setIsDeletingComment] = useState(false);
	const username = user?.username || null;

	const handleDelete = () => {
		setIsDeletingComment(true);
		deleteCommentById(comment.comment_id)
			.then(() => {
				setDeleteMsg("The comment was deleted");
			})
			.catch(() => {
				setError("There was an error deleting the comment");
			})
			.finally(() => {
				setIsDeletingComment(false);
			});
	};

	return (
		<Card
			as="li"
			borderWidth="1px"
			borderRadius="lg"
			overflow="hidden"
			m={4}
			p={4}
			bg="purple.50"
			w="100%"
		>
			<CardBody>
				{deleteMsg.length === 0 ? (
					<>
						<Flex
							alignItems="center"
							justifyContent="space-between"
							mb={4}
						>
							<Flex alignItems="center">
								<Avatar
									size="sm"
									name={comment.author}
									src={
										comment.avatar_url ||
										"https://bit.ly/broken-link"
									}
									mr={4}
								/>
								<Text fontSize="md" fontWeight="bold">
									{comment.author}
								</Text>
							</Flex>
							{username === comment.author && (
								<Button
									size="sm"
									colorScheme="red"
									onClick={handleDelete}
									isLoading={isDeletingComment}
								>
									🗑️ Delete
								</Button>
							)}
						</Flex>
						<Text mb={4}>{comment.body}</Text>
						<Text fontSize="xs" color="gray.500" mb={2}>
							{new Date(comment.created_at).toLocaleString()}
						</Text>
					</>
				) : (
					<Text className="delete-msg">{deleteMsg}</Text>
				)}
			</CardBody>
			{error && (
				<CardFooter>
					<Text color="red.500" fontSize="sm">
						{error}
					</Text>
				</CardFooter>
			)}
		</Card>
	);
}
