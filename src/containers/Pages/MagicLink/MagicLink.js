import React, { Component } from 'react';
import SignUpStyle from '@hoa/assets/styles/signUpStyle';
import { Button } from 'antd';
import { Redirect, withRouter, Link } from 'react-router-dom';
import createNotification from '@hoa/components/Notification';
import Auth from '@hoa/components/Auth';
import Logo from '@hoa/assets/images/logo2.png';
import Gmail from '@hoa/assets/images/gmail.png';
import Outlook from '@hoa/assets/images/outlook.png';

class MagicLink extends Component {
    formRef = React.createRef();
    state = {
        signup: false,
        loading: false,
    }

    componentDidMount() {
        // this.formRef.current.setFieldsValue({
        //     email: '',
        //     password: '',
        //     full_name: ''
        // });
    }
    
    componentDidUpdate(prevProps) {
        const { signup } = this.props;
        if (JSON.stringify(signup) !== JSON.stringify(prevProps.signup)) {
            
            if (signup.status === 'started') {
                this.setState({
                    loading: true
                })
            } else if (signup.status === 'success') {
                createNotification('success', 'Signup success', '');
                this.setState({
                    loading: false,
                    signup: true
                })
            } else if (signup.status === 'failure'){
                createNotification('error', 'Signup failure', 'The email is already registered');
                this.setState({
                    loading: false
                })
            }
        }
    }

    render () {
        if (this.state.signup) {
            return (
                <Redirect to='/signin'/>
            )
        }
        const { location } = this.props;
       
        return (  
            <SignUpStyle>
                <div style={styles.top}>
                    <div style={styles.img}>
                        <img
                            src={Logo}
                            className='img'
                            alt='img'
                            // style={{width: 190, height: 'auto'}}
                        />
                        <div style={styles.border} className='border'/>
                        <img
                            src={Logo}
                            className='img'
                            alt='img'
                            // style={{width: 190, height: 'auto'}}
                        />
                    </div>
                    <p style={styles.step}>
                        {'Step 2: Click the Magic Link'}
                    </p>
                    <div style={{display: 'flex', marginTop: 50}}>
                        <div 
                            style={styles.gmailCtn}
                            onClick={() => {
                                window.open('https://mail.google.com/mail', '_blank');
                            }}
                        >
                            <img
                                src={Gmail}
                                style={{width: 50, height: 50}}
                                alt='img'
                            />
                            <p style={styles.title}> {'Open Gmail'} </p>
                        </div>
                        <div 
                            style={styles.outlookCtn}
                            onClick={() => {
                                window.open('https://outlook.live.com/mail', '_blank');
                            }}
                        >
                            <img
                                src={Outlook}
                                style={{width: 50, height: 50}}
                                alt='img'
                            />
                            <p style={styles.title}> {'Open Outlook'} </p>
                        </div>
                    </div>
                    <p 
                        style={{
                            fontSize: 14, 
                            color: '#000', 
                            fontStyle: 'italic',
                            marginTop: 50,
                            width: '60%',
                            textAlign: 'center'
                        }}
                    >
                        {"Open your mail client and click link from Hogar Officina to get started. We've emailed a special link to "}
                        <span 
                            style={{color: '#449AE5'}}
                        > 
                            {Auth.getEmail()} 
                        </span>
                         {" Wrong email? Please "}
                         <Link to='/signin'>
                            <span 
                                style={{color: '#449AE5', cursor: 'pointer'}}
                            >
                                    {'re-enter your address'}
                            </span>
                        </Link>
                    </p>
                    {
                        location.pathname === '/signin/magic_link' &&
                        <div style={styles.buttonCtn}>
                            <p style={{fontSize: 20, fontWeight: 'bold', color: '#000'}}> {'Or'} </p>
                            <Link to="/signin/with_password" className='button'>
                                <Button
                                    shape='round'
                                    style={styles.button}
                                    loading={this.state.loading}
                                    htmlType="submit"
                                >
                                    {'USE PASSWORD TO LOGIN'}
                                </Button>
                            </Link>
                        </div>
                    }
                </div>
                {
                    location.pathname === '/signin/magic_link' &&
                    <div style={{display: 'flex', flexDirection: 'row', marginBottom: 60}}> 
                        <p style={styles.text1}> {"ALREADY HAVE ACCOUNT ?"} </p>
                        <Link to="/signup" style={{paddingLeft: 5}}>
                            <p style={styles.text}>{'SIGN UP'}</p>
                        </Link>
                    </div>
                }
            </SignUpStyle>
        )
    }
}

export default withRouter(MagicLink);

const styles = {
    top: {
        marginTop: 60,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        width: '100%'
    },
    img: {
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    border: {
        width: 1, 
        backgroundColor: '#707070', 
        height: 50,
    },
    step: {
        fontSize: 40, 
        color: '#000', 
        marginTop: 50, 
        marginBottom: 0
    },
    gmailCtn: {
        display: 'flex', 
        alignItems: 'center', 
        cursor: 'pointer'
    },
    title: {
        fontSize: 15, 
        color: '#474747', 
        marginLeft: 6, 
        marginBottom: 0
    },
    outlookCtn: {
        display: 'flex', 
        alignItems: 'center', 
        marginLeft: 100, 
        cursor: 'pointer'
    },
    buttonCtn: {
        marginTop: 30,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    button: {
        width: '100%',
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        height: 42,
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
    }
}

