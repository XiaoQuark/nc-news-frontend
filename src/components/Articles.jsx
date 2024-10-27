import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import { FaSort } from "react-icons/fa";
import { CgOptions } from "react-icons/cg";
import { FilterList } from "./FilterList";
import { ArticleCard } from "./ArticleCard";
import { getArticles } from "../../utils/api";
import {
	Box,
	SimpleGrid,
	Spinner,
	Text,
	Flex,
	Skeleton,
	SkeletonText,
	Container,
} from "@chakra-ui/react";

export function Articles({
	articleList,
	setArticleList,
	currentPage,
	setCurrentPage,
}) {
	const observer = useRef();

	const { topic } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	// const [currentPage, setCurrentPage] = useState(1);
	const [hasMore, setHasMore] = useState(false);
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const sortBy = searchParams.get("sort_by") || "created_at";
	const order = searchParams.get("order") || "desc";

	useEffect(() => {
		setArticleList([]);
		setCurrentPage(1);
		setIsLoading(true);
		window.scrollTo(0, 0); // Scroll to the top of the page
	}, [topic, setArticleList, setCurrentPage]);

	useEffect(() => {
		setIsLoading(true);
		getArticles(topic, sortBy, order, currentPage)
			.then(({ articles }) => {
				setArticleList((prevArticles) => [
					...prevArticles,
					...articles,
				]);
				setHasMore(articles.length > 0);
				setIsLoading(false);
			})
			.catch((error) => {
				if (error.response && error.response.status === 404) {
					navigate("/not-found", {
						state: { message: error.response.data.msg },
					});
				} else {
					setError("There was an error fetching the articles.");
				}
				setIsLoading(false);
			});
	}, [topic, sortBy, order, currentPage, navigate]);

	const lastArticleRef = (node) => {
		if (isLoading) return;
		if (observer.current) observer.current.disconnect();

		observer.current = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting && hasMore) {
				setCurrentPage((prevPage) => prevPage + 1);
			}
		});

		if (node) {
			observer.current.observe(node);
		}
	};

	const handleOrderToggle = () => {
		const newOrder = order === "asc" ? "desc" : "asc";
		setSearchParams({ sort_by: sortBy, order: newOrder });
	};

	// if (isLoading) return <Spinner size="xl" color="teal.500" />;
	if (error) return <Text color="red.500">{error}</Text>;

	return (
		<Container as="main" maxWidth="container.xl">
			<Flex
				as="header"
				border="3px solid white"
				px={{ base: 4, md: 8, lg: 16 }}
				width="100%"
				boxSizing="border-box"
				justifyContent="space-between"
				alignItems="center"
				mt={{ base: "130px", md: "180px" }}
			>
				<Text as="h2" fontSize="2xl" fontWeight="bold">
					Feed
				</Text>
				<Box className="tools" display="flex" alignItems="center">
					<FilterList
						setSearchParams={setSearchParams}
						sortBy={sortBy}
						order={order}
					/>
					<CgOptions
						onClick={() =>
							document
								.getElementById("filter-list")
								.classList.toggle("hidden")
						}
					/>
					<FaSort onClick={handleOrderToggle} />
				</Box>
			</Flex>
			<Box mx="auto" px={{ base: 4, md: 8, lg: 16 }}>
				<SimpleGrid
					// columns={{ base: 1, sm: 1, md: 2, lg: 2 }}
					column={3}
					spacing={8}
					minChildWidth={"300px"}
				>
					{articleList.map((article, index) => {
						if (articleList.length === index + 1) {
							return (
								<ArticleCard
									ref={lastArticleRef}
									key={article.article_id}
									article={article}
									isLoading={isLoading}
								/>
							);
						} else {
							return (
								<ArticleCard
									key={article.article_id}
									article={article}
									isLoading={isLoading}
								/>
							);
						}
					})}
				</SimpleGrid>
				{isLoading && <Spinner size="xl" color="teal.500" />}
			</Box>
		</Container>
	);
}
