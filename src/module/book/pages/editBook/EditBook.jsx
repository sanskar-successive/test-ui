import React, {useState} from 'react';
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs';
import { Button, Checkbox, DatePicker, Form, Input, InputNumber, Rate, Select, TextArea, Skeleton, Empty, Spin, Result } from '../../../../lib/generics';
import useFetchBookDetails from '../../hooks/useFetchBookDetails';
import useUpdateBook from '../../hooks/useUpdateBook';
import { validateMessages } from '../../utils/validateMessage';
import { categories } from '../../utils/categories';
import { languages } from '../../utils/languages';
import { BookService } from '../../Service';



const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};


const EditBook = () => {

    const { bookId } = useParams();

    const { loading, error, book } = useFetchBookDetails(bookId);


    const [response, setResponse] = useState({});
    const [updateError, setUpdateError] = useState("");
    const [submissionLoading, setSubmissionLoading] = useState(false);

    const updateBook = async (id, payload) => {
        setSubmissionLoading(true);
        try {
            const { data } = await BookService.updateBook(id, payload);
            console.log("response", data);
            setResponse(data);

        } catch (error) {
            setUpdateError(error.message);
        }
        finally {
            setSubmissionLoading(false)
        }
    }


    const handleUpdateBookDetails = async (value) => {
        await updateBook(bookId, value);
    }


    if (loading) {
        return <Skeleton />
    }
    
    if (error) {
        return <Empty description="Something went wrong" />
    }

    const originalDate = book.moreDetails.firstPublished

    const formattedBook = {
        ...book,
        moreDetails: {
            ...book.moreDetails,
            firstPublished: dayjs(new Date(originalDate).toISOString().split('T')[0].replace(/-/g, '/'), 'YYYY/MM/DD')
        },
    };



    if (submissionLoading) {
        return <Spin fullscreen />
    }

    if (updateError) {
        return <Result status="error" title="Updation Failed" />
    }

    if (Object.keys(response).length>0) {
        return <Result status="success" title="Updated successfully" />
    }


    return (

        <Form
            layout="horizontal"
            style={{
                maxWidth: 600,
            }}
            validateMessages={validateMessages}
            initialValues={formattedBook}
            scrollToFirstError={true}
            onFinish={handleUpdateBookDetails}
            onFinishFailed={() => { }}
        >

            <Form.Item label="Book Title" name={'title'} rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item label="Author" name={['author', 'name']} rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item label="About Author" name={['author', 'about']} rules={[{ required: true }]}>
                <TextArea rows={4} />
            </Form.Item>

            <Form.Item label="Category" name={'category'} rules={[{ required: true }]}>
                <Select>
                    {categories.map((item) => {
                        return (
                            <Select.Option value={item}>{item}</Select.Option>
                        )
                    })}
                </Select>
            </Form.Item>


            <Form.Item label="Price" name={'price'} rules={[{ required: true, type: 'number' }]}>
                <InputNumber />
            </Form.Item>


            <Form.Item label="Rating" name={'rating'} rules={[{ required: true, type: 'number' }]}>
                <Rate />
            </Form.Item>


            <Form.Item label="Language" name={['moreDetails', 'text_language']} rules={[{ required: true }]}>
                <Select>
                    {languages.map((item) => {
                        return (
                            <Select.Option value={item}>{item}</Select.Option>
                        )
                    })}
                </Select>
            </Form.Item>


            <Form.Item label="Description" name={['moreDetails', 'description']} rules={[{ required: true }]}>
                <TextArea rows={4} />
            </Form.Item>


            <Form.Item label="Seller" name={['moreDetails', 'seller']} rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item label="Publisher" name={['moreDetails', 'publisher']} rules={[{ required: true }]}>
                <Input />
            </Form.Item>


            <Form.Item label="First Published" name={['moreDetails', 'firstPublished']}>
                <DatePicker />
            </Form.Item>

            <Form.Item label="Page Count" name={['moreDetails', 'pages']} rules={[{ required: true, type: 'number' }]}>
                <InputNumber />
            </Form.Item>

            <Form.Item label="File Size" name={['moreDetails', 'fileSize']} rules={[{ required: true, type: 'number' }]}>
                <InputNumber />
            </Form.Item>


            <Form.Item label="Verified" valuePropName="checked" name={['moreDetails', 'verified']}>
                <Checkbox />
            </Form.Item>

            {/* <Form.Item label="Cover Image" name={'coverImage'} valuePropName="fileList" getValueFromEvent={normFile}>
                <Upload action="/upload.do" listType="picture-card"  >
                    <button
                        style={{
                            border: 0,
                            background: 'none',
                        }}
                        type="button"
                    >
                        <PlusOutlined />
                        <div
                            style={{
                                marginTop: 8,
                            }}
                        >
                            Select
                        </div>
                    </button>
                </Upload>
            </Form.Item> */}


            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Add
                </Button>
            </Form.Item>


        </Form>

    );
};
export default EditBook;