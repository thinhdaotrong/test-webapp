import React, { Component } from 'react';
import SignUpStyle from '@hoa/assets/styles/signUpStyle';
import Logo from '@hoa/assets/images/logo2.png';
import { Input, Button, Form } from 'antd';
import { MailOutlined, WarningOutlined } from '@ant-design/icons';
import { Link, Redirect } from 'react-router-dom';
import createNotification from '@hoa/components/Notification';
import Auth from '@hoa/components/Auth';

const { Item } = Form;
class SignUp extends Component {
    formRef = React.createRef();
    state = {
        loading: false,
    }

    componentDidUpdate(prevProps) {
        const { isChecked } = this.props;
        if (JSON.stringify(isChecked) !== JSON.stringify(prevProps.isChecked)) {
            
            if (isChecked.status === 'started') {
                this.setState({
                    loading: true
                })
            } else if (isChecked.status === 'success') {
                createNotification('success', 'Check email success', '');
                this.setState({
                    loading: false,
                })
            } else if (isChecked.status === 'failure'){
                createNotification('error', 'Check email failure');
                this.setState({
                    loading: false
                })
            }
        }
    }

    onFinish = values => {
        const { email } = values;
        this.props.actions.checkEmail(
            email,
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

        const { infoEmail } = this.props;

        if (!infoEmail.email_has_account && infoEmail.found_org) {
            return(
                <Redirect to='/signup/find_org'/>
            )
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
                    <p style={{fontSize: 40, color: '#000', marginTop: 82, marginBottom: 0}}>
                        {'Step 1: You enter your email'}
                    </p>
                    <p style={{fontSize: 17, color: '#000'}}>
                        {'3 steps to get you a superior office experience'}
                    </p>
                    {
                        infoEmail.email_has_account &&
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginTop: 50,
                                height: 35,
                                backgroundColor: '#F1F1F1',
                                borderLeftWidth: 4,
                                borderLeftStyle: 'solid',
                                borderLeftColor: '#FF0404'
                            }}
                            className='button'
                        >
                            <WarningOutlined style={{color: '#FF0404', marginLeft: 7, marginRight: 10}} />
                            <p style={{fontSize: 12, color: '#000', marginBottom: 0}}> {'The email is already registered, please login'} </p>
                        </div>
                    }
                    {
                        !infoEmail.found_org && infoEmail.email &&
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginTop: 50,
                                height: 35,
                                backgroundColor: '#F1F1F1',
                                borderLeftWidth: 4,
                                borderLeftStyle: 'solid',
                                borderLeftColor: '#FF0404'
                            }}
                            className='button'
                        >
                            <WarningOutlined style={{color: '#FF0404', marginLeft: 7, marginRight: 10}} />
                            <p style={{fontSize: 12, color: '#000', marginBottom: 0}}> {'Organization not found'} </p>
                        </div>
                    }
                    <Form
                        ref={this.formRef}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        size={'small'}
                    >
                        <Item
                            style={{ marginTop: 20, width: '100%'}}
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input
                                prefix={<MailOutlined style={{marginRight: 10}}/>}
                                placeholder={'Email address'}
                                style={styles.input}
                                type={'email'}
                            />
                        </Item>
                        <Item>
                            <Button
                                shape='round'
                                style={styles.button}
                                loading={this.state.loading}
                                htmlType="submit"
                            >
                                {'CONFIRM'}
                            </Button>
                        </Item>
                    </Form>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', marginBottom: 60}}> 
                    <p style={styles.text1}> {"ALREADY HAVE ACCOUNT ?"} </p>
                    <Link to="/signin" style={{paddingLeft: 5}}>
                        <p style={styles.text}>{'LOGIN'}</p>
                    </Link>
                </div>
            </SignUpStyle>
        )
    }
}

export default SignUp;

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
    input: {
        fontSize: 16, 
        color: '#000',
        backgroundColor: '#fff',
        borderRadius: 20
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

