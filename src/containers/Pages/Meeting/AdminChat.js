import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Avatar, Button, Input } from 'antd'
import {
    PaperClipOutlined,
    SendOutlined,
} from '@ant-design/icons';
import {
    getMeetingsList,
} from 'hoa-redux/selectors/entities/meeting';
import moment from 'moment'
import { AdminChatStyles } from './Meeting.styles'
import io from 'socket.io-client'
import Dropzone from 'react-dropzone'
import PreviewFile from '@hoa/components/PreviewFile'

// const socket = io.connect('http://localhost:5000/hoa')
// const socket = io.connect('http://207.148.68.224:5000/hoa')


function AdminChat() {

    const [block, setBlock] = useState({
        name: 'user' + Math.random(100).toFixed(2),
        message: '',
        files: [],
        isAdmin: false
    })

    const [msgList, setMsgList] = useState([
        {
            isAdmin: false,
            name: 'user1',
            message: 'hello admin',
            time: moment(),
            files: ['test.pdf', 'test1.doc']
        },
        {
            isAdmin: true,
            name: 'Admin',
            message: `what's up man`,
            time: moment(),
            files: []

        }
    ])

    // useEffect(() => {
    //     socket.on('message-to-admin', ({ name, message, files, time, isAdmin }) => {
    //         setMsgList([...msgList, { name, message, files, time, isAdmin }])
    //     })
    // })

    const onChangeText = e => {
        const { value } = e.target
        setBlock({ ...block, message: value })
    }

    const onSendMessage = () => {
        const { name, message, files, isAdmin } = block
        const time = moment()
        if (!message.trim() && !files.length) {
            return
        }
        // socket.emit('message-to-admin', { name, message, files, time, isAdmin })
        setBlock({ message: '', name, files: [], isAdmin })
    }

    const onDropFiles = files => {
        const fileNames = files.map(file => file.name)
        setBlock({ ...block, files: fileNames })
    }

    const removeFile = file => {
        const {files} = block
        setBlock({...block, files: files.filter(item => item !== file)})
    }

    return (
        <AdminChatStyles hasFile={block.files.length ? true : false}>
            <div className='admin-chat-title'>ADMIN CHAT</div>
            <div className='message-list'>
                {msgList.map((item, key) =>
                    item.isAdmin ?
                        <div className='message-block-admin' key={key}>
                            <span className='name'>{item.name}</span>
                            {item.message && <><span className='message'>{item.message}</span><br /></>}
                            {item.files.map((file, id) =>
                                <>
                                    <div className='files' key={id}>
                                        <PaperClipOutlined />
                                        {file}
                                    </div>
                                    <br />
                                </>
                            )}
                            <div className='time'>{moment(item.time).fromNow()}</div>
                        </div> :
                        <div className='message-block-user' key={key}>
                            {item.message && <><span className='message'>{item.message}</span><br /></>}
                            {item.files.map(file =>
                                <>
                                    <div className='files'>
                                        <PaperClipOutlined />
                                        {file}
                                    </div>
                                    <br />
                                </>
                            )}
                            <div className='time'>{moment(item.time).fromNow()}</div>
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
        </AdminChatStyles >
    )
}

export default AdminChat
