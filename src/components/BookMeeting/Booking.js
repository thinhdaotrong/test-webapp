import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DatePicker, Input, Row, Col, TimePicker, Button } from 'antd';
import {
    PlusOutlined,
    CheckOutlined,
    ClockCircleOutlined,
    SettingOutlined,
    TeamOutlined,
    CalendarOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import { BookingStyles } from './BookMeeting.styles'
import UserRemoteSelect from '../UserRemoteSelect'
import SelectSpaceCustom from '../SelectSpaceCustom'
import {
    getSpacesWithBuilding
} from 'hoa-redux/selectors/entities/meeting';
import {
    createMeeting,
} from 'hoa-redux/actions/meeting';
// import {
//     getAllSpaces,
// } from 'hoa-redux/actions/space';
import {
    getAllBuildings,
} from 'hoa-redux/actions/building';
import { getSpacesIncludeImage } from '@hoa/utils/get_data'

const { RangePicker } = TimePicker;

const dateFormat = 'MMM DD, YYYY';
const timeFormat = 'HH:mm'
const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss'
const dateNow = moment()
const dateTimeNowFormatted = moment().format(dateTimeFormat)

// const genExtra = () => (
//     <Button shape='round' className='btn-green btn-prefix' size='small'>Add</Button>
// );

function Booking({ isShowBookingDone }) {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        title: 'ADD TITLE HERE',
        agenda: '',
        spaceId: null,
        startAt: dateTimeNowFormatted,
        endAt: dateTimeNowFormatted,
        attendees: [],
        amenities: []
    })

    // useEffect(() => {
    //     if (isShowBookingDone) {
    //         setFormData({
    //             title: 'ADD TITLE HERE',
    //             agenda: '',
    //             spaceId: null,
    //             startAt: dateTimeNowFormatted,
    //             endAt: dateTimeNowFormatted,
    //             attendees: [],
    //             amenities: []
    //         })
    //     }
    //     return
    // }, [isShowBookingDone])

    const onChangeText = event => {
        const { name, value } = event.target
        setFormData(prevState => ({ ...prevState, [name]: value }))
    }

    const onChangeDate = date => {
        const value = date.format(dateTimeFormat)
        setFormData(prevState => ({ ...prevState, startAt: value, endAt: value }))
    }

    const onChangeTime = time => {
        const { startAt, endAt } = formData

        const time0 = moment(time[0]).format('HH:mm:ss')
        const time1 = moment(time[1]).format('HH:mm:ss')

        const newStartAt = startAt.slice(0, startAt.indexOf(" ")) + " " + time0
        const newEndAt = endAt.slice(0, endAt.indexOf(" ")) + " " + time1

        setFormData(prevState => ({ ...prevState, startAt: newStartAt, endAt: newEndAt }))
    }

    const onChangeSelect = value => {
        setFormData(prevState => ({ ...prevState, spaceId: value }))
    }

    const onClickItem = id => {
        if (formData.amenities.indexOf(id) === -1) {
            return setFormData(prevState => ({ ...prevState, amenities: [...prevState.amenities, id] }))
        }
        return setFormData(prevState => ({ ...prevState, amenities: prevState.amenities.filter(item => item !== id) }))
    }

    const isSelectedItem = id => {
        if (formData.amenities.indexOf(id) === -1) {
            return false
        }
        return true
    }

    const onSubmit = () => {
        const { title, agenda, spaceId, startAt, endAt, attendees, amenities } = formData
        const formDataFormatted = {
            space_id: spaceId,
            name: title,
            schedule_start_at: startAt,
            schedule_end_at: endAt,
            attendees,
            amenities,
            agenda
        }
        dispatch(createMeeting(formDataFormatted))
    }
    useEffect(() => {
        // dispatch(getAllSpaces("", "", ""))
        dispatch(getAllBuildings("", "")) // ignore page, perPage
    }, [])

    const [allSpace, setAllSpace] = useState([])
    const spacesWithBuilding = useSelector(getSpacesWithBuilding)

    useEffect(() => {
        getSpacesIncludeImage(spacesWithBuilding)
            .then(data => setAllSpace(data))
            .catch(err => console.log(err))
    }, [spacesWithBuilding])

    const [spaceAmenities, setSpaceAmenities] = useState([])
    useEffect(() => {
        const space = allSpace.find(item => item.id === formData.spaceId)
        if (space) {
            setSpaceAmenities(space.amenities)
        }
        return
    }, [formData.spaceId])

    return (
        <BookingStyles blur={isShowBookingDone}>
            <div className='booking-header'>
                <Input className='input-title' value={formData.title} name='title' onChange={onChangeText} />
                {/* <div className='booking-title'>
                        <span>BOOK</span>
                    </div>
                    <div className='booking-room-type'>
                        <Button shape='round'>Conference Room</Button>
                        <Button shape='round'>Hot Desk</Button>
                        <Button shape='round'>Meeting Room</Button>
                    </div> */}
            </div>
            <div className='booking-body'>
                <Row justify='space-between' gutter={[24, 16]}>
                    <Col span={24}>
                        <span className='input-prefix'>
                            <CalendarOutlined />
                            <span>Date</span>
                        </span>
                        <DatePicker onChange={onChangeDate} defaultValue={dateNow} format={dateFormat} className='input-custom' suffixIcon={null} />
                    </Col>
                    <Col span={24}>
                        <span className='input-prefix'>
                            <ClockCircleOutlined />
                            <span>Time</span>
                        </span>
                        <RangePicker onChange={onChangeTime} defaultValue={[dateNow, dateNow]} format={timeFormat} className='input-custom range-picker-custom' suffixIcon={null} />
                    </Col>
                    <Col span={24}>
                        <span className='input-prefix'>
                            <TeamOutlined />
                            <span>Participants</span>
                        </span>
                        <UserRemoteSelect formData={formData} setFormData={setFormData} isBook />
                    </Col>
                    <Col span={24}>
                        <span className='input-prefix'>
                            <CalendarOutlined />
                            <span>Venue</span>
                        </span>
                        <SelectSpaceCustom onChangeSelect={onChangeSelect} allSpace={allSpace} isBook />
                    </Col>
                    <Col span={24}>
                        <span className='input-prefix'>
                            <SettingOutlined />
                            <span>Amenities</span>
                        </span>
                        <div className='input-block'>
                            {spaceAmenities.map(item => (
                                <Button
                                    shape='round'
                                    key={item.id}
                                    onClick={() => onClickItem(item.id)}
                                    type={isSelectedItem(item.id) ? 'primary' : 'default'}
                                >
                                    {isSelectedItem(item.id) ? <CheckOutlined /> : <PlusOutlined />}
                                    {item.name}
                                </Button>
                            ))}
                        </div>
                    </Col>
                    <Button shape='round' block className='btn-book btn-green' onClick={onSubmit}>BOOK</Button>
                </Row>
            </div>
        </BookingStyles>
    )
}

export default Booking
