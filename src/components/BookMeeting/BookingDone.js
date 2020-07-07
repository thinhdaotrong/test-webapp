import React from 'react'
import { useSelector } from 'react-redux'
import { Button, Result } from 'antd';
import { BookingDoneStyles } from './BookMeeting.styles'
import { CheckCircleTwoTone } from '@ant-design/icons';
import { getMeetingsList } from 'hoa-redux/selectors/entities/meeting';
import moment from 'moment'

function BookingDone({ setIsShowBookingDone }) {

    const createdMeeting = useSelector(getMeetingsList).slice(-1)[0]
    const { name, space_name, schedule_start_at, schedule_end_at, attendees } = createdMeeting
    return (
        <BookingDoneStyles>
            <Result
                status="success"
                icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}
                title="BOOKING DONE"
                subTitle={
                    <div>
                        <b>{name} </b>
                        <span>@ {space_name} - {moment.utc(schedule_start_at).format("ddd MMM D, YYYY HH:mm")} - {moment.utc(schedule_end_at).format("HH:mm")}</span>
                        {attendees.length ?
                            <>
                                <span> with </span>
                                {attendees.map((item, key, arr) => {
                                    if (arr.length - 1 === key) {
                                        return <span key={item.id}>{item.first_name} {item.last_name}.</span>
                                    }
                                    return <span key={item.id}>{item.first_name} {item.last_name}, </span>
                                })}
                            </>
                            : null
                        }
                    </div>
                }
                extra={[
                    <Button type="primary" key="details">
                        SEE FULL DETAILS
                    </Button>,
                    <Button type='primary' key="again" onClick={() => setIsShowBookingDone(false)}>BOOK AGAIN</Button>,
                ]}
            />
        </BookingDoneStyles>
    )
}

export default BookingDone
