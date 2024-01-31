
import { Table, Skeleton, Empty } from '../../../../lib/generics'
import { useEffect } from 'react';
import { useState } from 'react';
import { BookService } from '../../Service';
import {  useParams } from 'react-router-dom'
import { csvErrorColumns } from '../../utils/csvErrorColumns';



function CsvUploadErrors() {

    const [csvUploadErrors, setCsvUploadErrors] = useState([]);
    const [errors, setErrors] = useState("");
    const [loading, setLoading] = useState(true);

    const { session_id } = useParams();



    const fetchCSVUploadErrors = async () => {
        setLoading(true);
        try {

            const { data } = await BookService.getCSVUploadErrors(session_id);

            console.log("data", data.bulkUploadErrorDetail);
            setCsvUploadErrors(data.bulkUploadErrorDetail);
        } catch (error) {
            setErrors(error.message);
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCSVUploadErrors();
    }, []);

    if (loading) {
        return <Skeleton />
    }

    if (errors) {
        return <Empty description="Something went wrong" />
    }
    return (
        <>


            <Table dataSource={csvUploadErrors} columns={csvErrorColumns} />

        </>
    );
}

export default CsvUploadErrors;
