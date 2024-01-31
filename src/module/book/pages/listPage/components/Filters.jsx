import React from 'react'
import { Card, Checkbox, InputNumber, Button, Title } from '../../../../../lib/generics'
import { Form } from 'antd';
import { useLocation, useSearchParams } from "react-router-dom";
import { memo } from 'react';
import { categories } from '../../../utils/categories';
import { languages } from '../../../utils/languages';



const Filters = () => {

    const location = useLocation();

    const [queryParams, setQueryParams] = useSearchParams(location.search);

    if (queryParams.has("skip")) {
        queryParams.delete("skip");
    }
    if (queryParams.has("limit")) {
        queryParams.delete("limit");
    }



    let initialValues = {
        price: { from: queryParams.has("price.from") ? Number(queryParams.get("price.from")) : 50, to: queryParams.has("price.to") ? Number(queryParams.get("price.to")) : 2000 },
        rating: { aboveThree: queryParams.has("rating", "aboveThree"), aboveFour: queryParams.has("rating", "aboveFour") },
        category: {
            fiction: queryParams.has("category", "fiction"),
            mystery: queryParams.has("category", "mystery"),
            arts: queryParams.has("category", "arts"),
            science: queryParams.has("category", "science"),
            romance: queryParams.has("category", "romance"),
            horror: queryParams.has("category", "horror"),
            religion: queryParams.has("category", "religion"),
            philosophy: queryParams.has("category", "philosophy"),
            history: queryParams.has("category", "history"),
            poetry: queryParams.has("category", "poetry"),
            biography: queryParams.has("category", "biography"),
            technology: queryParams.has("category", "technology"),
        },
        language: {
            english: queryParams.has("language", "english"),
            hindi: queryParams.has("language", "hindi"),
            sanskrit: queryParams.has("language", "sanskrit"),
            telugu: queryParams.has("language", "telugu"),
            bengali: queryParams.has("language", "bengali"),
        },
    }



    const handleApplyFilters = (value) => {
        console.log("filters", value);

        Object.entries(value).forEach((item) => {
            if (item[0] === "price") {
                if (item[1].from > 50) {
                    if (queryParams.has("price.from")) {
                        queryParams.delete("price.from");
                    }
                    queryParams.set("price.from", item[1].from);
                } else {
                    queryParams.delete("price.from");
                }
                if (item[1].to < 2000) {
                    if (queryParams.has("price.to")) {
                        queryParams.delete("price.to");
                    }
                    queryParams.set("price.to", item[1].to);
                } else {
                    queryParams.delete("price.to");
                }
            } else if (item[0] === "rating") {
                if (queryParams.has(item[0])) {
                    queryParams.delete(item[0]);
                }
                Object.keys(item[1]).forEach((key) => {
                    if (item[1][key] === true) {
                        queryParams.set(item[0], key);
                    }
                });
            } else {
                if (queryParams.has(item[0])) {
                    queryParams.delete(item[0]);
                }
                Object.keys(item[1]).forEach((key) => {
                    if (item[1][key] === true) {
                        queryParams.append(item[0], key);
                    }
                });
            }
        });



        setQueryParams(queryParams);
    }


    return (
        <Card
            style={{ marginRight: 50 }}
        >
            <Title level={5}>Filters</Title>


            <Form
                onFinish={handleApplyFilters}
                initialValues={initialValues}
            >

                <Title level={5}>Price Range</Title>
                <Form.Item name={["price", "from"]}>
                    <InputNumber min={50} max={2000} />
                </Form.Item>

                <Form.Item name={["price", "to"]}>
                    <InputNumber min={50} max={2000} />
                </Form.Item>

                <Title level={5}>Rating</Title>
                <Form.Item valuePropName='checked' name={["rating", "aboveThree"]}>
                    <Checkbox >3+</Checkbox>
                </Form.Item>

                <Form.Item valuePropName='checked' name={["rating", "aboveFour"]}>
                    <Checkbox >4+</Checkbox>
                </Form.Item>

                <Title level={5}>Category</Title>
                {categories.map((item) => {
                    return (
                        <Form.Item valuePropName='checked' name={["category", `${item}`]}>
                            <Checkbox >{item}</Checkbox>
                        </Form.Item>
                    )
                })}

                <Title level={5}>Language</Title>

                {languages.map((item) => {
                    return (
                        <Form.Item valuePropName='checked' name={["language", `${item}`]}>
                            <Checkbox >{item}</Checkbox>
                        </Form.Item>
                    )
                })}


                <Form.Item >
                    <Button type='default' htmlType="submit">Apply</Button>

                </Form.Item>

            </Form>

        </Card>
    )
}

export default memo(Filters);