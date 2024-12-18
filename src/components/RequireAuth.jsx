import {useNavigate} from "react-router-dom";
import {UrlState} from "@/context.jsx";
import {useEffect} from "react";
import {BarLoader} from "react-spinners";

// eslint-disable-next-line react/prop-types
function RequireAuth({children}) {
    const navigate = useNavigate();
    const {loading, isAuthenticated} = UrlState();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/auth");
        }
    }, [isAuthenticated, navigate]);

    if (loading) return <BarLoader width={"100%"} color="#36d7b7" />;
    if (isAuthenticated) return children;
}

export default RequireAuth;