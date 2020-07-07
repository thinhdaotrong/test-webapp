import React, { Component } from 'react';
import SignUpStyle from '@hoa/assets/styles/signUpStyle';
import Logo from '@hoa/assets/images/logo2.png';
import { LoadingOutlined } from '@ant-design/icons';
import { withRouter, Redirect, Link } from 'react-router-dom';
import createNotification from '@hoa/components/Notification';
import Auth from '@hoa/components/Auth';
import { Button } from 'antd';

class Waiting extends Component {
    state = {
        loading: true,
        error: {}
    }

    componentDidMount() {
        const { location, actions } = this.props;
        const token = location.search.substr(7, location.search.length);
        Auth.logout();
        if (location.pathname === '/signin/waiting') {
            const email = '';
            const password = '';
            actions.login(
                email,
                password,
                token,
            )
        } else {
            actions.signup(
                token,
            )
        }
    }

    componentDidUpdate(prevProps) {
        const { isLogin, currentUser, isSignup, action } = this.props;
        if (JSON.stringify(isLogin) !== JSON.stringify(prevProps.isLogin)) {
            if (isLogin.status === 'success') {
                createNotification('success', 'Login success', '');
                Auth.login(currentUser);
                this.setState({
                    loading: false
                })
            } else if (isLogin.status === 'failure') {
                createNotification('error', 'Login failure', isLogin.error.message);
                this.setState({
                    loading: false
                })
            }
        }

        if (JSON.stringify(isSignup) !== JSON.stringify(prevProps.isSignup)) {
            if (isSignup.status === 'success') {
                if (action.token) {
                    createNotification('success', 'Login success', '');
                    Auth.login(currentUser);
                    this.setState({
                        loading: false
                    })
                } else {
                    createNotification(
                        'error', 
                        'Login failure', 
                        'Your account must be approved. Please contact with your org’s admin.'
                    );
                    this.setState({
                        loading: false
                    })
                }
            } else if (isSignup.status === 'failure') {
                createNotification('error', 'Login failure', isSignup.error.message);
                this.setState({
                    loading: false
                })
            }
        }

        // if (JSON.stringify(action) !== JSON.stringify(prevProps.action)) {
        //    if (action.error || !action.token) {
        //         createNotification('error', 'Login failure', action.message);
        //    } else {
        //         createNotification('success', 'Login success', '');
        //         Auth.login(currentUser);
        //         this.setState({})
        //    }
        // }
    }

    render () {
        
        if (Auth.isLoggedIn()) {
            if (Auth.getRoleName() === 'org_admin') {
                return (
                    <Redirect to='/admin/dashboard'/>
                )
            } else {
                return (
                    <Redirect to='/client/dashboard'/>
                )
            }
        }
        return (  
            <SignUpStyle>
                <div style={styles.top}>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <img
                            src={Logo}
                            style={{width: 246, height: 78}}
                            alt='img'
                        />
                    </div>
                    {
                        this.state.loading ?
                        <>
                            <p style={{fontSize: 40, color: '#000', marginTop: 50, marginBottom: 0}}>
                                {"We're login for you"}
                            </p>
                            <p style={{fontSize: 17, color: '#000'}}>
                                {"please wait..."}
                            </p>
                            <LoadingOutlined
                                style={{
                                    marginTop: 100,
                                    fontSize: 50,
                                    color: '#000'
                                }}
                            />
                        </>
                         :
                        <Link to='/signin'>
                            <Button
                                shape='round'
                                type='primary'
                                style={{
                                    marginTop: 150,
                                    width: 200,
                                    height: 35,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                {'BACK TO SIGN IN'}
                            </Button>
                        </Link>
                    }
                </div>
            </SignUpStyle>
        )
    }
}

export default withRouter(Waiting);

const styles = {
    top: {
        marginTop: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        width: '100%'
    },
}



