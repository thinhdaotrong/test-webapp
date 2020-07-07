import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    UserOutlined,
} from '@ant-design/icons';
import { Select, Avatar } from 'antd';
import { UserRemoteSelectStyles } from './UserRemoteSelect.styles'
import {
    searchUser,
} from 'hoa-redux/actions/meeting';
import {
    getSearchUserData
} from 'hoa-redux/selectors/entities/meeting';
import { getUsersIncludeImage } from '@hoa/utils/get_data'

const { Option } = Select;

function UserRemoteSelect({ setFormData, isEdit, participants, isBook }, ref) {

    const participantIds = participants ? participants.map(item => item.id) : []
    const dispatch = useDispatch()
    const [userSelectedIds, setUserSelectedIds] = useState([])
    const [formSearch, setFormSearch] = useState({
        name: '',
        exclusive_ids: [...new Set([...participantIds, ...userSelectedIds])]
    })
    // console.log(userSelectedIds)

    useImperativeHandle(ref, () => ({
        clearUserSelectedIds() {
            setUserSelectedIds([])
        }
    }));

    useEffect(() => {
        setFormSearch({
            name: '',
            exclusive_ids: [...new Set([...participantIds, ...userSelectedIds])]
        })
    }, [participants])
    // console.log(formSearch)

    useEffect(() => {
        setFormData(prevState => ({ ...prevState, attendees: formSearch.exclusive_ids }))
        dispatch(searchUser("", "", formSearch)) // ignore page, per_page
    }, [formSearch])


    const searchData = useSelector(getSearchUserData)
    const [data, setData] = useState([])
    useEffect(() => {
        getUsersIncludeImage(searchData)
            .then(data => setData(data))
            .catch(err => console.log(err))
    }, [searchData])

    const handleChange = val => {
        setUserSelectedIds(val)
        setFormSearch(prevState => ({ ...prevState, exclusive_ids: [...new Set([...participantIds, ...val])] }))
    };

    return (
        <UserRemoteSelectStyles isEdit={isEdit} isBook={isBook}>
            <Select
                mode="multiple"
                // labelInValue
                value={userSelectedIds}
                optionLabelProp="label"
                optionFilterProp="label"
                placeholder="Search users"
                onChange={handleChange}
                style={{ width: '100%' }}
                // dropdownClassName="search-users-dropdown"
                // ref={ref}
            >
                {data.map(user => (
                    <Option key={user.id} value={user.id} label={`${user.first_name} ${user.last_name}`} >
                        <Avatar src={URL.createObjectURL(user.image)} size={27} style={{ marginRight: 12 }} /> {user.first_name} {user.last_name}
                    </Option>
                ))}
            </Select>
        </UserRemoteSelectStyles>
    );
}

UserRemoteSelect = forwardRef(UserRemoteSelect)
export default UserRemoteSelect