import React, { Component } from 'react';
import { Table } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import LayoutContent from '@hoa/components/utility/layoutContent';
import MeetingStyle from '@hoa/assets/styles/Dashboard/MeetingStyle';
import Avatar from '@hoa/components/Avatar';
import moment from 'moment';
import { Link } from 'react-router-dom';

class DashboardMeeting extends Component {

    render () {
      const { meetings } = this.props;
      const dataSource = meetings.filter(item => item.status === "U").slice(0, 5);
      
        return (  
            <MeetingStyle>
              <LayoutContent>
                  <p style={styles.title}> 
                      {'UPCOMING MEETINGS'} 
                  </p>
                  <div style={styles.border}/>
                  <Table 
                    dataSource={dataSource} 
                    columns={columns} 
                    pagination={false}
                    rowKey={record => record.id}
                  />
                  <Link style={styles.button} to={'meeting'}>
                    <div className={"button"}>
                      <p style={{fontSize: 12, color: '#757575'}}>
                        {'View All'}
                      </p>
                    </div>
                  </Link>
                
                </LayoutContent>
            </MeetingStyle>
        )
    }
}

export default DashboardMeeting;

const styles = {
   title: {fontSize: 14, fontWeight: 'bold', color: '#000'},
   border: {height: 1, backgroundColor: '#DEE2E6', marginTop: 10, },
   button: {display: 'flex', justifyContent: 'center', marginTop: 15}
}
  
const columns = [
    {
      title: 'MEETING NAME',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      render: name => (
        <p style={{fontSize: 12, color: '#989898'}}>{name}</p>
      )
    },
    {
      title: 'LOCATION',
      dataIndex: 'space_name',
      key: 'space_name',
      width: '20%',
      render: space_name => (
        <p style={{fontSize: 12, color: '#989898'}}>{space_name}</p>
      )
    },
    {
      title: 'DATE & TIME',
      dataIndex: 'date',
      key: 'date',
      width: '20%',
      render: (d, record) => {
          const { end_at, start_at } = record;
          const date = moment.utc(start_at).format("MMM Do YY"); 
          const startAt = moment.utc(start_at).format('HH:MM');
          const endAt = moment.utc(end_at).format('HH:MM');
          return (
            <>
              <p style={{fontSize: 12, color: '#989898'}}>{date}</p>
              <p style={{fontSize: 12, color: '#989898'}}>{startAt + ' - ' + endAt}</p>
            </>
          )
      }
	},
	{
		title: 'PEOPLE',
		dataIndex: 'attendees',
    key: 'attendees',
    width: '20%',
    render: attendees => {
        let users = attendees;
        if (attendees.length > 3) {
          users = attendees.slice(0, 3);
        }
        return (
          <div style={{display: 'flex', flexDirection: 'row'}}>
              {
                  users.map(user => {
                    return (
                        <div style={{marginLeft: -5}} key={user.id}>
                          <Avatar
                              size={24}
                              userId={user.id}
                          />
                        </div>
                    )
                  })
              }
              {
              attendees.length > 3 &&
              <div 
                style={{
                  width: 24, 
                  height: 24, 
                  borderRadius: 12, 
                  backgroundColor: '#000', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  marginLeft: -5,
                  position: 'relative',
                  }}
                >
                  <p style={{color: '#fff', fontSize: 10}}>
                      <span> {'+'} </span>
                      <span> {attendees.length - 3} </span>
                  </p>
              </div>
              }
          </div>
        )
    }
  },
  {
    title: '',
    dataIndex: 'message',
    key: 'message',
    width: '10%',
    align: 'center',
    render: tags => (
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <MessageOutlined style={{fontSize: 20, color: '#000'}}/>
        <div className="isoIconWrapper">
          <span>{'7'}</span>
        </div>
      </div>
        ),
  },
];