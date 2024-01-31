import { useState } from "react";
import { UserService } from "../Service";
import { useEffect } from "react";

const useFetchUserDetails = (id) => {

    const [user, setUser] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchUserData = async () => {
        setLoading(true);
        try {
            const { data } = await UserService.getUserDetails(id);
            setUser(data.user);
        } catch (error) {
            setError(error.message);
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUserData();
    }, [id])


    return { loading, error, user };

}

export default useFetchUserDetails;