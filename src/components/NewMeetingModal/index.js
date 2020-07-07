import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DatePicker, Input, Row, Col, TimePicker, Button, List, Avatar } from 'antd';
import moment from 'moment';
import {
    UserOutlined,
    PlusOutlined,
    CheckOutlined,
    ClockCircleOutlined,
    SettingOutlined,
    TeamOutlined,
    FlagOutlined,
    CalendarOutlined,
} from '@ant-design/icons';
import { MeetingModalStyles } from './NewMeetingModal.styles'
import UserRemoteSelect from '../UserRemoteSelect'
import SelectSpaceCustom from '../SelectSpaceCustom'
import {
    getAllSpaces,
} from 'hoa-redux/actions/space';
import {
    createMeeting,
} from 'hoa-redux/actions/meeting';
import {
    getCreateMeetingStatus,
    getSpacesWithBuilding
} from 'hoa-redux/selectors/entities/meeting';
import createNotification from '../Notification'
import { getSpacesIncludeImage } from '@hoa/utils/get_data'

const { RangePicker } = TimePicker;
const { TextArea } = Input;

const dateFormat = 'MMM DD, YYYY';
const timeFormat = 'HH:mm'
const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss'
const dateNow = moment()
const dateTimeNowFormatted = moment().format(dateTimeFormat)

// const MemberItem = ({ item, removed, setRemoved }) => {
//     return (
//         <List.Item actions={[<Button shape='round' /*onClick={() => setRemoved(!removed)}*/ className={removed ? 'btn-green' : 'btn-danger'}>{removed ? 'Add' : 'Remove'}</Button>]}>
//             <span>
//                 <Avatar size={27} icon={<UserOutlined />} />
//                 <span>{item.name}</span>
//             </span>
//         </List.Item>
//     )
// }

// const genExtra = () => (
//     <Button shape='round' className='btn-green btn-prefix'>Add</Button>
// );

function MeetingModal({ visible, handleCancel }) {

    const [formData, setFormData] = useState({
        title: 'ADD TITLE HERE',
        agenda: '',
        spaceId: null,
        startAt: dateTimeNowFormatted,
        endAt: dateTimeNowFormatted,
        attendees: [],
        amenities: []
    })

    // const onCancel = () => {
    //     clearInput()
    //     handleCancel()
    // }

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

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllSpaces("", "", ""))
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

    const createStatus = useSelector(getCreateMeetingStatus)
    useEffect(() => {
        if (createStatus === 'success') {
            createNotification('success', 'Book meeting success', '')
        }
        if (createStatus === 'failure') {
            createNotification('error', 'Book meeting fail', '')
        }
        handleCancel()
    }, [createStatus])

    return (
        <MeetingModalStyles
            title={<Input className='input-title' value={formData.title} name='title' onChange={onChangeText} />}
            visible={visible}
            footer={null}
            width={565}
            onCancel={handleCancel}
        >
            <Row justify='space-between' gutter={[30, 20]}>
                <Col span={12}>
                    <span className='input-prefix'>
                        <CalendarOutlined />
                        <span>Date</span>
                    </span>
                    <DatePicker onChange={onChangeDate} defaultValue={dateNow} format={dateFormat} className='input-custom' suffixIcon={null} />
                </Col>
                <Col span={12}>
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
                    <UserRemoteSelect formData={formData} setFormData={setFormData} />
                </Col>
                <Col span={24}>
                    <span className='input-prefix'>
                        <CalendarOutlined />
                        <span>Venue</span>
                    </span>
                    <SelectSpaceCustom onChangeSelect={onChangeSelect} allSpace={allSpace} />
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
                <Col span={24}>
                    <span className='input-prefix'>
                        <FlagOutlined />
                        <span>Agenda</span>
                    </span>
                    <TextArea onChange={onChangeText} name='agenda' placeholder='Add agenda...' rows={3} className='input-custom text-area' />
                </Col>
                <Button shape='round' type='primary' className='btn-modify' onClick={onSubmit}>BOOK MEETING</Button>
                <Button type='link' danger className='btn-delete' onClick={handleCancel}>Discard Meeting</Button>
            </Row>
        </MeetingModalStyles>
    )
}

export default MeetingModal
