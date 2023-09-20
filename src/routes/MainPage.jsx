import { useState, useEffect, useReducer } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import { Avatar, Button, Grid, Input, Layout, Menu, Typography } from 'antd';
import { HomeOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';

import AuthProvider, { userReducer, userState } from '../context/AuthContext';
import SearchCourse, { searchReducer, searchState } from '../context/SearchCourse';

const { Header, Content } = Layout;
const { useBreakpoint } = Grid;
const { Search } = Input;

export default function MainPage() {
    const navigate = useNavigate()
    let loca = useLocation()
    const screens = useBreakpoint();
    const token = localStorage.getItem('token')
    const [stateUser, dispatchUser] = useReducer(userReducer, userState)
    const [stateSearch, dispatchSearch] = useReducer(searchReducer, searchState)

    const [selectmenu, setSelectmenu] = useState('home')

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token)
            dispatchUser({ type: "GET_USER", payload: decodedToken })
        } else {
            navigate('/login')
        }
    }, []);

    useEffect(() => {
        setSelectmenu(loca.pathname)
    }, [loca])


    return (
        <AuthProvider.Provider value={{ state: stateUser }}>
            <SearchCourse.Provider value={{ state: stateSearch }}>
                <div>
                    <Layout className="layout">
                        <Header
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                position: 'sticky',
                                top: 0,
                                zIndex: 100,
                                backgroundColor: '#d13434',
                                padding: screens.lg ? 'unset' : '0 5px'
                            }}
                        >
                            {screens.lg ?
                                <Menu
                                    theme="dark"
                                    mode="horizontal"
                                    selectedKeys={selectmenu}
                                    style={{ backgroundColor: '#d13434' }}
                                    items={[
                                        {
                                            key: '/',
                                            label: 'Home',
                                            icon: <HomeOutlined />,
                                            style: { backgroundColor: '#a02d38' },
                                            onClick: () => navigate("/")
                                        },
                                    ]}
                                />
                                :
                                <Button type='text' icon={<HomeOutlined />} style={{ marginRight: '5px' }} />
                            }
                            <div style={{ width: screens.lg ? '50%' : '100%', display: 'flex' }}>
                                <Search
                                    placeholder='Search'
                                    onChange={(e) => dispatchSearch({ type: "SET_SEARCH", payload: e.target.value })}
                                />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', minWidth: screens.lg ? '300px' : '160px', padding: '0 5px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                                    <Avatar
                                        icon={<UserOutlined />}
                                        src={stateUser.img}
                                        style={{ marginRight: '10px' }}
                                    />
                                    {screens.lg &&
                                        <Typography style={{ color: 'white' }}>
                                            {(stateUser.fname || '') + ' ' + (stateUser.lname || '')}
                                        </Typography>
                                    }
                                </div>
                                <Button
                                    icon={<LogoutOutlined />}
                                    onClick={() => {
                                        localStorage.clear()
                                        dispatchUser({ type: "GET_USER", payload: '' })
                                        navigate("/login")
                                    }}
                                >
                                    Logout
                                </Button>
                            </div>
                        </Header>
                        <Content style={{ minHeight: 'calc(100vh - 64px)', width: screens.lg ? '90%' : '100%', alignSelf: 'center' }}>
                            {token && <Outlet />}
                        </Content>
                    </Layout>
                </div>
            </SearchCourse.Provider>
        </AuthProvider.Provider >
    )
}
