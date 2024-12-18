import {createContext, useContext, useEffect} from "react";
import useFetch from "@/hooks/useFetch.js";
import {getCurrentUser} from "@/db/apiAuth.js";

const UrlContext = createContext();

const UrlProvider = ({children}) => {
    const {data: user, loading, fn: fetchUser} = useFetch(getCurrentUser);

    const isAuthenticated = user?.role === "authenticated";

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UrlContext.Provider value={{user, fetchUser, loading, isAuthenticated}}>
            {children}
        </UrlContext.Provider>
    );
};

export const UrlState = () => {
    return useContext(UrlContext);
};

export default UrlProvider;