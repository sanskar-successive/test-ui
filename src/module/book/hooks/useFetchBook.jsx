import { useState } from "react";
import { BookService } from "../Service";
import { useEffect } from "react";
import {useLocation} from 'react-router-dom'

const useFetchBook = () => {

    const location = useLocation();
    
    const [book, setBook] = useState([]);
    const [count, setCount] = useState(0);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchBookData = async () => {
        setLoading(true);
        try {
            const { data } = await BookService.getBooksForHomePage(location.search);
            console.log("fetched by id", data);
            setBook(data.books);
            setCount(data.count);
        } catch (error) {
            setError(error.message);
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBookData();
    }, [location.search])


    return { loading, error, book, count };

}

export default useFetchBook;