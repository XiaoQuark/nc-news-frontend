import { useEffect, useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "./UserContext";
import { getTopics } from "../../utils/api";
import {
	Box,
	Flex,
	IconButton,
	Avatar,
	Stack,
	useDisclosure,
	Text,
	useColorModeValue,
	Button,
	Center,
	Collapse,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { GiWhiteBook } from "react-icons/gi";

const NavLink = ({ children, to, onClick }) => (
	<Box
		as={Link}
		to={to}
		px={2}
		py={1}
		rounded="md"
		fontSize="2xl"
		fontWeight="bold"
		textAlign="center"
		_hover={{
			color: "white",
		}}
		onClick={onClick}
	>
		{children}
	</Box>
);

export function Header(setArticleList, setTopic, topic, setCurrentPage) {
	const [topicList, setTopicList] = useState([]);
	const { user, setUser } = useContext(UserContext);
	const location = useLocation();
	const [error, setError] = useState(null);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleLogout = () => {
		setUser(null);
	};

	useEffect(() => {
		getTopics()
			.then(({ topics }) => {
				setTopicList(topics);
				if (topic !== "") {
					setCurrentPage(1);
				}
			})
			.catch(() => {
				setError("There was an error fetching the topics");
			});
	}, [topic, setCurrentPage]);

	return (
		<Box as={"header"} position="fixed" width="100%" zIndex={1000} top={0}>
			<Flex
				bg={"purple.500"}
				color={"white"}
				px={4}
				py={4}
				h={{ base: "100px", md: "130px" }}
				justifyContent={"space-between"}
				alignItems={"center"}
			>
				{user ? (
					<Flex direction="column" align="center">
						<Link to="/user">
							<Avatar
								size="sm"
								src={user.avatar_url}
								alt="User avatar"
							/>
						</Link>
						<Button
							as={Link}
							variant="link"
							onClick={handleLogout}
							color="white"
							_hover={{
								color: "blue.300",
							}}
						>
							Log Out
						</Button>
					</Flex>
				) : (
					<Flex direction="column" align="center">
						<Link to="/user">
							<Avatar size="sm" src={""} alt="User avatar" />
						</Link>
						<Button
							as={Link}
							variant="link"
							to="/login"
							state={{ from: location }}
							color="white"
							_hover={{
								color: "blue.300",
							}}
						>
							Log In
						</Button>
					</Flex>
				)}
				<Link to="/" h="100%">
					<Text
						as="h1"
						fontSize={{ base: "32px", sm: "48px", md: "64px" }}
						fontWeight="bold"
						// position="absolute"
						// top={{ base: "70px", sm: "53px", md: "69px" }}
						// lineHeight="initial" // Ensure the text height is correct
						// left="50%"
						// transform="translateX(-50%)"
						color={"white"}
					>
						XQ NEWS
					</Text>
				</Link>
				<IconButton
					background={"transparent"}
					color={"white"}
					size={"md"}
					icon={
						isOpen ? (
							<CloseIcon boxSize={6} />
						) : (
							<HamburgerIcon boxSize={7} />
						)
					}
					aria-label={isOpen ? "Close menu" : "Open menu"}
					onClick={isOpen ? onClose : onOpen}
				/>
			</Flex>
			<Collapse
				in={isOpen}
				position="fixed"
				zIndex={1000}
				top="150px"
				justify="center"
				animateOpacity
			>
				<Stack
					as="nav"
					spacing={"90px"}
					align="center"
					justify="center"
					bg="purple.500"
					w="100%"
					h="calc(100vh - 100px)"
					// py={"150px"}
					color="white"
				>
					{error && <Text color="red.500">{error}</Text>}
					{topicList.map((topic) => (
						<NavLink
							key={topic.slug}
							to={`/${topic.slug}`}
							onClick={onClose}
						>
							{topic.slug}
						</NavLink>
					))}
				</Stack>
			</Collapse>
		</Box>
	);
}
