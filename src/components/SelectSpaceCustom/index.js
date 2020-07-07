import React from 'react'
import { Select } from 'antd';
import {
    TeamOutlined,
    AudioOutlined,
    EditOutlined,
    WifiOutlined,
    FireOutlined
} from '@ant-design/icons';
import { SelectSpaceCustomStyles, DropdownStyles } from './SelectSpaceCustom.styles'
import SpacePreview from '@hoa/assets/images/space-preview.png'

const { Option } = Select;

const OptionContent = ({ item }) => {
    const { name, space_image, capacity, building_name, floor } = item
    return (
        <div className='select-item-content'>
            <div className='space-info'>
                <strong>{name}</strong>
                <p>
                    <span style={{ color: '#000' }}>{capacity}</span>
                    <TeamOutlined />
                    <span>{building_name}, {floor}th Floor</span>
                </p>
                <p>
                    <AudioOutlined />
                    <EditOutlined />
                    <WifiOutlined />
                    <FireOutlined />
                </p>
                <p>Available for <b>45 Minutes</b></p>

            </div>
            <img src={space_image && space_image.type.indexOf('image') !== -1 ? URL.createObjectURL(space_image) : SpacePreview} className='space-preview' />
        </div>
    )
}

function SelectSpaceCustom({ onChangeSelect, allSpace, isBook }) {
    return (
        <SelectSpaceCustomStyles isBook={isBook}>
            <Select
                className='select-custom'
                dropdownRender={menu => (
                    <DropdownStyles isBook={isBook}>
                        {menu}
                    </DropdownStyles>
                )}
                onChange={onChangeSelect}
            >
                {allSpace.map(item => (
                    <Option value={item.id} title={item.name} key={item.id}>
                        <OptionContent item={item} />
                    </Option>
                ))}
            </Select>
        </SelectSpaceCustomStyles>
    )
}

export default SelectSpaceCustom
