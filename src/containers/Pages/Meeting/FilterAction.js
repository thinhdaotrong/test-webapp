import React, { useState, useEffect } from 'react'
import { Row, Col, Input, Checkbox } from 'antd';
import { FilterActionsStyles } from './Meeting.styles'
import {
    SearchOutlined
} from '@ant-design/icons';

function FilterAction() {

    const [isShowCheckbox, setIsShowCheckbox] = useState(false)
    const [textFilter, setTextFilter] = useState('')

    const onChangeTextFilter = (e) => {
        const { value } = e.target
        setTextFilter(value)
    }
    useEffect(() => {
        if (textFilter) {
            setIsShowCheckbox(true)
        } else {
            setIsShowCheckbox(false)
        }
    }, [textFilter])

    const onCheckSpace = (checkedValues) => {
        console.log(checkedValues)
    }
    const onCheckMeeting = (checkedValues) => {
        console.log(checkedValues)
    }
    return (
        <FilterActionsStyles>
            <Input prefix={<SearchOutlined />} onChange={onChangeTextFilter} value={textFilter} />
            {isShowCheckbox &&
                <div>
                    <p>Spaces</p>
                    <Checkbox.Group onChange={onCheckSpace} >
                        <Row>
                            <Col span={24}>
                                <Checkbox value="A">A</Checkbox>
                            </Col>
                            <Col span={24}>
                                <Checkbox value="B">B</Checkbox>
                            </Col>
                            <Col span={24}>
                                <Checkbox value="C">C</Checkbox>
                            </Col>
                        </Row>
                    </Checkbox.Group>
                    <p>Meetings</p>
                    <Checkbox.Group onChange={onCheckMeeting}>
                        <Row>
                            <Col span={24}>
                                <Checkbox value="A">A</Checkbox>
                            </Col>
                            <Col span={24}>
                                <Checkbox value="B">B</Checkbox>
                            </Col>
                            <Col span={24}>
                                <Checkbox value="C">C</Checkbox>
                            </Col>
                        </Row>
                    </Checkbox.Group>
                </div>
            }
        </FilterActionsStyles>
    )
}

export default FilterAction
