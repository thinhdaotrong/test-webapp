import React, { Component } from 'react';
import { Table, Button } from 'antd';
import LayoutContentWrapper from '@hoa/components/utility/layoutWrapper';
import LayoutContent from '@hoa/components/utility/layoutContent';
import MeetingStyle from '@hoa/assets/styles/Dashboard/MeetingStyle';
import Avatar from '@hoa/components/Avatar';
import { objectToArray } from '../../../utils/convert_data';

class PeopleRequest extends Component {
    state = {
        loading: false
    }

    componentDidMount() {
        this.props.actions.getJoinRequests();
    }

    componentDidUpdate(prevProps) {
		const { got } = this.props;
		if (JSON.stringify(got) !== JSON.stringify(prevProps.got)) {
			const { status } = got;
			if (status === 'started') {
				this.setState({
					loading: true
				})
			} else  {
				this.setState({
					loading: false
				})
			} 
		}
      }
      
    render () {
        const { users, actions } = this.props;
        const dataSource = objectToArray(users);

        const columns = [
            {
                title: 'PHOTO',
                dataIndex: 'photo',
                key: 'photo',
                render: image => (
                        <Avatar
                            image={''}
                            size={30}
                        />
                )
        
            },
            {
              title: 'NAME',
              dataIndex: 'full_name',
              key: 'name',
              render: (a, record) => (
                <p style={{fontSize: 12, color: '#989898'}}>{record.first_name + ' ' + record.last_name}</p>
              )
            },
            {
              title: 'EMAIL',
              dataIndex: 'email',
              key: 'email',
              render: location => (
                <p style={{fontSize: 12, color: '#989898'}}>{location}</p>
              )
            },
            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                align: 'right',
                render: (a, record) => {
                    const { approved } = record;
        
                    return (
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <Button 
                                disabled={approved}
                                style={styles.buttonApprove}
                                onClick={() => {
                                    actions.approveUser({
                                        approved: true
                                    }, record.id)
                                }}
                            >
                                 {'Approve'}
                            </Button>
                            <Button
                                disabled={!approved}
                                style={styles.buttonDeny}
                                onClick={() => {
                                    actions.approveUser({
                                        approved: false
                                    }, record.id)
                                }}
                            >
                                 {'Deny'} 
                            </Button>
                        </div>
                    )
                }
            },
        ];

        return (  
            <MeetingStyle>
                <LayoutContentWrapper>
                    <LayoutContent>
                        <p style={styles.title}> 
                            {'NEW PEOPLE REQUESTS'} 
                        </p>
                        <div style={styles.border}/>
                        <Table 
                            dataSource={dataSource} 
                            columns={columns} 
                            pagination={{position: ['bottomCenter']}}
                            loading={this.state.loading}
                        />
                    </LayoutContent>

                </LayoutContentWrapper>
            </MeetingStyle>
        )
    }
}

export default PeopleRequest;

const styles = {
    title: {fontSize: 14, fontWeight: 'bold', color: '#000'},
    border: {height: 1, backgroundColor: '#DEE2E6', marginTop: 10, },
    button: {display: 'flex', justifyContent: 'center', marginTop: 15},
    buttonApprove: {
        width: 60, 
        height: 20, 
        backgroundColor: '#CFF6E9', 
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 13,
        fontSize: 9, color: '#16C28A',
        border: 'none'
    },
    buttonDeny: {
        width: 53, 
        height: 20, 
        backgroundColor: '#FFE7BE', 
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 9, color: '#FFAB1E',
        border: 'none'
    }
}
  
  