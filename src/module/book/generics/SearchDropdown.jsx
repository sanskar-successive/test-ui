import React from 'react';
import { Select, Typography } from 'antd';
import { BookService } from '../Service';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
const { Title } = Typography;


const SelectDropdown = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchData = async () => {
        try {
            setLoading(true)
            const { data } = await BookService.getBooksForHomePage("");
            const options = data.books.map((item) => ({
                value: item["title"],
                text: item["title"],
            }))
            setData(options);
        } catch (error) {
            setError("unable to fetch")
        } finally {
            setLoading(false);
        }
    }

    const handleDropdownOpen = async (open) => {

        await fetchData();
    }

    const handleScroll = async () => {
        await fetchData();
    }

    return (
        <>
            <Select
                mode="multiple"
                style={{
                    width: '100%',
                }}
                placeholder="Please select"
                // onChange={handleChange}
                loading={loading}
                options={(data || []).map((d) => ({
                    value: d.value,
                    label: d.text,
                }))}

                onDropdownVisibleChange={handleDropdownOpen}
                onPopupScroll={handleScroll}
            />
        </>
    )
}

export default SelectDropdown;