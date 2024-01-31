import { useState } from "react";
import { UserService } from "../Service";
import { useEffect } from "react";

const useFetchUserAccount = () => {

    
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchUserAccount = async () => {
        try {
            const { data } = await UserService.getUserAccount();
            setProfile(data.user);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUserAccount();
    }, [])


    return { loading, error, profile };

}

export default useFetchUserAccount;