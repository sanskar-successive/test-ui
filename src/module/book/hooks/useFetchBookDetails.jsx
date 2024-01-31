import { useState } from "react";
import { BookService } from "../Service";
import { useEffect } from "react";

const useFetchBookDetails = (id) => {

    const [book, setBook] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchBookData = async () => {
        setLoading(true);
        try {
            const { data } = await BookService.getBookDetails(id);
            setBook(data.book);
        } catch (error) {
            setError(error.message);
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBookData();
    }, [id])


    return { loading, error, book };

}

export default useFetchBookDetails;