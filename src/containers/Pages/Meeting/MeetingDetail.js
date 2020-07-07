import React, { useState, useEffect } from 'react'
import { Avatar, Row, Col } from 'antd';
import {
    CalendarOutlined,
    EnvironmentOutlined,
    InfoCircleFilled,
    ClockCircleFilled,
    FormOutlined,
    UserOutlined
} from '@ant-design/icons';
import moment from 'moment';
import { MeetingDetailStyles } from './Meeting.styles'
import GroupChat from './GroupChat'
import AdminChat from './AdminChat'
import { getUsersIncludeImage } from '@hoa/utils/get_data'

function MeetingDetail({ showModal, dataMeeting, isShowGroupChat, isShowAdminChat, roomId }) {
    const { name, space, date, time, attendees, agenda, floor, building } = dataMeeting
    const [users, setUsers] = useState([])
    useEffect(() => {
        getUsersIncludeImage(attendees)
            .then(data => setUsers(data))
            .catch(err => console.log(err))
    }, [attendees])
    return (
        <MeetingDetailStyles>
            <div className='meeting-detail block'>
                <div className='meeting-detail-header'>
                    <span>{name}</span>
                    <FormOutlined onClick={showModal} />
                </div>
                {isShowAdminChat ?
                    <AdminChat /> :
                    <div className='meeting-detail-content'>
                        <div className='date-time'>
                            <ul>
                                <li>
                                    <CalendarOutlined />
                                    <span>{moment.utc(date).format('Do MMMM YYYY')}</span>
                                </li>
                                <li>
                                    <ClockCircleFilled />
                                    <span>{moment.utc(time[0]).format('h:mmA')}-{moment.utc(time[1]).format('h:mmA')}</span>
                                </li>
                                <li>
                                    <EnvironmentOutlined />
                                    {space && <span>{space}</span>}
                                </li>
                                <li>
                                    <InfoCircleFilled />
                                    {building && <span>{building}, {floor}th floor</span>}
                                </li>
                            </ul>
                        </div>
                        <div className='attendees'>
                            <div className='block-title'>ATTENDEES</div>
                            <Row>
                                {users.map(item => (
                                    <Col span={12} key={item.id}>
                                        <Avatar size={27} icon={<UserOutlined />} /*src={URL.createObjectURL(item.image)}*/ />
                                        <span className='name'>{item.first_name} {item.last_name}</span>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                        <div className='agenda'>
                            <div className='block-title'>AGENDA</div>
                            <p>{agenda}</p>
                        </div>
                        {isShowGroupChat && <GroupChat roomId={roomId} />}
                        {/* <Button type='primary'>EDIT</Button> */}
                        {/* <Button>CANCEL MEETING</Button> */}
                    </div>
                }
            </div>
        </MeetingDetailStyles>
    )
}

export default MeetingDetail
