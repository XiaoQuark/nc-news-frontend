import { useEffect, useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import "./styling/Header.css";
// import { SearchBar } from "./SearchBar";
// import { SearchresultsList } from "./SearchResultsList";
// import { Nav } from "./Nav";
import { IoMenu, IoClose } from "react-icons/io5";
import { getTopics } from "../../utils/api";

export function Header({ setArticleList, setTopic, topic }) {
	const [topicList, setTopicList] = useState([]);
	const { user } = useContext(UserContext);
	const location = useLocation();
	const navigate = useNavigate();
	const [error, setError] = useState([]);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		getTopics()
			.then((response) => {
				setTopicList(response.data.topics);
			})
			.catch((error) => {
				setError("There was an error fetching the topics");
			});
	}, []);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<header id="header">
			<button id="hamburger-menu" onClick={toggleMenu}>
				<IoMenu id="menu-icon" />
			</button>
			{isOpen && (
				<nav className="navigation-overlay">
					{/* <button className='close-btn' onClick={toggleMenu}>
                        <IoClose />
                    </button> */}
					<ul className="topics-list">
						{error && <p className="error-msg">{error}</p>}
						{topicList.map((topic) => {
							return (
								<li key={topic.topic_slug}>
									<Link
										to={`/${topic.slug}`}
										onClick={toggleMenu}
									>
										{topic.slug}
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
			)}
			<Link to="/">
				<h1>XQ News</h1>
			</Link>
			<div id="nav-login-wrapper">
				{user ? (
					<Link to="/user">
						<img
							src={user.avatar_url}
							alt="User avatar"
							className="user-avatar"
						/>
					</Link>
				) : (
					<Link to="/login" state={{ from: location }}>
						Log In
					</Link>
				)}
			</div>
		</header>
	);
}
