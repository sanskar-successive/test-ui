
import { Table, Space, Button, Empty, Skeleton } from '../../../../lib/generics'
import { useEffect, useState } from 'react';
import { BookService } from '../../Service';
import { getCsvUploadColumns } from '../../utils/csvUploadColumns';
import { useLocation, useNavigate } from 'react-router-dom'
import TablePagination from '../listPage/components/Pagination'
import Sort from '../listPage/components/Sort';
import { csvUploadsSortOptions } from '../../utils/sortOptions';


function CsvUploads() {

  const [csvUploads, setCsvUploads] = useState([]);
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  let csvUploadColumns = getCsvUploadColumns();

  const location = useLocation();

  csvUploadColumns = [
    ...csvUploadColumns,
    {
      title: 'Action',
      dataIndex: '_id',
      key: 'action',
      render: (_, { session_id }) => (
        <Space size="small">
          <Button onClick={() => navigate(`/bulk-uploads/${session_id}`)}>View</Button>
        </Space>
      ),
    },
  ];

  const fetchCSVUploadsData = async () => {
    try {

      const { data } = await BookService.getCSVUploads(location.search);

      console.log("data", data.bulkUploads);
      setCsvUploads(data.bulkUploads);
      setCount(data.count)
      setLoading(false)
    } catch (error) {
      setErrors(error.message);
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCSVUploadsData();
  }, []);

  if (loading) {
    return <Skeleton />
  }
  
  if (errors) {
    return <Empty description="Something went wrong" />
  }

  if(count===0){
    return <Empty/>
  }
  return (

    <Space direction='vertical'>
      <Sort sortOptions={csvUploadsSortOptions}/>
      <Table dataSource={csvUploads} columns={csvUploadColumns} pagination={false} />
      <TablePagination totalItems={count} />
    </Space>


  );
}

export default CsvUploads;



