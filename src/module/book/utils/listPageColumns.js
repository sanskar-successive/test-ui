export function getListPageColumns() {
    return [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Author',
            dataIndex: ['author', 'name'],
            key: 'authorName',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
        }
    ]
}