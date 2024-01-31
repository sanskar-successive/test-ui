import { useEffect } from 'react';
import { BookService } from '../Service'
import { useState } from 'react';

const useUpdateBook = () => {

    const [response, setResponse] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const updateBook = async (id, payload) => {
        setLoading(true);
        try {
            const { data } = await BookService.updateBook(id, payload);
            console.log("response", data);
            setResponse(data);

        } catch (error) {
            setError(error.message);
        }
        finally {
            setLoading(false)
        }
    }

    return { loading, error, response, updateBook };

}

export default useUpdateBook;