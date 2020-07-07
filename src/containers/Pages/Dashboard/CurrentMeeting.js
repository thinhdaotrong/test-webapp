import React, { useState, useEffect } from 'react'
import { CurrentMeetingStyle } from '@hoa/assets/styles/Dashboard/CurrentMeetingStyle';
import { Button, Avatar, Input, Tooltip, Space, Modal } from 'antd'
import Dropzone from 'react-dropzone'
import PreviewFile from '@hoa/components/PreviewFile'
import { endMeeting, expandMeeting } from 'hoa-redux/actions/meeting'
import {
    PaperClipOutlined,
    UserOutlined,
    SendOutlined
} from '@ant-design/icons';
import moment from 'moment'
import io from 'socket.io-client'

const { confirm } = Modal;

// const socket = io.connect('http://localhost:5000/hoa')
// const socket = io.connect('http://207.148.68.224:5000/hoa')

function CurrentMeeting({ meeting }) {
    const { name, space_name, schedule_start_at, schedule_end_at, attendees, agenda } = meeting
    const [block, setBlock] = useState({
        name: 'user' + Math.random(100).toFixed(2),
        message: '',
        files: [],
    })

    const [msgList, setMsgList] = useState([
        {
            name: 'Tuan',
            message: 'desktop publishing software like Aldus Pag',
            files: ['test.pdf'],
            time: moment()
        },
        {
            name: 'Nam',
            message: 't also the leap into electronic ',
            files: ['test-2.doc', 'test-1.image'],
            time: moment()
        },
    ])

    const [isShowFormEdit, setIsShowFormEdit] = useState(false)
    const [messageEdited, setMessageEdited] = useState('')

    // useEffect(() => {
    //     socket.on('message', ({ name, message, files, time }) => {
    //         setMsgList([...msgList, { name, message, files, time }])
    //     })
    // })

    const onChangeText = e => {
        const { value } = e.target
        setBlock({ ...block, message: value })
    }

    const onSendMessage = () => {
        const { name, message, files } = block
        const time = moment()
        // socket.emit('message', { name, message, files, time })
        setBlock({ message: '', name, files: [] })
    }

    const onDropFiles = files => {
        const fileNames = files.map(file => file.name)
        setBlock({ ...block, files: fileNames })
    }
    const removeFile = file => {
        const { files } = block
        setBlock({ ...block, files: files.filter(item => item !== file) })
    }

    const onEdit = (message) => {
        setIsShowFormEdit(true)
        setMessageEdited(message)
    }

    const onChangeMessageEdited = (e) => {
        const { value } = e.target
        setMessageEdited(value)
    }

    const onSaveMessageEdited = () => {
        setIsShowFormEdit(false)
    }

    function showDeleteConfirm(type) {
        confirm({
            title: `Are you sure you want to delete this ${type}? This cannot be undone.`,
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
                console.log('Oke')
                // dispatch(deleteMeeting(key))
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    const FormEdit = () => {
        return (
            <Space>
                <Input value={messageEdited} onChange={onChangeMessageEdited} />
                <Button onClick={() => setIsShowFormEdit(false)} >Cancel</Button>
                <Button onClick={onSaveMessageEdited} type='primary' >Save</Button>
            </Space>
        )
    }

    const messageActions = (message) => {
        return (
            <>
                <span onClick={() => onEdit(message)}>Edit</span>
                <span onClick={() => showDeleteConfirm('message')}>Delete</span>
            </>
        )
    }

    const fileActions = () => {
        return (
            <span onClick={() => showDeleteConfirm('file')}>Delete</span>
        )
    }
    return (
        <CurrentMeetingStyle hasFile={block.files.length ? true : false}>
            <div className='title'>
                <div className='text'>
                    <h3>{name}</h3>
                    <p>{moment.utc(schedule_start_at).format('Do MMM | h:mm A')} - {moment.utc(schedule_end_at).format('h:mm A')}</p>
                    <span>{space_name}</span>
                </div>
                <div className='actions'>
                    <Button type='primary' shape='round'>ROOM CONTROLS</Button>
                    <Button shape='round' className='btn-1' >EXTEND MEETING</Button>
                    <Button shape='round' className='btn-2'>DND</Button>
                    <Button shape='round' className='btn-3'>END MEETING</Button>
                </div>
            </div>
            <div className='content'>
                <h4>PARTICIPANTS</h4>
                <div className='members'>
                    {attendees.map(item =>
                        <span key={item.id}>
                            <Avatar size={48} icon={<UserOutlined />} />{item.first_name} {item.last_name}
                        </span>
                    )}
                </div>
                <h4>AGENDA</h4>
                <p>{agenda}</p>
                <h4>ACTIVITY</h4>
                <div className='message-list'>
                    {msgList.map((item, key) =>
                        <div className='message-block' key={key}>
                            <Avatar size={36} icon={<UserOutlined />} />
                            <div className='info'>
                                <span className='name'>{item.name}</span>
                                <span className='time'>{moment(item.time).fromNow()}</span>
                                {isShowFormEdit ?
                                    <FormEdit /> :
                                    <Tooltip placement="right" title={messageActions(item.message)} overlayClassName='custom-tooltip'>
                                        <div className='message'>{item.message}</div>
                                    </Tooltip>
                                }
                                <div className='files'>
                                    {item.files.map(file =>
                                        <Tooltip placement="right" title={fileActions} overlayClassName='custom-tooltip' key={file}>
                                            <Button icon={<PaperClipOutlined />} shape="round" size='small'>
                                                {file}
                                            </Button>
                                        </Tooltip>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className='input-message'>
                    <PreviewFile files={block.files} removeFile={removeFile} />
                    <Input
                        placeholder="Start typing ..."
                        suffix={<SendOutlined onClick={onSendMessage} />}
                        value={block.message}
                        onChange={onChangeText}
                        onPressEnter={onSendMessage}
                    />
                    <Dropzone onDrop={onDropFiles} >
                        {({ getRootProps, getInputProps }) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <Button type="primary" shape="circle" icon={<PaperClipOutlined />} />
                                </div>
                            </section>
                        )}
                    </Dropzone>
                </div>
            </div>
        </CurrentMeetingStyle>
    )
}

export default CurrentMeeting
