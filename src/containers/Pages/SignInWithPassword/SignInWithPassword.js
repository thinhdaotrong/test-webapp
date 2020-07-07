import React, { Component } from 'react';
import SignUpStyle from '@hoa/assets/styles/signUpStyle';
import Logo from '@hoa/assets/images/logo2.png';
import { Input, Button, Form } from 'antd';
import { MailOutlined, KeyOutlined } from '@ant-design/icons';
import { Link, Redirect } from 'react-router-dom';
import Auth from '@hoa/components/Auth';
import createNotification from '@hoa/components/Notification';

const { Item } = Form;

class SignInWithPassword extends Component {
    state = {
        loading: false,
    }

    componentDidUpdate(prevProps) {
        const { login, currentUser } = this.props;
        if (JSON.stringify(login) !== JSON.stringify(prevProps.login)) {
            
            if (login.status === 'started') {
                this.setState({
                    loading: true
                })
            } else if (login.status === 'success') {
                createNotification('success', 'Login success', '');
                Auth.login(currentUser);
                this.setState({
                    loading: false
                })
            } else if (login.status === 'failure'){
                createNotification('error', 'Login failure', 'Email or password incorrect');
                this.setState({
                    loading: false
                })
            }
        }
    }

    onFinish = values => {
        const { email, password } = values;
        const token = '';
        this.props.actions.login(
            email,
            password,
            token
        )
    };
    
    onFinishFailed = errorInfo => {
    };

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
                        {'Ok, You like it that way!'}
                    </p>
                    <Form
                        ref={this.formRef}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        size={'small'}
                        style={{marginTop: 60}}
                    >
                        <Item
                            style={{ marginTop: 20,}}
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input
                                prefix={<MailOutlined />}
                                placeholder={'Email address'}
                                style={styles.input}
                                type={'email'}
                            />

                        </Item>
                        <Item
                            style={{ marginTop: 20,}}
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password
                                prefix={<KeyOutlined />}
                                placeholder={'Password'}
                                style={styles.input}
                            />
                        </Item>
                        <Item>
                            <Button
                                shape='round'
                                style={styles.button}
                                loading={this.state.loading}
                                htmlType="submit"
                            >
                                {'LOGIN'}
                            </Button>
                        </Item>
                    </Form>
                    <Link to='/forgot_password' style={{textAlign: 'center'}}>
                        <p style={{fontSize: 13, color: '#000', marginTop: 20}}> {'FORGOT PASSWORD ?'} </p>
                    </Link>
                </div>
                <div style={{marginBottom: 50, display: 'flex', flexDirection: 'row'}}> 
                    <p style={styles.text1}> {"DON'T HAVE ACCOUNT ?"} </p>
                    <Link to="/signup" style={{paddingLeft: 5}}>
                        <p style={styles.text}>{'SIGN UP'}</p>
                    </Link>
                </div>
            </SignUpStyle>
        )
    }
}

export default SignInWithPassword;

const styles = {
    top: {
        width: '100%',
        marginTop: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
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
    title: {fontSize: 40, color: '#000', marginTop: 82, marginBottom: 0},
    input: {
        fontSize: 16, 
        color: '#000',
        backgroundColor: '#fff',
        borderRadius: 20
    },
    buttonCtn: {
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20
    },
    button: {
        width: '100%',
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        height: 35,
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

