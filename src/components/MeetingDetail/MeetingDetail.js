import React, { Component } from 'react';
import { Switch, Button, List } from 'antd';
import { 
    CalendarOutlined,
    EnvironmentOutlined, 
    InfoCircleFilled,
    ClockCircleFilled
} from '@ant-design/icons';
import moment from 'moment';
import Avatar from '@hoa/components/Dashboard/Avatar';
import EditMeeting from './EditMeeting';

class MeetingDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'UI UX PROJECT MEETING',
            date: new Date(),
            time: '9AM-6AM',
            space: 'Huddle',
            address: 'Building 1',
            attendees: [1,2,3,4,5,6],
            agenda: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            isEdit: false,
        }
    }

    setIsEdit = (value) => {
        this.setState({
            isEdit: value,
        })
    }

    setIsCreate = (value) => {
        this.props.setIsCreate(value)
    }

    renderInfo = () => {
        const { name, date, time, space, address } = this.state;
        return (  
            <>
                <p style={styles.name}>{name}</p>
                <div style={styles.ctn}>
                    <CalendarOutlined/>
                    <p style={{marginLeft: 5}}>{moment(date).format('DD/MM/YYYY')}</p>
                </div>
                <div style={styles.ctn}>
                    <ClockCircleFilled/>
                    <p style={{marginLeft: 5}}>{time}</p>
                </div>
                <div style={styles.ctn}>
                    <EnvironmentOutlined/>
                    <p style={{marginLeft: 5}}>{space}</p>
                </div>
                <div style={styles.ctn}>
                    <InfoCircleFilled/>
                    <p style={{marginLeft: 5}}>{address}</p>
                </div>
            </>
        )
    }

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
        const { agenda, isEdit } = this.state;
                
        if (isEdit) {
            return (
                <EditMeeting
                    setIsEdit={this.setIsEdit}
                />
            )
        }
        return (  
            <div style={{padding: 20}}>
                {this.renderInfo()}
                <p style={styles.title}>{'Attendees'}</p>
                {this.renderAttendees()} 
                <p style={styles.title}>{'Agenda'}</p>
                <p style={styles.text}>{agenda}</p>
                <div style={styles.footer}>
                    <Button
                        shape='round'
                        style={styles.button}
                        onClick={() => this.setIsEdit(true)}
                    >
                        {'EDIT'}
                    </Button>
                    <p style={styles.cancel}>
                        {'CANCEL MEETING'}
                    </p>
                </div>
            </div>
        )
    }
}

export default MeetingDetail;

const styles = {
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 30
    },
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
    }
}
