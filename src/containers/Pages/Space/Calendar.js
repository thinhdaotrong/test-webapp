import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
    getMeetingsList,
} from 'hoa-redux/selectors/entities/meeting';
import {
    ArrowLeftOutlined
} from '@ant-design/icons';
import { getMeetings } from 'hoa-redux/actions/meeting';
import moment from 'moment';
import { Calendar, Typography } from 'antd';
import CalendarStyles from '@hoa/assets/styles/Space/CalendarStyles'

const {Title} = Typography

const filterMeeting = (item, date) => {
    if (moment.utc(item.schedule_start_at).format('YYYY-MM-DD') === date.format('YYYY-MM-DD')) {
        return true
    }
    return false
}

function FullCalendar({changeVisibleCalendar}) {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMeetings("", "", "")) // get all meetings
    }, [])

    const meetingsList = useSelector(getMeetingsList)

    const dateCellRender = (value) => {
        const listData = meetingsList.filter(item => filterMeeting(item, value))
        console.log(listData)
        return (
            <ul className="events">
                {listData.map(item => (
                    <li key={item.id}>
                        {item.name}
                    </li>
                ))}
            </ul>
        );
    }

    const getMonthData = (value) => {
        if (value.month() === 8) {
            return 1394;
        }
    }

    // const monthCellRender = (value) => {
    //     const num = getMonthData(value);
    //     return num ? (
    //         <div className="notes-month">
    //             <section>{num}</section>
    //             <span>Backlog number</span>
    //         </div>
    //     ) : null;
    // }

    return (
        <CalendarStyles>

            <Title level={4}>
                <span onClick={() => changeVisibleCalendar(false)}><ArrowLeftOutlined /> Back</span>
              Calendar View
            </Title>
            <Calendar
                dateCellRender={dateCellRender}
                // monthCellRender={monthCellRender}
            />
        </CalendarStyles>
    )

}

export default FullCalendar;
