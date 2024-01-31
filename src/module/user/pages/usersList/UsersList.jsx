import { Table, Space, Button, Skeleton, Empty } from '../../../../lib/generics'
import { useNavigate } from 'react-router-dom'
import useFetchUsers from '../../hooks/useFetchUsers';
import { getUserListColumns } from '../../utils/userListCoulmns';
import TablePagination from '../../../book/pages/listPage/components/Pagination'
import SearchBar from '../../../book/pages/listPage/components/Search';
import Sort from '../../../book/pages/listPage/components/Sort';
import { userSortOptions } from '../../utils/userSortOptions';


const UsersList = () => {

    const navigate = useNavigate()
    const { loading, error, users, count } = useFetchUsers();
    let userListColumns = getUserListColumns();

    if (loading) {
        return <Skeleton />
    }

    if (error) {
        return <Empty description="Something went wrong" />
    }

    if(count===0){
        return <Empty/>
    }

    userListColumns = [...userListColumns, {
        title: 'Action',
        dataIndex: '_id',
        key: 'action',
        render: (_, { _id }) => (
            <Space size="small" >
                <Button onClick={() => navigate(`/users-list/${_id}`)} >View</Button>
            </Space>
        ),
    },]


    return (
        <Space direction='vertical'>
            <SearchBar />
            <Sort sortOptions={userSortOptions}/>
            <Table dataSource={users} columns={userListColumns} pagination={false} />
            <TablePagination totalItems={count} />

        </Space>
    )
}
export default UsersList;