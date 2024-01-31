import { Table, Space, Button, Popconfirm, message, Empty, Skeleton, EditOutlined, DeleteOutlined, EyeOutlined } from '../../../../lib/generics'
import { BookService } from '../../Service';
import useFetchBook from '../../hooks/useFetchBook';
import { useNavigate } from 'react-router-dom'
import { lazy } from 'react';
import { getListPageColumns } from '../../utils/listPageColumns';
import { sortOptions } from '../../utils/sortOptions';

import Filters from './components/Filters';

import SearchBar from './components/Search';

// const SearchBar = lazy(() => import('./components/Search'));

import TablePagination from './components/Pagination';
// const TablePagination = lazy(() => import('./components/Pagination'));

import Sort from './components/Sort';
// const Sort = lazy(() => import('./components/Sort'));

// const Filters = lazy(() => import('./components/Filters'));




const List = () => {

    const navigate = useNavigate()
    let listPageColumns = getListPageColumns();

    const { loading, error, book, count } = useFetchBook();

    if (loading) {
        return <Skeleton />
    }

    if (error) {
        return <Empty description="Something went wrong" />
    }

    if (count === 0) {
        return <Empty />
    }

    listPageColumns = [...listPageColumns,
    {
        title: 'Action',
        dataIndex: '_id',
        key: 'action',
        render: (_, { _id }) => (
            <Space size="small" >
                {/* <Button onClick={() => navigate(`/book/${_id}`)} ><EyeOutlined /></Button> */}
                <Button onClick={() => navigate(`/book/${_id}`)} >View</Button>

                {/* <Button onClick={() => navigate(`/add-book/${_id}`)} ><EditOutlined /></Button> */}
                <Button onClick={() => navigate(`/add-book/${_id}`)} >Edit</Button>

                <Popconfirm
                    title="Delete the Book"
                    description="Are you sure to delete this Item?"
                    onConfirm={async () => {

                        try {
                            console.log("deleted");
                            await BookService.deleteBook(_id);
                            await message.success('Deleted successfully');
                            window.location.reload();
                        } catch (error) {
                            message.error(error.message);
                        }
                    }}
                    onCancel={() => {
                        console.log("cancelled");
                        message.error('Operation cancelled');
                    }}
                    okText="Yes"
                    cancelText="Cancel"
                >
                    {/* <Button danger><DeleteOutlined /></Button> */}
                    <Button danger>delete</Button>

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
                {/* <Space direction='vertical'> */}
                <Table dataSource={book} columns={listPageColumns} pagination={false} />
                {/* <TablePagination totalItems={count} /> */}
                {/* </Space> */}
            </Space>
            <TablePagination totalItems={count} />

        </Space>
    )
}

export default List