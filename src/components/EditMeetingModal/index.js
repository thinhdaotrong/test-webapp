import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, DatePicker, Input, Row, Col, TimePicker, Select, Button, List, Avatar } from 'antd';
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
import { EditMeetingModalStyles } from './EditMeetingModal.styles'
import { deleteMeeting, editMeeting } from 'hoa-redux/actions/meeting'
import {
    getDeleteMeetingStatus,
    getEditMeetingStatus,
    getSpacesWithBuilding
} from 'hoa-redux/selectors/entities/meeting';
import createNotification from '../Notification'
import UserRemoteSelect from '../UserRemoteSelect'
import SelectSpaceCustom from '../SelectSpaceCustom'
import { getSpacesIncludeImage } from '@hoa/utils/get_data'

const { RangePicker } = TimePicker;
const { TextArea } = Input;
const { confirm } = Modal;

const dateFormat = 'MMM DD, YYYY';
const timeFormat = 'HH:mm'
const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss'
const dateTimeFormatted = date => moment.utc(date).format(dateTimeFormat)

// const genExtra = () => (
//     <Button shape='round' className='btn-green btn-prefix'>Add</Button>
// );

function EditMeetingModal({ visible, handleCancel, dataMeeting, setIsShowDetail }) {
    const { key, attendees  } = dataMeeting
    const [formData, setFormData] = useState({})
    const [participants, setParticipants] = useState(attendees)
    const selectUserRef = useRef()

    const onCancel = () => {
        handleCancel()
        if (selectUserRef.current) {
            selectUserRef.current.clearUserSelectedIds()
        }
    }

    useEffect(() => {
        const { name, time, attendees, agenda, amenities, space_id } = dataMeeting
        setFormData({
            title: name,
            agenda,
            spaceId: space_id,
            startAt: dateTimeFormatted(time[0]),
            endAt: dateTimeFormatted(time[1]),
            attendees: attendees.map(item => item.id),
            amenities: amenities.map(item => item.id)
        })
        setParticipants(attendees)
    }, [dataMeeting])

    const dispatch = useDispatch()

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
        const { key } = dataMeeting
        const formDataFormatted = {
            space_id: spaceId,
            name: title,
            schedule_start_at: startAt,
            schedule_end_at: endAt,
            attendees,
            amenities,
            agenda
        }
        dispatch(editMeeting(key, formDataFormatted))
    }

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

    const deleteStatus = useSelector(getDeleteMeetingStatus)
    const editStatus = useSelector(getEditMeetingStatus)

    useEffect(() => {
        if (deleteStatus === 'success') {
            createNotification('success', 'Delete meeting success', '')
            setIsShowDetail(false)
        }
        if (deleteStatus === 'failure') {
            createNotification('error', 'Delete meeting fail', '')
        }
        if (editStatus === 'success') {
            createNotification('success', 'Edit meeting success', '')
        }
        if (editStatus === 'failure') {
            createNotification('error', 'Edit meeting fail', '')
        }
        onCancel()
    }, [deleteStatus, editStatus])

    function showDeleteConfirm() {
        confirm({
            title: `Are You Sure Want To Delete The ${formData.title} ?`,
            // icon: <ExclamationCircleOutlined />,
            okText: 'YES',
            okButtonProps: {
                type: 'primary',
                shape: 'round'
            },
            cancelButtonProps: {
                type: 'link',
                danger: true
            },
            cancelText: 'NO',
            className: 'modal-confirm-delete-wrapper',
            onOk() {
                dispatch(deleteMeeting(key))
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    const MemberItem = ({ item }) => {
        return (
            <List.Item actions={[<Button shape='round' onClick={() => removeMember(item.id)} className='btn-danger'>Remove</Button>]}>
                <span>
                    <Avatar size={27} icon={<UserOutlined />} />
                    <span>{item.first_name} {item.last_name}</span>
                </span>
            </List.Item>
        )
    }

    const removeMember = id => {
        setFormData(prevState => ({ ...prevState, attendees: prevState.attendees.filter(item => item !== id) }))
        setParticipants(prevState => prevState.filter(item => item.id !== id))
    }


    return (
        <EditMeetingModalStyles
            title={<Input className='input-title' value={formData.title} onChange={onChangeText} name='title' />}
            visible={visible}
            footer={null}
            width={565}
            onCancel={onCancel}
        >
            <Row justify='space-between' gutter={[30, 20]}>
                <Col span={12}>
                    <span className='input-prefix'>
                        <CalendarOutlined />
                        <span>Date</span>
                    </span>
                    <DatePicker onChange={onChangeDate} value={moment.utc(formData.startAt)} format={dateFormat} className='input-custom' suffixIcon={null} />
                </Col>
                <Col span={12}>
                    <span className='input-prefix'>
                        <ClockCircleOutlined />
                        <span>Time</span>
                    </span>
                    <RangePicker onChange={onChangeTime} value={[moment.utc(formData.startAt), moment.utc(formData.endAt)]} format={timeFormat} className='input-custom range-picker-custom' suffixIcon={null} />
                </Col>
                <Col span={24}>
                    <span className='input-prefix'>
                        <TeamOutlined />
                        <span>Participants</span>
                    </span>
                    {/* <Collapse className='collapse-custom'> */}
                    {/* <Panel showArrow={false} extra={genExtra()}> */}
                    <UserRemoteSelect
                        ref={selectUserRef}
                        participants={participants}
                        setFormData={setFormData}
                        isEdit={participants.length ? true : false}
                    />
                    {participants.length > 0 &&
                        <div className='members-list'>
                            <List
                                dataSource={participants}
                                renderItem={item => <MemberItem item={item} />}
                            />
                        </div>
                    }
                    {/* </Panel> */}
                    {/* </Collapse> */}
                </Col>
                <Col span={24}>
                    <span className='input-prefix'>
                        <CalendarOutlined />
                        <span>Venue</span>
                    </span>
                    <SelectSpaceCustom onChangeSelect={onChangeSelect} allSpace={allSpace}  />
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
                    <TextArea onChange={onChangeText} name='agenda' value={formData.agenda} rows={6} className='input-custom text-area' />
                </Col>
                <Button shape='round' type='primary' className='btn-modify' onClick={onSubmit}>EDIT MEETING</Button>
                <Button type='link' danger className='btn-delete' onClick={showDeleteConfirm}>Delete Meeting</Button>
            </Row>
        </EditMeetingModalStyles>
    )
}

export default EditMeetingModal
