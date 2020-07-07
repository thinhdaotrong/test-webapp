import React, { Component } from 'react';
import { UserOutlined, CalendarOutlined, EnvironmentOutlined, DesktopOutlined} from '@ant-design/icons';
import LayoutContent from '@hoa/components/utility/layoutContent';
import MeetingStyle from '@hoa/assets/styles/Dashboard/MeetingStyle';

class DashboardStat extends Component {

    renderItem = (icon, title1,  title2, title3, number1, number2, number3) => {
        return (
            <div style={styles.body}>
                <div style={styles.left}>
                    <div style={styles.iconCtn}>
                        {icon}
                    </div>
                    <div>
                        <p style={styles.text}>{title1}</p>
                        <p style={styles.text}>{title2}</p>
                        <p style={styles.text}>{title3}</p>
                    </div>
                </div>
                <div>
                    <p style={styles.number}>{number1}</p>
                    <p style={styles.number}>{number2}</p>
                    <p style={styles.number}>{number3}</p>
                </div>
            </div>
        )
    }

    render () {
        const data = [1, 2, 3, 4]
        return (  
            <MeetingStyle>
                <LayoutContent>
                    <p style={styles.title}> 
                        {'QUICK STATS'} 
                    </p>
                    <div style={styles.border}/>
                    {this.renderItem(<UserOutlined style={styles.icon}/>, 'Total Employees', 'No. of Current visitors', '', 250, 5)}

                    <div style={styles.border}/>
                    {this.renderItem(<CalendarOutlined style={styles.icon}/>, 'Upcoming meetings', 'Current meetings', '', 50, 5)}

                    <div style={styles.border}/>
                    {this.renderItem(<EnvironmentOutlined style={styles.icon}/>, 'Spaces', 'Conference rooms', 'Offices', 250, 305, 1005)}

                    <div style={styles.border}/>
                    {this.renderItem(<DesktopOutlined style={styles.icon}/>, 'No of Devices', 'Active Devices', '', 250, 5)}

                </LayoutContent>
            </MeetingStyle>
        )
    }
}

export default DashboardStat;

const styles = {
    title: {fontSize: 14, fontWeight: 'bold', color: '#000'},
    border: {
        height: 1, 
        backgroundColor: '#DEE2E6', 
        marginTop: 10, 
        marginBottom: 15
    },
    body: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 61,
    },
    iconCtn: {
        width: 46, 
        height: 46, 
        backgroundColor: '#000', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginRight: 23
    },
    icon: {
        color: '#fff',
        fontSize: 20
    },
    left: {
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center'
    },
    text: {
        fontSize: 12,
        color: '#989898'
    },
    number: {
        fontSize: 14,
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'right'
    }
}
