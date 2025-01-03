import { forwardRef } from "react";
import { Link } from "react-router-dom";
import {
	Card,
	CardBody,
	CardFooter,
	Box,
	Text,
	Image,
	Flex,
	Heading,
	Skeleton,
} from "@chakra-ui/react";

export const ArticleCard = forwardRef(({ article, isLoading }, ref) => {
	return (
		<Skeleton isLoaded={!isLoading} borderRadius="lg">
			<Link
				to={`/articles/${article.article_id}`}
				aria-label={`navigate to ${article.title}`}
			>
				<Card
					ref={ref}
					as="li"
					borderWidth="1px"
					borderRadius="lg"
					overflow="hidden"
					m={4}
					height={{ base: "auto", md: "400px", lg: "450px" }} // Responsive height
					bg="purple.50" // Added background color to match CommentCard
				>
					<CardBody
						display="flex"
						flexDirection="column"
						justifyContent="space-between"
					>
						<Flex direction="column" flexGrow={1}>
							<Text fontSize="sm" color="gray.500" mb={2}>
								{article.topic}
							</Text>
							<Heading as="h3" size="md" noOfLines={2} mb={4}>
								{article.title}
							</Heading>
							<Box
								display="flex"
								justifyContent="space-between"
								fontSize="sm"
								color="gray.500"
								mt="auto"
							>
								<Text>{article.author}</Text>
								<Text>
									{new Date(
										article.created_at
									).toLocaleDateString()}
								</Text>
							</Box>
						</Flex>
						<Image
							src={article.article_img_url}
							alt={article.title}
							mb={4}
							mt={4}
							borderRadius="lg"
						/>
					</CardBody>
					<CardFooter display="flex" justifyContent="space-between">
						<Text fontSize="sm">
							comments {article.comment_count}
						</Text>
						<Text fontSize="sm">
							votes <span>{article.votes}</span>
						</Text>
					</CardFooter>
				</Card>
			</Link>
		</Skeleton>
	);
});

ArticleCard.displayName = "ArticleCard";
