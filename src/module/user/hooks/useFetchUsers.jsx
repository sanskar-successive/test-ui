import { useState, useEffect } from "react";
import { UserService } from "../Service";
import {useLocation} from 'react-router-dom'

const useFetchUsers = () => {

    const location = useLocation();

    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [count, setCount] = useState(0);

    const fetchAllUsers = async () => {
        try {
            const { data } = await UserService.getAllUsers(location.search);
            setUsers(data.users);
            setCount(data.count);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAllUsers()
    }, [location.search])


    return { loading, error, users, count };

}

export default useFetchUsers;