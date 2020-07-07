import React, { Component } from 'react';
import { Table, Button } from 'antd';
import LayoutContent from '@hoa/components/utility/layoutContent';
import MeetingStyle from '@hoa/assets/styles/Dashboard/MeetingStyle';
import Avatar from '@hoa/components/Avatar';
import image1 from '@hoa/assets/images/user1.png';
import image2 from '@hoa/assets/images/user3.png';
import { objectToArray } from '../../../utils/convert_data';
import { Link } from 'react-router-dom';

class DashboardPeople extends Component {
    render () {
        const { isAdmin, users, approveUser } = this.props;
        let dataSource = objectToArray(users);
        dataSource = dataSource.slice(0, 5);

        const columns = [
            {
                title: 'PHOTO',
                dataIndex: 'photo',
                key: 'photo',
                render: (image, record) => (
                        <Avatar
                            size={30}
                            userId={record.id}
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
                                    approveUser({
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
                                    approveUser({
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

        const mergedColumns = columns.map(col => {
            return {
              ...col,
              onCell: (record) => ({
                record,
                dataindex: record.id,
                title: col.title,
              }),
            };
          });

        return (  
            <MeetingStyle>
                <LayoutContent>
                    <p style={styles.title}> 
                        {'NEW PEOPLE REQUESTS'} 
                    </p>
					<div style={styles.border}/>
                    <Table 
                        components={{
                            body: {
                                cell: Row,
                            },
                        }}
                        dataSource={dataSource} 
                        columns={mergedColumns} 
                        pagination={false}
                    />
                    <Link style={styles.button} to='people/request'>
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

export default DashboardPeople;

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

class Row extends React.Component {
    render() {
        const {
            record,
            children,
            title,
            ...props 
        } = this.props;
        // if (title === 'PHOTO') {
        //     return (
        //         <td
        //             {...props}
        //             className='tiennnnnnn'
        //             style={{
        //                 borderLeftColor: '#FFCC00',
        //                 borderLeftStyle: 'solid',
        //                 borderLeftWidth: 2
        //             }}
        //         >
        //             {children}
        //         </td>
        //     );
        // }
        
        return (
            <td
                {...props}
                className='tiennnnnnn'
            >
                {children}
            </td>
        );
    }
}
  
