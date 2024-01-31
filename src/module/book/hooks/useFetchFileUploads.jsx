import { useState } from "react";
import { BookService } from "../Service";
import { useEffect } from "react";

const useFetchFileUploads = () => {

    const [book, setBook] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchBookData = async () => {
        setLoading(true);
        try {
            const { data } = await BookService.getCSVUploads();
            setBook(data.bulkUploads);
        } catch (error) {
            setError(error.message);
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBookData();
    }, [])


    return { loading, error, book };

}

export default useFetchFileUploads;