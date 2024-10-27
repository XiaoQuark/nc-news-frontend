import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { PageTitleWrapper } from "./PageTitleWrapper";
import ContentWrapper from "./ContentWrapper";
import { getUsers } from "../../utils/api";
import { Spinner, Text, SimpleGrid, Container } from "@chakra-ui/react";
import { UserCard } from "./UserCard";

export function LoginPage() {
	const [userList, setUserList] = useState([]);
	const { setUser } = useContext(UserContext);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";

	useEffect(() => {
		setIsLoading(true);

		getUsers()
			.then(({ users }) => {
				setUserList(users);
				setError(null);
			})
			.catch((err) => {
				setError("There was an error fetching the users!");
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	const handleLogin = (user) => {
		setUser(user);
		navigate(from);
	};

	return (
		<Container as="section" maxW={"4xl"} py={{ base: 8, md: 10 }}>
			<PageTitleWrapper>
				<Text
					as="h2"
					fontSize="2xl"
					fontWeight="bold"
					textAlign="center"
				>
					Select your account
				</Text>
			</PageTitleWrapper>

			{isLoading && (
				<Container display="flex" justifyContent="center" mt={8}>
					<Spinner size="xl" color="teal.500" />
				</Container>
			)}

			{error && (
				<Text color="red.500" fontSize="lg" textAlign="center" mt={4}>
					{error}
				</Text>
			)}

			{!isLoading && !error && (
				<ContentWrapper>
					<SimpleGrid
						columns={{ base: 1, sm: 2, md: 3 }}
						spacing={8}
						mt={8}
						mx="auto"
						minChildWidth={"200px"}
						justifyItems="center"
					>
						{userList.map((user) => (
							<UserCard
								key={user.username}
								user={user}
								onLogin={handleLogin}
							/>
						))}
					</SimpleGrid>
				</ContentWrapper>
			)}
		</Container>
	);
}
