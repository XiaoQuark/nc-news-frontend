import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { PageTitleWrapper } from "./PageTitleWrapper";
import { CardWrapper } from "./CardWrapper";
import "./styling/UserCard.css";
import ContentWrapper from "./ContentWrapper";
import { getUsers } from "../../utils/api";

export function LoginPage() {
	const [userList, setUserList] = useState([]);
	const { setUser } = useContext(UserContext);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";

	useEffect(() => {
		getUsers()
			.then(({ users }) => {
				setUserList(users);
			})
			.catch((error) => {
				setError("There was an error fetching the users!");
			});
	}, []);

	const handleLogin = (user) => {
		setUser(user);
		navigate(from);
	};

	return (
		<section>
			{error && <p className="error-msg">{error}</p>}
			<PageTitleWrapper>
				<h2>Select your account</h2>
			</PageTitleWrapper>
			<ContentWrapper>
				<ul className="list-wrapper">
					{userList.map((user) => (
						<CardWrapper key={user.username}>
							<UserCard user={user} onLogin={handleLogin} />
						</CardWrapper>
					))}
				</ul>
			</ContentWrapper>
		</section>
	);
}

function UserCard({ user, onLogin }) {
	return (
		<div onClick={() => onLogin(user)}>
			<li className="user-wrapper">
				<img className="avatar" src={user.avatar_url} alt="" />
				<p>{user.username}</p>
			</li>
		</div>
	);
}
