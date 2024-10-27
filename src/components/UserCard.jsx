import { Box, Card, CardBody, Text, Avatar, Flex } from "@chakra-ui/react";

export function UserCard({ user, onLogin }) {
	return (
		<Card
			as="li"
			borderWidth="1px"
			borderRadius="lg"
			overflow="hidden"
			m={4}
			cursor="pointer"
			height={{ base: "100px", md: "250px", lg: "300px" }} // Set consistent height
			width={{ base: "100px", md: "250px", lg: "300px" }} // Match the width to height to create a square
			backgroundColor="purple.50" // Background color
			_hover={{ boxShadow: "lg" }} // Hover effect
			onClick={() => onLogin(user)}
		>
			<CardBody
				display="flex"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
				p={6}
			>
				<Avatar
					size="xl"
					src={user.avatar_url || "https://bit.ly/broken-link"}
					alt={`${user.username}'s avatar`}
					mb={4}
				/>
				<Flex direction="column" align="center">
					<Text fontSize="lg" fontWeight="bold">
						{user.username}
					</Text>
					<Text fontSize="md" color="gray.500">
						{user.name}
					</Text>
				</Flex>
			</CardBody>
		</Card>
	);
}
