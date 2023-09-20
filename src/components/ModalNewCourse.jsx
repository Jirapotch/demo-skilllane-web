import { useEffect, useState } from 'react';
import { Modal, Form, Input, DatePicker, InputNumber, Space, Select } from 'antd'
import axios from 'axios';

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
};

export default function ModalNewCourse({ open, setOpen, getCourse }) {
    const [form] = Form.useForm();
    const [insList, setInsList] = useState([])

    const handleOk = () => {
        form
            .validateFields()
            .then(async values => {
                let tmpData = {
                    title: values.title,
                    description: values.description,
                    instructor: values.instructor,
                    time: `${values.hours || 0}:${values.minutes || 0}:${values.seconds || 0}`,
                    price: values.price,
                    price_credits_collected: values.price_credits_collected,
                    category: values.category,
                    image: values.image,
                    number_of_student: values.number_of_student
                }
                await axios.post('https://enduring-rush-399609.as.r.appspot.com/course', tmpData, { headers })
                form.resetFields();
                setOpen(false);
                getCourse()
                // navigate("/")
            })
            .catch(errorInfo => {
                console.log('Validation Failed:', errorInfo);
            });
    };

    const handleCancel = () => {
        form.resetFields();
        setOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://enduring-rush-399609.as.r.appspot.com/users/instructor-list', { headers });
                setInsList(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [])


    return (
        <Modal title="Basic Modal" open={open} onOk={handleOk} onCancel={handleCancel}>
            <Form form={form} layout="vertical">
                <Form.Item
                    label="ชื่อ"
                    name="title"
                    rules={[
                        { required: true, message: 'กรุณากรอกชื่อ' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="รายละเอียด" name="description">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item label="ผู้สอน" name="instructor">
                    <Select mode="multiple" options={insList} />
                </Form.Item>
                <Space.Compact>
                    <Form.Item label="ชั่วโมง" name="hours">
                        <InputNumber min={0} max={23} />
                    </Form.Item>
                    <Form.Item label="นาที" name="minutes">
                        <InputNumber min={0} max={59} />
                    </Form.Item>
                    <Form.Item label="วินาที" name="seconds">
                        <InputNumber min={0} max={59} />
                    </Form.Item>
                </Space.Compact>
                <Form.Item label="ราคา ไม่เก็บหน่วยกิต" name="price">
                    <Input type="number" />
                </Form.Item>
                <Form.Item label="ราคา เก็บหน่วยกิต" name="price_credits_collected">
                    <Input type="number" />
                </Form.Item>
                <Form.Item label="หมวดหมู่" name="category">
                    <Input />
                </Form.Item>
                <Form.Item label="รูปภาพ" name="image">
                    <Input />
                </Form.Item>
                <Form.Item label="จำนวนนักเรียน" name="number_of_student">
                    <Input type="number" />
                </Form.Item>
            </Form>
        </Modal>
    )
}
