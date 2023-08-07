import { Redirect } from "react-router-dom";
const Protected = ({ isLoggedIn, children }) => {
    if (!isLoggedIn) {
        return <Redirect to="/login" replace />;
    }
    return children;
};
export default Protected;