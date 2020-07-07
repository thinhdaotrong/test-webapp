import React, { Component } from 'react';
import { Button } from 'antd';
import LayoutContentWrapper from '@hoa/components/utility/layoutWrapper';
import LayoutContent from '@hoa/components/utility/layoutContent';
import ProfileStyle from '@hoa/assets/styles/Profile/ProfileStyle';
import Auth from '@hoa/components/Auth';
import Avatar from '@hoa/components/Avatar';
import EditProfile from './EditProfile';

class Profile extends Component {
    state = {
        isEdit: false
    }

    componentDidMount() {
        const { actions } = this.props;
        const userId = Auth.getUserId();
        actions.getUser(userId);
    }

    setIsEdit = (value) => {
        this.setState({
            isEdit: value
        })
    }

    render() {
        const { user, updated, actions } = this.props;
        const { email, first_name, last_name } = user;
        if (this.state.isEdit) {
            return (
                <EditProfile
                    user={user}
                    updated={updated}
                    actions={actions}
                    setIsEdit={this.setIsEdit}
                />
            )
        }
        return (
            <LayoutContentWrapper>
                <LayoutContent>
                    <ProfileStyle>
                        <div className="avatar">
                            <Avatar
                                userId={Auth.getUserId()}
                                size={72}
                                user={user}
                            />
                        </div>
                        <div className="detail">
                            <div style={styles.email}>
                                <p style={styles.title}> {'Full Name :'} </p>
                                <p style={styles.value}> {first_name + ' ' + last_name} </p>
                            </div>
                            <div style={styles.email}>
                                <p style={styles.title}> {'Email :'} </p>
                                <p style={styles.value}> {email} </p>
                            </div>
                        </div>
                        <div className="footer">
                            <Button 
                               style={{borderRadius: 5}}
                               onClick={() => this.setIsEdit(true)}
                               type='primary'
                            >
                                {'Edit'}
                            </Button>
                        </div>
                    </ProfileStyle>
                </LayoutContent>
            </LayoutContentWrapper>
        )
    }
}

export default Profile;

const styles = {
    email: {
        display: 'flex', 
        flexDirection: 'row', 
        marginBottom: 24
    },
    title: {
        fontSize: 14, 
        color: '#000', 
        marginRight: 30,
        width: 90,
    },
    value: {
        fontSize: 14, 
        color: 'rgba(0, 0, 0, 0.65)'
    }
}