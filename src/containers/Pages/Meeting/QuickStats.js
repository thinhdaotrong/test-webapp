import React, {useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import {
    TeamOutlined,
} from '@ant-design/icons';
import {
    getMeetingsList,
} from 'hoa-redux/selectors/entities/meeting';
import currentWeek from '@hoa/components/currentWeek'
import moment from 'moment'
import { QuickStatsStyles } from './Meeting.styles'

function QuickStats() {

    const Item = ({name, value}) => {
        return (
            <li>
                <span className='name'>
                    <TeamOutlined />
                    <span className='text'>{name}</span>
                </span>
                <span className='value'>{value}</span>
            </li>
        )
    }
    const meetingsList = useSelector(getMeetingsList)

    const [totalMeetings, setTotalMeetings] = useState(0)
    const [numUpcoming, setNumUpcoming] = useState(0)
    const [numCurrent, setNumCurrent] = useState(0)
    const [numMeetingsThisWeek, setNumMeetingsThisWeek] = useState(0)

    const filterMeetingsThisWeek = date => {
        const day = moment(date).format('YYYY-MM-DD')
        if (currentWeek.find(item =>  item === day)) {
            return true
        }
        return false
    }

    useEffect(() => {
        setTotalMeetings(meetingsList.length)
        setNumUpcoming(meetingsList.filter(item => item.status === "U").length)
        setNumCurrent(meetingsList.filter(item => item.status === "C").length)
        setNumMeetingsThisWeek(meetingsList.filter(item => filterMeetingsThisWeek(item.schedule_start_at)).length)
    }, [meetingsList])

    return (
        <QuickStatsStyles>
            <div className='quick-stats block'>
                <div className='quick-stats-header'>
                    <span>QUICK STATS</span>
                </div>
                <div className='quick-stats-content'>
                    <ul>
                        <Item name='Current Meetings' value={numCurrent} />
                        <Item name='Upcoming Meetings' value={numUpcoming} />
                        <Item name='Meetings This Week' value={numMeetingsThisWeek} />
                        <Item name='Total Meeting' value={totalMeetings} />
                    </ul>
                </div>
            </div>
        </QuickStatsStyles>
    )
}

export default QuickStats
