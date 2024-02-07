import { Table, Space, Button, Popconfirm, message, Empty, Skeleton, EditOutlined, DeleteOutlined, EyeOutlined } from '../../../../lib/generics'
import { BookService } from '../../Service';
import useFetchBook from '../../hooks/useFetchBook';
import { useNavigate } from 'react-router-dom'
import { getListPageColumns } from '../../utils/listPageColumns';
import { sortOptions } from '../../utils/sortOptions';
import Filters from './components/Filters';
import SearchBar from './components/Search';
import TablePagination from './components/Pagination';
import Sort from './components/Sort';

const List = () => {

    const navigate = useNavigate()
    let listPageColumns = getListPageColumns();

    const { loading, error, book, count } = useFetchBook();

    if (loading) {
        return <Skeleton />
    }

    if (error) {
        return <Empty description="Sorry no result found" />
    }

    if (count === 0) {
        return <Empty />
    }

    listPageColumns = [...listPageColumns,
    {
        title: 'Action',
        dataIndex: '_id',
        key: '_id',
        render: (_, { _id }) => (
            <Space size="small" >
                <Button onClick={() => navigate(`/book/${_id}`)} ><EyeOutlined /></Button>
                <Button onClick={() => navigate(`/add-book/${_id}`)} ><EditOutlined /></Button>

                <Popconfirm
                    title="Delete the Book"
                    description="Are you sure to delete this Item?"
                    onConfirm={async () => {

                        try {
                            await BookService.deleteBook(_id);
                            message.success('Deleted successfully');
                            window.location.reload();

                        } catch (error) {
                            message.error(error.message);
                        }
                    }}
                    onCancel={() => {
                        message.error('Operation cancelled');
                    }}
                    okText="Yes"
                    cancelText="Cancel"
                >
                    <Button danger><DeleteOutlined /></Button>

                </Popconfirm>
            </Space>
        ),
    },
    ]

    return (

        <Space direction='vertical'>

            <SearchBar />
            <Sort sortOptions={sortOptions} />

            <Space direction='horizontal'>
                <Filters />
                <Table dataSource={book} columns={listPageColumns} pagination={false} />
            </Space>
            <TablePagination totalItems={count} />

        </Space>

    )
}

export default List