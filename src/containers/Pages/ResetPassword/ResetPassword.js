import React, { Component } from 'react';
import SignUpStyle from '@hoa/assets/styles/signUpStyle';
import Logo from '@hoa/assets/images/logo.png';
import { Input, Button } from 'antd';
import { MailOutlined, KeyOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

class ResetPassword extends Component {
    state = {
        email: '',
        password: '',
        passwordcf: ''
    }

    changeEmail = e => {
        this.setState({
            email: e.target.value
        })
    }

    changePassword = e => {
        this.setState({
            password: e.target.value
        })
    }

    changePasswordcf = e => {
        this.setState({
            passwordcf: e.target.value
        })
    }

    render () {
        const { email, password, passwordcf } = this.state;
        return (  
            <SignUpStyle>
                <div style={styles.background}>
                    <div style={styles.top}>
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <img
                                src={Logo}
                                style={{width: 195, height: 62}}
                                alt='img'
                            />
                        </div>
                        <div style={{ marginTop: 70 }}>
                            <p style={styles.title}> {'FORGOT PASSWORD'} </p>
                            <Input
                                prefix={<MailOutlined />}
                                placeholder={'Email address'}
                                style={styles.input}
                                value={email}
                                onChange={this.changeEmail}
                            />
                            <Input.Password
                                prefix={<KeyOutlined />}
                                placeholder={'Password'}
                                style={styles.input}
                                value={password}
                                onChange={this.changePassword}
                            />
                            <Input.Password
                                prefix={<KeyOutlined />}
                                placeholder={'Confirm Password'}
                                style={styles.input}
                                value={passwordcf}
                                onChange={this.changePasswordcf}
                            />
                        </div>
                        <Button
                            shape='round'
                            style={styles.button}
                        >
                            <Link to="/reset_password_success">
                                <p> {'SET NEW PASSWORD'}</p>
                            </Link>
                        </Button>
                    </div>
                </div>
            </SignUpStyle>
        )
    }
}

export default ResetPassword;

const styles = {
    background: {
        borderRadius: 20,
        backgroundColor: '#000',
        width: 414,
        height: 616,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    top: {
        marginTop: 50,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    title: {fontSize: 16, fontWeight: 'bold', color: '#fff'},
    input: {
        fontSize: 16, 
        color: '#fff',
        marginTop: 10,
        backgroundColor: 'rgb(25, 23, 23)',
        borderRadius: 20
    },
    button: {
        width: '100%',
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        height: 42
    },
}

