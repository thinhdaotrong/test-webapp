import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Calendar, Badge, List } from 'antd';
import { CalendarViewStyles } from './BookMeeting.styles'
import moment from 'moment';
import {
    TeamOutlined,
} from '@ant-design/icons';
import {
    getMeetingsList,
} from 'hoa-redux/selectors/entities/meeting';

const ListItem = ({ item }) => {
    return (
        <List.Item>
            <div className='meeting-info'>
                <div className='meeting-time'>
                    <p>{moment.utc(item.schedule_start_at).format('hh:mm A')}</p>
                    <p>{moment.utc(item.schedule_end_at).format('hh:mm A')}</p>
                </div>
                <div className='meeting-name'>
                    <h5>{item.name}</h5>
                    <p>{item.space_name}</p>
                </div>
            </div>
        </List.Item>
    )
}

const filterMeeting = (item, selectedDate) => {
    if (moment.utc(item.schedule_start_at).format('YYYY-MM-DD') === selectedDate.format('YYYY-MM-DD')) {
        return true
    }
    return false
}

function CalendarView() {

    const meetingsList = useSelector(getMeetingsList)
    const [selectedDate, setSelectedDate] = useState(moment())
    const [dailyMeetingList, setDailyMeetingList] = useState([])

    useEffect(() => {
        setDailyMeetingList(meetingsList.filter(item => filterMeeting(item, selectedDate)))
    }, [meetingsList, selectedDate])

    const dateMeetingsList = meetingsList.map(item => moment.utc(item.schedule_start_at).format('YYYY-MM-DD'))

    const dateCellRender = (value) => {
        if (dateMeetingsList.indexOf(value.format('YYYY-MM-DD')) !== -1) {
            return <Badge color='#2d59e8' />
        }
    }
    const onSelectDate = (value) => {
        setSelectedDate(value)
    }
    return (
        <CalendarViewStyles>
            <span className='input-prefix'>
                <TeamOutlined />
                <span>Calendar</span>
            </span>
            <div className="site-calendar-demo-card">
                <Calendar
                    fullscreen={false}
                    dateCellRender={dateCellRender}
                    onSelect={onSelectDate}
                />
            </div>
            <div className='meeting-schedule'>
                <List
                    itemLayout="horizontal"
                    dataSource={dailyMeetingList}
                    renderItem={item => <ListItem item={item} />}
                />
            </div>
        </CalendarViewStyles>
    )
}

export default CalendarView
