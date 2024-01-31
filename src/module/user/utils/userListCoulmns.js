export const getUserListColumns = () => {
    return [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Email',
            dataIndex: ["contact", "email"],
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: ["contact", "phone"],
            key: 'rating',
        },
    ]
}