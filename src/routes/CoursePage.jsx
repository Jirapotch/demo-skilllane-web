import { useState, useEffect, useContext } from 'react'
import axios from 'axios';

import { Avatar, Button, Card, Col, Row, Typography, Grid } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import AuthContext from '../context/AuthContext';
import SearchCourse from '../context/SearchCourse';
import ModalNewCourse from '../components/ModalNewCourse';

const { useBreakpoint } = Grid;

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
};

function formatNumber(number) {
    return number.toLocaleString('th-TH');
}

export default function CoursePage() {
    const { state: stateUser } = useContext(AuthContext)
    const { state: stateSearch } = useContext(SearchCourse)
    const [dataList, setDataList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const screens = useBreakpoint();

    const getCourse = async () => {
        try {
            const response = await axios.get('https://enduring-rush-399609.as.r.appspot.com/course', { headers });
            setDataList(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getCourse()
    }, [])


    return (
        <div>
            {stateUser.role === 'Instructor' &&
                <div style={{ padding: '20px' }}>
                    <Button onClick={() => setIsModalOpen(true)}>+ New Course</Button>
                </div>
            }
            <div style={{ padding: '20px' }}>
                <Row gutter={[12, 12]} >
                    {dataList.filter(o =>
                        Object.keys(o).some(k =>
                            String(o[k]).toLowerCase().includes(stateSearch.toLowerCase()) ||
                            (k === "instructor" &&
                                o.instructor.some((si) =>
                                    String(si.name).toLowerCase().includes(stateSearch.toLowerCase())
                                ))
                        )
                    ).map((data, index) => {
                        const [hours, minutes, seconds] = data.time.split(':').map(Number)
                        return (
                            <Col xs={24} lg={5} xl={4} key={index} className='col-course-item'>
                                <Card
                                    className='course_item'
                                    bordered={false}
                                    hoverable
                                    actions={[
                                        <div className='content-price'>
                                            <div className='content-price-row'>
                                                <span className='content-price-discount'>
                                                    {formatNumber(data.price || 0)} บาท
                                                </span>
                                                <span className='content-type-academic'>
                                                    ไม่เก็บหน่วยกิต
                                                </span>
                                            </div>
                                            <div className='content-price-row'>
                                                <span className='content-price-discount'>
                                                    {formatNumber(data.price_credits_collected || 0)} บาท
                                                </span>
                                                <span className='content-type-academic'>
                                                    เก็บหน่วยกิต
                                                </span>
                                            </div>
                                        </div>
                                    ]}
                                >{screens.lg ?
                                    <>
                                        <div className='content-thumbnail'>
                                            <div className='thumbnail-image'>
                                                <img alt="img-course" width={'100%'} height={'100%'} src={data.image} />
                                            </div>
                                            <div className="course-hover">
                                                {data.instructor.map((data_instructor, idx) =>
                                                    <div className="course-hover-instructor" key={idx}>
                                                        <Avatar
                                                            icon={<UserOutlined />}
                                                            src={data_instructor.image}
                                                            style={{ marginRight: '10px', minWidth: '30px' }}
                                                        />
                                                        <div>
                                                            <Typography className="instructor-hover-name">
                                                                {data_instructor.name}
                                                            </Typography>
                                                            <Typography className="instructor-hover-desc">
                                                                {data_instructor.description}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="video-detail-count">
                                                    {`${hours} ชม. ${minutes} น. ${seconds} วิ.`}
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ padding: '10px' }}>
                                            <Typography className='content-detail-title three-line-text'>
                                                {data.title}
                                            </Typography>
                                            {data.instructor.map((data_instructor, idx) =>
                                                <div className='content-detail-instructor' key={idx}>
                                                    <Avatar
                                                        icon={<UserOutlined />}
                                                        src={data_instructor.image}
                                                        style={{ marginRight: '15px' }}
                                                    />
                                                    <Typography>
                                                        {data_instructor.name}
                                                    </Typography>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                    :
                                    <>
                                        <Row>
                                            <Col span={8}>
                                                <div className='content-thumbnail'>
                                                    <div className='thumbnail-image'>
                                                        <img alt="img-course" width={'100%'} height={'100%'} src={data.image} />
                                                    </div>
                                                    <div className="course-hover">
                                                        {data.instructor.map((data_instructor, idx) =>
                                                            <div className="course-hover-instructor" key={idx}>
                                                                <Avatar
                                                                    icon={<UserOutlined />}
                                                                    src={data_instructor.image}
                                                                    style={{ marginRight: '10px', minWidth: '30px' }}
                                                                />
                                                                <div>
                                                                    <Typography className="instructor-hover-name">
                                                                        {data_instructor.name}
                                                                    </Typography>
                                                                    <Typography className="instructor-hover-desc">
                                                                        {data_instructor.description}
                                                                    </Typography>
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div className="video-detail-count">
                                                            {`${hours} ชม. ${minutes} น. ${seconds} วิ.`}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col span={16}>
                                                <div style={{ padding: '10px' }}>
                                                    <Typography className='content-detail-title three-line-text'>
                                                        {data.title}
                                                    </Typography>
                                                    {data.instructor.map((data_instructor, idx) =>
                                                        <div className='content-detail-instructor' key={idx}>
                                                            <Avatar
                                                                icon={<UserOutlined />}
                                                                src={data_instructor.image}
                                                                style={{ marginRight: '15px' }}
                                                            />
                                                            <Typography>
                                                                {data_instructor.name}
                                                            </Typography>
                                                        </div>
                                                    )}
                                                </div>
                                            </Col>
                                        </Row>
                                    </>
                                    }
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </div>
            <ModalNewCourse open={isModalOpen} setOpen={(v) => setIsModalOpen(v)} getCourse={getCourse} />
        </div >
    )
}
