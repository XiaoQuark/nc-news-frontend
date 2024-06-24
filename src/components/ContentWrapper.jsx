import "./styling/ContentWrapper.css";

export function ContentWrapper({ children }) {
    return <div className='content-wrapper'>{children}</div>;
}

export default ContentWrapper;
