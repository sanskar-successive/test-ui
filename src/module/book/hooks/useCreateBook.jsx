import { BookService } from '../Service'
import { useState } from 'react';

const useCreateBook = () => {

    const [response, setResponse] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const createBook = async (payload) => {
        setLoading(true);
        try {
            const { data } = await BookService.createBook(payload);
            console.log("response", data);
            setResponse(data);

        } catch (error) {
            setError(error.message);
        }
        finally {
            setLoading(false)
        }
    }

    return { loading, error, response, createBook };

}

export default useCreateBook;