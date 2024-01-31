import React from 'react';
import { useParams } from "react-router-dom";
import useFetchUserDetails from '../../hooks/useFetchUserDetails';
import { Descriptions, Skeleton, Empty } from '../../../../lib/generics';
import { flattenObj } from '../../../../lib/helpers/flattenObj';


const UserDetails = () => {

    const { userId } = useParams();

    const { loading, error, user } = useFetchUserDetails(userId);

    const flattenUser = flattenObj(user);

    const items = Object.keys(flattenUser).map((item, index) => {

        return {
            key: index,
            label: item,
            children: flattenUser[item]
        }
    })


    if (loading) {
        return <Skeleton />
    }
    
    if (error) {
        return <Empty description="Something went wrong" />
    }

    return (
        <Descriptions title="User Details" items={items} />
    )
}

export default UserDetails;