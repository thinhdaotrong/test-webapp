import React, { Component } from 'react';
import { Form, Button, List, Input } from 'antd';
import { 
    CalendarOutlined,
    EnvironmentOutlined, 
    InfoCircleFilled,
    ClockCircleFilled
} from '@ant-design/icons';
import moment from 'moment';
import Avatar from '@hoa/components/Dashboard/Avatar';

const { Item } = Form;

class EditMeeting extends Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.state = {
            attendees: [1,2,3,4,5,6],
        }
    }

    componentDidMount() {
        this.formRef.current.setFieldsValue({
            name: 'UI UX PROJECT MEETING',
            date: moment(new Date()).format('DD/MM/YYYY'),
            time: '9AM-6AM',
            space: 'Huddle',
            address: 'Building 1',
            agenda: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        })
    }

    onFinish = values => {
        // this.props.setIsEdit(false)
    };
    
    onFinishFailed = errorInfo => {
    };

    renderItem = () => {
        return (
            <div style={{display: 'flex', marginTop: 5, alignItems: 'center'}}>
                <Avatar
                    size={27}
                />
                <p style={{fontSize: 10, color: '#989898', marginLeft: 3}}>{'John Doe'}</p>
            </div>
        )
    }

    renderAttendees = () => {
        const {attendees} = this.state;
        const mid = attendees % 2 === 0 ? attendees.length/2 - 1 : attendees.length/2
        const list1 = attendees.slice(0, mid);
        const list2 = attendees.slice(mid+1, attendees.length);
        return (
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 30}}>
                <List
                    dataSource={list1}
                    renderItem={this.renderItem}
                />
                <List
                    dataSource={list2}
                    renderItem={this.renderItem}
                />
            </div>
        )
    }

    render () {
        const { setIsEdit } = this.props;
        return (  
            <Form
                ref={this.formRef}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
                size={'large'}
                style={{padding: 20}}
            >
                <Item
                    style={{width: '100%', marginBottom: 30}}
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input
                        placeholder='Name'
                        style={styles.input}
                    /> 
                </Item>
                <div style={styles.ctn}>
                    <CalendarOutlined/>
                    <Item
                        style={{marginLeft: 5}}
                        name="date"
                        rules={[{ required: true, message: 'Please input date!' }]}
                    >
                        <Input
                            placeholder={'Date'}
                            style={styles.input}
                        />

                    </Item>
                </div>
                <div style={styles.ctn}>
                    <ClockCircleFilled/>
                    <Item
                        style={{marginLeft: 5}}
                        name="time"
                        rules={[{ required: true, message: 'Please input time!' }]}
                    >
                        <Input
                            placeholder={'Time'}
                            style={styles.input}
                        />

                    </Item>
                </div>
                <div style={styles.ctn}>
                    <EnvironmentOutlined/>
                    <Item
                        style={{marginLeft: 5}}
                        name="space"
                        rules={[{ required: true, message: 'Please input space!' }]}
                    >
                        <Input
                            placeholder={'Space'}
                            style={styles.input}
                        />

                    </Item>
                </div>
                <div style={styles.ctn}>
                    <InfoCircleFilled/>
                    <Item
                        style={{marginLeft: 5}}
                        name="address"
                        rules={[{ required: true, message: 'Please input address!' }]}
                    >
                        <Input
                            placeholder={'Address'}
                            style={styles.input}
                        />

                    </Item>
                </div>
                <p style={styles.title}>{'Agenda'}</p>
                <Item
                    style={{marginLeft: 5}}
                    name="agenda"
                    rules={[{ required: true, message: 'Please input address!' }]}
                >
                    <Input.TextArea
                        placeholder={'Agenda'}
                        style={styles.input}
                    />

                </Item>
                <div style={styles.footer}>
                    <Item>
                        <Button
                            htmlType="submit"
                            shape='round'
                            style={styles.button}
                            onClick={() => setIsEdit(false)}
                        >
                            {'UPDATE'}
                        </Button>
                    </Item>
                    <p style={styles.cancel}>
                        {'CANCEL MEETING'}
                    </p>
                </div>
            </Form>
            
        )
    }
}

export default EditMeeting;

const styles = {
    ctn: {
        display: 'flex',
        alignItems: 'center',
        fontSize: 12,
        color: '#505050',
        marginBottom: 15
    },
    title: {fontSize: 11, color: '#505050', marginBottom: 5, fontWeight: 'bold'},
    text: {
        fontSize: 12,
        color: '#989898'
    },
    footer: {
        marginTop: 30,
        textAlign: 'center'
    },
    button: {
        color: '#fff',
        backgroundColor: '#000',
        width: '100%'
    },
    cancel: {
        marginTop: 20,
        color: '#EB3636',
        fontSize: 9,
        fontWeight: 'bold',
        cursor: 'pointer'
    },
    input: {
        borderRadius: 5,
        fontSize: 12,
        color: '#989898',
    }
}
