import React from 'react';
import { Descriptions, Empty, Skeleton } from '../../../../lib/generics';
import useFetchBookDetails from '../../hooks/useFetchBookDetails';
import { useParams } from "react-router-dom";
import { flattenObj } from '../../../../lib/helpers/flattenObj';


const BookDetails = () => {

    const { bookId } = useParams();

    const { loading, error, book } = useFetchBookDetails(bookId);

    const flattenbook = flattenObj(book);

    const items = Object.keys(flattenbook).map((item, index) => {

        return {
            key: index,
            label: item,
            children: flattenbook[item]
        }

    })
    if (loading) {
        return <Skeleton />
    }

    if (error) {
        return <Empty description="Something went wrong" />
    }

    if(!book){
        return <Empty />
    }

    return (
        <Descriptions layout='horizontal' title="Book Details" items={items} />
    )
}

export default BookDetails;