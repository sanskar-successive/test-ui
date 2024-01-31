import React, {useState} from 'react';
import dayjs from 'dayjs';
import useCreateBook from '../../hooks/useCreateBook';
import { Button, Card, Checkbox, DatePicker, Empty, Form, Input, InputNumber, PlusOutlined, Rate, Result, Select, Spin, TextArea, Upload } from '../../../../lib/generics';
import { categories } from '../../utils/categories';
import { languages } from '../../utils/languages';
import { validateMessages } from '../../utils/validateMessage';
import { BookService } from '../../Service';


const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};


const AddBook = () => {

    const [response, setResponse] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const createBook = async (payload) => {
        setLoading(true);
        try {
            const { data } = await BookService.createBook(payload);
            console.log("response", data);
            setResponse(data);

        } catch (error) {
            setError(error.message);
        }
        finally {
            setLoading(false)
        }
    }


    const handleFormSubmit = async (value) => {
        await createBook(value);
    }

    if (loading) {
        return <Spin fullscreen />
    }

    if (error) {
        return <Result status="error" title="Submission Failed" />
    }

    if (Object.keys(response).length>0) {
        return <Result status="success" title="Form submitted successfully" />
    }

    return (

        <Card>

            <Form
                layout="horizontal"
                style={{
                    maxWidth: 800,
                }}
                validateMessages={validateMessages}
                scrollToFirstError={true}
                onFinish={handleFormSubmit}
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


                <Form.Item initialValue={dayjs('2015/01/01', 'YYYY/MM/DD')} label="First Published" name={['moreDetails', 'firstPublished']}>
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

                <Form.Item label="Cover Image" name={'coverImage'} valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload action="/upload.do" listType="picture-card">
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
                </Form.Item>


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
        </Card>
    );
};
export default AddBook;