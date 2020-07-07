import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BookMeetingStyles  } from './BookMeeting.styles'
import CalendarView from './CalendarView'
import BookingDone from './BookingDone'
import Booking from './Booking'
import createNotification from '../Notification'
import {
    getCreateMeetingStatus,
} from 'hoa-redux/selectors/entities/meeting';

function BookMeeting() {

    const [isShowBookingDone, setIsShowBookingDone] = useState(false)

    const createStatus = useSelector(getCreateMeetingStatus)
    useEffect(() => {
        if (createStatus === 'success') {
            setIsShowBookingDone(true)
        }
        if (createStatus === 'failure') {
            createNotification('error', 'Book meeting fail', '')
        }
    }, [createStatus])

    return (
        <BookMeetingStyles className='booking-content'>
            {isShowBookingDone ?
                <BookingDone setIsShowBookingDone={setIsShowBookingDone} /> :
                null
            }
            <Booking isShowBookingDone={isShowBookingDone} />
            <CalendarView />
        </BookMeetingStyles>
    )
}

export default BookMeeting
