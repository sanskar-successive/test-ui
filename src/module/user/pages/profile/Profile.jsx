import React from 'react';
import useFetchUserAccount from '../../hooks/useFetchUserAccount';
import { Skeleton, Empty, Descriptions } from '../../../../lib/generics';
import { flattenObj } from '../../../../lib/helpers/flattenObj';


const Profile = () => {

    const { loading, error, profile } = useFetchUserAccount();

    const flattenUser = flattenObj(profile);

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
        <Descriptions title="My Account" items={items} />
    )
}

export default Profile;