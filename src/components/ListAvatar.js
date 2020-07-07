import React, { useEffect, useState } from 'react'
import { Avatar } from 'antd';
import {
    UserOutlined
} from '@ant-design/icons';
import { getUsersIncludeImage } from '@hoa/utils/get_data'

export default function ListAvatar({ list, size }) {
    let subList = list;
    if (list.length > 3) {
        subList = list.slice(0, 3)
    }
    const [data, setData] = useState([])
    useEffect(() => {
        getUsersIncludeImage(subList)
            .then(data => setData(data))
            .catch(err => console.log(err))
    }, [])
    return (
        <>
            {data.map((item, key) => (
                <Avatar
                    key={item.id}
                    size={size}
                    // src={URL.createObjectURL(item.image)}
                    icon={<UserOutlined />}
                    className={key !== 0 ? 'avatar-upon' : null}
                />
            )
            )}
            {list.length > 3 && <Avatar size={size} className='avatar-upon' style={{ color: '#fff', backgroundColor: '#000', fontSize: 12 }}>+{list.length - 3}</Avatar>}
        </>

    )
}
