import { Link, useLocation } from "react-router-dom";

export function ErrorPage() {
    const location = useLocation();
    const message = location.state?.message;

    return (
        <div className='not-found'>
            <h2>{message}</h2>
            <p>The page you are looking for does not exist.</p>
            <Link to='/'>Go to Homepage</Link>
        </div>
    );
}
