import React, { Component } from 'react';
import { AppstoreOutlined } from '@ant-design/icons';
import LayoutContentWrapper from '@hoa/components/utility/layoutWrapper';
import DashboardStyle from '@hoa/assets/styles/Dashboard/DashboardStyle';
import Meeting from './Meeting';
import Space from './Spaces';
import People from './People';
import CurrentMeeting from './CurrentMeeting';
import Stat from './Quick_stat';
import BookMeeting from '@hoa/components/BookMeeting';

class Dashboard extends Component {

    componentDidMount() {
        const { actions } = this.props;
        actions.getAllSpaces('', '', '');
        actions.getJoinRequests();
        // actions.getMeetings("", "", 'U');
        actions.getMeetings(1, 5, 'U');
        actions.getMeetings("", "", 'C');
    }

    render() {
        const {
            spaces,
            isAdmin,
            users,
            actions,
            getSpaces,
            getRequests,
            meetings,
            currentMeeting
        } = this.props;

        return (
            <LayoutContentWrapper>
                <DashboardStyle>
                    <div style={styles.header}>
                        <AppstoreOutlined
                            style={{ color: '#000', marginRight: 5 }}
                        />
                        <p style={{ fontSize: 13, color: '#000' }}> {'DASHBOARD'} </p>
                    </div>
                    <div className="body">
                        <div className="left">
                            {(!isAdmin && currentMeeting.length) ?
                                <CurrentMeeting meeting={currentMeeting[0]} /> :
                                <>
                                    <Meeting
                                        meetings={meetings}
                                        isAdmin={isAdmin}
                                    />
                                    <div style={{ height: 42 }} />
                                    <Space
                                        spaces={spaces}
                                        isAdmin={isAdmin}
                                        got={getSpaces}
                                    />
                                </>
                            }
                        </div>
                        <div className="right">
                            {
                                isAdmin ?
                                    <>
                                        <People
                                            users={users}
                                            isAdmin={isAdmin}
                                            approveUser={actions.approveUser}
                                            got={getRequests}
                                        />
                                        <div style={{ height: 42 }} />
                                        <Stat />
                                    </> :
                                    <BookMeeting />
                            }
                        </div>
                    </div>
                </DashboardStyle>
            </LayoutContentWrapper>
        )
    }
}

export default Dashboard;

const styles = {
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30
    }
}