import { InputNumber, Input, Select } from 'antd';
import React, { useEffect } from 'react';
import { Form, Button } from 'antd';

const RadioStationsFilter = ({ filters, onFinish }) => {

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            'id': filters.id,
            'uniqueId': filters.uniqueId,
            'enabled': filters.enabled,
            'title': filters.title,
            'songId': filters.songId,
            'genreId': filters.genreId
        });

    }, [filters, form]);

    return (
        <Form
            form={form}
            layout="inline"
            onFinish={onFinish}
        >
            <Form.Item name="id" label="Id">
                <InputNumber />
            </Form.Item>
            <Form.Item name="uniqueId" label="Unique Id">
                <Input />
            </Form.Item>
            <Form.Item name="title" label="Title">
                <Input />
            </Form.Item>
            <Form.Item name="enabled" label="Enabled">
                <Select>
                    <Select.Option value="">All</Select.Option>
                    <Select.Option value="true">Enabled</Select.Option>
                    <Select.Option value="false">Disabled</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item name="songId" label="Song Id">
                <InputNumber />
            </Form.Item>
            <Form.Item name="genreId" label="Genre Id">
                <InputNumber />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Filter
                    </Button>
            </Form.Item>
        </Form>
    );
}

export default RadioStationsFilter;

