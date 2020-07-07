import React, { Component } from 'react';
import SignUpStyle from '@hoa/assets/styles/signUpStyle';
import Logo from '@hoa/assets/images/logo2.png';
import { Button } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import createNotification from '@hoa/components/Notification';
// import { LinkSignIn } from '@hoa/assets/config';
import Auth from '@hoa/components/Auth';

class OptionsSignIn extends Component {
    state = {
        loading: false,
        isSent: false,
    }

    componentDidUpdate(prevProps) {
        const { sent, statusSend } = this.props;
        if (JSON.stringify(sent) != JSON.stringify(prevProps.sent)) {
            if (sent.status === 'started') {
                this.setState({
                    loading: true
                })
            } else if (sent.status === 'success') {
                if (statusSend.success) {
                    createNotification('success', 'Send magic link success', '');
                    this.setState({
                        loading: false,
                        isSent: true
                    })
                } else if (statusSend.status === 'failure'){
                    createNotification('error', 'Send magic link failure', statusSend.message);
                    this.setState({
                        loading: false
                    })
                }
            } else if (sent.status === 'failure'){
                createNotification('error', 'Send magic link failure', '');
                this.setState({
                    loading: false
                })
            }
        }
    }
    sendMagicLink = () => {
        const { actions } = this.props;
        const email = Auth.getEmail();
        actions.sendMagicLink(
            email,
            // LinkSignIn
        )
    }

    render () {
        if (this.state.isSent) {
            return (
                <Redirect
                    to='/signin/magic_link'
                />
            )
        }
        return (  
            <SignUpStyle>
                {/* <div style={styles.background}> */}
                    <div style={styles.top}>
                        <div style={styles.img}>
                            <img
                                src={Logo}
                                className='img'
                                alt='img'
                            />
                            <div style={styles.border} className='border'/>
                            <img
                                src={Logo}
                                className='img'
                                alt='img'
                            />
                        </div>
                        <p style={styles.title}>
                            {'Welcome back!'}
                        </p>
                        <p style={{fontSize: 17, color: '#000', marginBottom: 100}}>
                            {"Now let's make sure we get you to the right place"}
                        </p>
                        <Button
                            shape='round'
                            style={styles.button}
                            className='button'
                            onClick={this.sendMagicLink}
                            loading={this.state.loading}
                        >
                           {'SEND ME A MAGIC LINK'}
                        </Button>
                        <Button
                            shape='round'
                            style={styles.button}
                            className='button'
                        >
                                        <Link to="/signin/with_password">
                                {'USE PASSWORD TO LOGIN'}
                            </Link>
                        </Button>
                    </div>
                    <div style={styles.footer}> 
                        <p style={styles.text1}> {"DON'T HAVE ACCOUNT ?"} </p>
                        <Link to="/signup" style={{paddingLeft: 5}}>
                            <p style={styles.text}>{'SIGN UP'}</p>
                        </Link>
                    </div>
                {/* </div> */}
            </SignUpStyle>
        )
    }
}

export default OptionsSignIn;

const styles = {
    background: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    top: {
        width: '100%',
        marginTop: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    img: {display: 'flex', justifyContent: 'center', alignItems: 'center'},
    border: {
        width: 1, 
        backgroundColor: '#707070', 
        height: 50,
    },
    title: {fontSize: 40, color: '#000', marginTop: 82, marginBottom: 0},
    button: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        heigth: 42,
        backgroundColor: '#000'
    },
    text1: {
        fontSize: 13,
        color: '#000',
    },
    text: {
        fontSize: 13,
        color: '#000',
        fontWeight: 'bold'
    },
    footer: {marginBottom: 50, display: 'flex',}
}

