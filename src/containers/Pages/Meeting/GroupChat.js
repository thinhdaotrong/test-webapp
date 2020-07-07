import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Avatar, Button, Input, Space, Modal, Tooltip } from 'antd'
import {
    PaperClipOutlined,
    UserOutlined,
    SendOutlined
} from '@ant-design/icons';
import moment from 'moment'
import { GroupChatStyles } from './Meeting.styles'
// import io from 'socket.io-client'
import Dropzone from 'react-dropzone'
import PreviewFile from '@hoa/components/PreviewFile'
import InfiniteScroll from 'react-infinite-scroller';
import { createMeetingActivity, createdMeetingActivity } from 'hoa-redux/actions/meeting';

const { confirm } = Modal
// const socket = io.connect('http://localhost:5000/hoa')
// const socket = io.connect('http://207.148.68.224:8000/hoa')


function GroupChat({ roomId }) {

    const scrollParentRef = useRef(null)
    const dispatch = useDispatch()

    const [block, setBlock] = useState({
        name: 'user' + Math.random(100).toFixed(2),
        message: '',
        files: [],
    })

    const [msgList, setMsgList] = useState([
        {
            id: 1,
            name: 'Tuan',
            message: 'yo',
            files: ['test.pdf']
        },
        {
            id: 2,
            name: 'Nam',
            message: 'hello world',
            files: ['test-2.doc', 'test-1.image']
        },
    ])
    // console.log(msgList)

    const [isShowFormEdit, setIsShowFormEdit] = useState(false)
    const [messageEdited, setMessageEdited] = useState('')
    const [responseData, setResponseData] = useState(null)

    // useEffect(() => {
    //     socket.on('my_response', (data) => {
    //         console.log(data)
    //         // console.log(JSON.parse(data))
    //         // setMsgList([...msgList, { name, message, files, time }])
    //         setResponseData(data)
    //     })
    // })
    // useEffect(() => {
    //     socket.on('my_response', (data) => {
    //         console.log(data)
    //     })
    // })

    useEffect(() => {
        if (responseData) {
            dispatch(createdMeetingActivity(responseData))
        }
    }, [responseData])

    const onChangeText = e => {
        const { value } = e.target
        setBlock({ ...block, message: value })
    }

    const onSendMessage = () => {
        const { name, message, files } = block
        dispatch(createMeetingActivity(roomId, message, files))
        // socket.emit('my_room_event', { room: roomId })
        setBlock({ message: '', name, files: [] })
    }

    const onDropFiles = files => {
        setBlock({ ...block, files })
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
                <Input value={messageEdited} onChange={onChangeMessageEdited} size='small' />
                <Button onClick={() => setIsShowFormEdit(false)} size='small' >Cancel</Button>
                <Button onClick={onSaveMessageEdited} type='primary' size='small' >Save</Button>
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

    const loadMoreMessage = () => {
        return
    }

    return (
        <GroupChatStyles hasFile={block.files.length ? true : false}>
            <div className='block-title'>ACTIVITY</div>
            <div className='message-list' ref={scrollParentRef}>
                <InfiniteScroll
                    pageStart={0}
                    hasMore={true || false}
                    isReverse={true}
                    useWindow={false}
                    getScrollParent={() => scrollParentRef.current}
                    loadMore={loadMoreMessage}
                >
                    {msgList.map(item =>
                        <div className='message-block' key={item.id}>
                            <div className='user'>
                                <span className='name'>
                                    <Avatar icon={<UserOutlined />} size={22} />
                                    {item.name}
                                </span>
                                <span className='time'>{moment(item.time).fromNow()}</span>
                            </div>
                            {isShowFormEdit ?
                                <FormEdit /> :
                                <Tooltip placement="right" title={messageActions(item.message)} overlayClassName='custom-tooltip'>
                                    <div className='message'>{item.message}</div>
                                </Tooltip>
                            }
                            <div className='files'>
                                {item.files.map((file, key) =>
                                    <Tooltip placement="right" title={fileActions} overlayClassName='custom-tooltip' key={key}>
                                        <Button icon={<PaperClipOutlined />} shape="round">
                                            {file}
                                        </Button>
                                    </Tooltip>
                                )}
                            </div>
                        </div>
                    )}
                </InfiniteScroll>
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
                <Dropzone onDrop={onDropFiles}>
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
        </GroupChatStyles>
    )
}

export default GroupChat
