import React, { memo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Title, Space, Segmented } from '../../../../../lib/generics';
// import { sortOptions } from '../../../utils/sortOptions';


const Sort = ({sortOptions}) => {
    const location = useLocation();
    const [queryParams, setQueryParams] = useSearchParams(location.search);

    if (queryParams.has("skip")) {
        queryParams.delete("skip");
    }
    if (queryParams.has("limit")) {
        queryParams.delete("limit");
    }

    let sortBy = "newest";

    if (queryParams.has('sortBy')) {

        sortBy = queryParams.get("sortBy");
    }

    const handleSortBy = (value) => {

        sortBy = value;
        if (sortBy !== 'newest') {
            queryParams.set('sortBy', value);
        } else {
            queryParams.delete('sortBy');
        }

        setQueryParams(queryParams);
    };

    return(
        <Space>
            <Title level={5}>Sort By</Title>
            <Segmented value={sortBy} onChange={handleSortBy} options={sortOptions} />
        </Space>
    ) 
};

export default memo(Sort);
