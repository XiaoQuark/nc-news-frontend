import { useContext } from "react";
import { UserContext } from "./UserContext";
import { Link, useNavigate } from "react-router-dom";
import "./styling/UserPage.css";
import { PageTitleWrapper } from "./PageTitleWrapper";
import ContentWrapper from "./ContentWrapper";

export function UserPage() {
	const { user, setUser } = useContext(UserContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		setUser(null);
		navigate("/"); // Redirect to homepage after logging out
	};

	// If user is null, redirect to login page or show appropriate message
	if (!user) {
		navigate("/login");
		return null; // Prevent further rendering
	}

	return (
		<section>
			<PageTitleWrapper>
				<h2>{user.username}</h2>
			</PageTitleWrapper>

			<ContentWrapper className="content-wrapper">
				<img
					className="user-page-avatar"
					src={user.avatar_url || "https://bit.ly/broken-link"} // Handle missing avatar URL
					alt="User avatar"
				/>
				<div className="user-data">
					<p>Username: {user.username}</p>
					<p>Name: {user.name}</p>
				</div>
				<Link to="/" onClick={handleLogout} id="logout">
					Log Out
				</Link>
			</ContentWrapper>
		</section>
	);
}
