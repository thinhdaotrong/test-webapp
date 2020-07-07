import React, { useState } from 'react'
import { Button, Popover } from 'antd';
import FilterAction from './FilterAction'
import { SettingActionsStyles, OperationsStyles } from './Meeting.styles'
import {
    BarChartOutlined,
    SettingFilled,
    FilterFilled,
} from '@ant-design/icons';

function Operations({ showModal2, setIsShowDetail, isShowDetail, isAdmin }) {

    const [visibleSetting, setVisibleSetting] = useState(false)
    const [visibleFilter, setVisibleFilter] = useState(false)

    const onChangeVisibleSetting = visible => {
        setVisibleSetting(visible)
    }
    const onChangeVisibleFilter = visible => {
        setVisibleFilter(visible)
    }
    const onAddNew = () => {
        setVisibleSetting(false)
        showModal2()
    }

    const contentOperations = () => {
        if (visibleFilter) {
            return <FilterAction />
        }
        if (visibleSetting) {
            return (
                <SettingActionsStyles>
                    <p onClick={onAddNew}>Add new meeting</p>
                    <p>Download meeting list</p>
                    <p>Cancel Meeting</p>
                </SettingActionsStyles>
            )
        }
        return null
    }

    const OperationsAdmin = () => {
        return (
            <OperationsStyles>
                <Popover
                    arrowPointAtCenter
                    content={contentOperations}
                    onVisibleChange={onChangeVisibleFilter}
                    placement="bottomRight"
                    trigger="click"
                    visible={visibleFilter}
                    overlayClassName='popover-filter'
                >
                    <FilterFilled />
                </Popover>
                <BarChartOutlined onClick={() => setIsShowDetail(!isShowDetail)} />
                <Popover
                    arrowPointAtCenter
                    content={contentOperations}
                    onVisibleChange={onChangeVisibleSetting}
                    placement="bottomRight"
                    trigger="click"
                    visible={visibleSetting}
                >
                    <SettingFilled />
                </Popover>
            </OperationsStyles>
        )
    }

    const operations = isAdmin ?
        <OperationsAdmin />
        :
        <Button onClick={showModal2} shape='round' className='btn-new-meeting'>
            NEW MEETING
        </Button>
    return (
        <>
            {operations}
        </>
    )
}

export default Operations
