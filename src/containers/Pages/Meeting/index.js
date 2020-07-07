import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Breadcrumb, Row, Col, Tabs, Table } from 'antd';
import LayoutContentWrapper from '@hoa/components/utility/layoutWrapper';
import { MeetingStyles } from './Meeting.styles'
import EditMeetingModal from '@hoa/components/EditMeetingModal';
import NewMeetingModal from '@hoa/components/NewMeetingModal';
import {
    AppstoreOutlined,
    MessageOutlined,
    QuestionCircleFilled,
    EditOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import ListAvatar from '@hoa/components/ListAvatar';
import MeetingDetail from './MeetingDetail'
import QuickStats from './QuickStats'
import Operations from './Operations'
import { getMeetings, resetMeetingActivities, getMeetingActivities } from 'hoa-redux/actions/meeting';
import {
    getAllBuildings,
} from 'hoa-redux/actions/building';
import {
    getMeetingsList,
    getLoadingStatus,
    getTotalPage
} from 'hoa-redux/selectors/entities/meeting';
import {
    getAllSpaces,
} from 'hoa-redux/actions/space';
import Auth from '@hoa/components/Auth';
import io from 'socket.io-client'

const { TabPane } = Tabs;
const PER_PAGE = 8;
const token = localStorage.getItem("token")
const END_POINT = 'http://207.148.68.224:8000/hoa'
// const END_POINT = 'http://localhost:5000/hoa'
const socket = io(END_POINT, {
    query: { token }
})

// const socket = io.connect(END_POINT, {
//     query: { token }
// })

// const rowSelection = {
//     onChange: (selectedRowKeys, selectedRows) => {
//         console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//     },
// };

function Meeting() {

    console.log('check 1', socket.connected)

    const dispatch = useDispatch()
    const isAdmin = Auth.getRole() === 'admin' ? true : false;

    const [isShowGroupChat, setIsShowGroupChat] = useState(false)
    const [isShowAdminChat, setIsShowAdminChat] = useState(false)
    const [isShowDetail, setIsShowDetail] = useState(false)

    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)

    const [dataItem, setDataItem] = useState(null)
    const [roomId, setRoomId] = useState('')

    const onActionMessage = () => {
        if (isShowAdminChat) {
            setIsShowAdminChat(false)
        }
        setIsShowGroupChat(true)
        socket.emit('join', { room: roomId })
        dispatch(resetMeetingActivities())
        dispatch(getMeetingActivities(1, 5, roomId)) // page = 1, perPage = 5
    }
    useEffect(() => {
        socket.open()
        socket.on('connected', (data) => {
            console.log(data)
        })
        socket.on('my_response', (data) => {
            console.log(data)
        })
        return () => {
            socket.close()
        }
    }, [])
    const columns = [
        {
            title: 'MEETING NAME',
            dataIndex: 'name',
            key: 'name',
            render: name => <span>{name}</span>,
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend'],
        },
        {
            title: 'SPACE',
            dataIndex: 'space',
            key: 'space',
            render: space => <span>{space}</span>,
            sorter: (a, b) => a.space.length - b.space.length,
            sortDirections: ['descend'],
        },
        {
            title: 'DATE',
            dataIndex: 'date',
            key: 'date',
            render: date => <span>{moment.utc(date).format('DD/MM/YYYY')}</span>,
            sorter: (a, b) => moment.utc(a.date).format('YYYYMMDD') - moment.utc(b.date).format('YYYYMMDD'),
            sortDirections: ['descend', /*'ascend'*/],
        },
        {
            title: 'TIME',
            dataIndex: 'time',
            key: 'time',
            render: time => <span>{moment.utc(time[0]).format('HH:mm')}-{moment.utc(time[1]).format('HH:mm')}</span>,
            sorter: (a, b) => moment.utc(a.time[0]).format('HHmm') - moment.utc(b.time[0]).format('HHmm'),
            sortDirections: ['descend', /*'ascend'*/],
        },
        {
            title: 'ATTENDEES',
            dataIndex: 'attendees',
            key: 'attendees',
            render: list => <ListAvatar list={list} size={27} />
        },
        {
            title: isAdmin ? 'MESSAGES' : 'ACTION',
            // dataIndex: isAdmin ? 'messages' : 'action',
            key: isAdmin ? 'messages' : 'action',
            align: 'center',
            render: id => {
                if (isAdmin) {
                    return (
                        <span>
                            <MessageOutlined style={{ fontSize: 20, color: '#000' }} />
                            <div className='number-messages'>7</div>
                        </span>
                    )
                }
                return (
                    <span>
                        <MessageOutlined onClick={onActionMessage} />
                        <EditOutlined />
                        <QuestionCircleFilled onClick={() => setIsShowAdminChat(!isShowAdminChat)} />
                    </span>
                )

            }
        },
    ];

    useEffect(() => {
        // dispatch(getMeetings(1, PER_PAGE, "")) // type = all
        dispatch(getAllSpaces("", "", "")) // ignore page, perPage, type
        dispatch(getAllBuildings("", "")) // ignore page, perPage
    }, [])

    const data = []
    const meetingsList = useSelector(getMeetingsList)
    meetingsList.map(item => {
        const { id, name, space_name, schedule_start_at, schedule_end_at, attendees, amenities, agenda, floor, space_id, building_name, status } = item
        const dataItem = {
            key: id,
            name,
            space: space_name,
            date: schedule_start_at,
            time: [schedule_start_at, schedule_end_at],
            attendees,
            action: id,
            agenda,
            floor,
            space_id,
            amenities,
            building: building_name,
            status
        }
        data.push(dataItem)
    })

    const showModal = () => {
        setVisible(true)
    }
    const handleCancel = e => {
        setVisible(false)
    }
    const showModal2 = () => {
        setVisible2(true)
    }
    const handleCancel2 = e => {
        setVisible2(false)
    }
    const onRow = (record, rowIndex) => {
        return {
            onClick: event => {
                setDataItem(record)
                setIsShowDetail(true)
            },
            onMouseEnter: event => {
                setRoomId(record.key.toString())
            }
        }
    }

    const loading = useSelector(getLoadingStatus)
    const totalPage = useSelector(getTotalPage)
    const maxItem = totalPage * PER_PAGE
    const [page, setPage] = useState(1)
    const [maxPageSelected, setMaxPageSelected] = useState(1)

    const [dataFiltered, setDataFiltered] = useState([])
    const [meetingType, setMeetingType] = useState("")

    const onChangeTabs = (key) => {
        setMeetingType(key)
        setPage(1)
        if (key === "") {
            return
        }
        setDataFiltered(data.filter(item => item.status === key))
    }
    useEffect(() => {
        setDataFiltered(data.filter(item => item.status === meetingType))
        if (dataItem) {
            setDataItem(prevState => ({ ...prevState, ...data.find(item => item.key === prevState.key) }))
        }
    }, [meetingsList])

    const onChangePagination = (page) => {
        setPage(page)
        if (maxPageSelected < page) {
            setMaxPageSelected(page)
        }
    }

    useEffect(() => {
        dispatch(getMeetings(page, PER_PAGE, meetingType))
    }, [page, meetingType])

    return (
        <LayoutContentWrapper style={{ minHeight: '100vh', background: '#f8f9fb' }}>
            <MeetingStyles>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <AppstoreOutlined /> DASHBOARD
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>MEETINGS</Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <Col md={18}>
                        <div className='meetings-table block'>
                            <Tabs
                                defaultActiveKey=""
                                onChange={onChangeTabs}
                                tabBarExtraContent={<Operations showModal2={showModal2} isShowDetail={isShowDetail} setIsShowDetail={setIsShowDetail} isAdmin={isAdmin} />}
                            >
                                <TabPane tab="ALL" key="">
                                    <Table
                                        // rowSelection={rowSelection}
                                        columns={columns}
                                        dataSource={data}
                                        pagination={{ position: ['bottomCenter'], pageSize: 8, onChange: onChangePagination, total: maxItem, current: page }}
                                        onRow={onRow}
                                        loading={loading}
                                    />
                                </TabPane>
                                <TabPane tab="CURRENT" key="C">
                                    <Table
                                        // rowSelection={rowSelection}
                                        columns={columns}
                                        dataSource={data}
                                        pagination={{ position: ['bottomCenter'], pageSize: 8, onChange: onChangePagination, total: maxItem, current: page }}
                                        onRow={onRow}
                                        loading={loading}
                                    />
                                </TabPane>
                                <TabPane tab="UPCOMING" key="U">
                                    <Table
                                        // rowSelection={rowSelection}
                                        columns={columns}
                                        dataSource={data}
                                        pagination={{ position: ['bottomCenter'], pageSize: 8, onChange: onChangePagination, total: maxItem, current: page }}
                                        onRow={onRow}
                                        loading={loading}
                                    />
                                </TabPane>
                                <TabPane tab="PAST" key="P">
                                    <Table
                                        // rowSelection={rowSelection}
                                        columns={columns}
                                        dataSource={data}
                                        pagination={{ position: ['bottomCenter'], pageSize: 8, onChange: onChangePagination, total: maxItem, current: page }}
                                        onRow={onRow}
                                        loading={loading}
                                    />
                                </TabPane>
                            </Tabs>
                        </div>
                    </Col>
                    <Col md={6} >
                        {isAdmin ?
                            <>
                                {isShowDetail ?
                                    <>{data[0] && <MeetingDetail isShowGroupChat={isShowGroupChat} roomId={roomId} isShowAdminChat={isShowAdminChat} showModal={showModal} dataMeeting={dataItem ? dataItem : data[0]} />}</>
                                    : <QuickStats />}
                            </>
                            :
                            <>
                                {isShowDetail ?
                                    <>{data[0] && <MeetingDetail isShowGroupChat={isShowGroupChat} roomId={roomId} isShowAdminChat={isShowAdminChat} showModal={showModal} dataMeeting={dataItem ? dataItem : data[0]} />}</>
                                    : null
                                }
                            </>

                        }
                    </Col>
                </Row>
            </MeetingStyles>
            {data[0] && <EditMeetingModal visible={visible} setIsShowDetail={setIsShowDetail} handleCancel={handleCancel} dataMeeting={dataItem ? dataItem : data[0]} />}
            <NewMeetingModal visible={visible2} handleCancel={handleCancel2} />
        </LayoutContentWrapper>
    )
}

export default Meeting
