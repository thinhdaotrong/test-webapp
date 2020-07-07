import React, { Component } from 'react';
import SignUpStyle from '@hoa/assets/styles/signUpStyle';
import Logo from '@hoa/assets/images/logo2.png';
import { Input, Button, Form } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { Link, Redirect } from 'react-router-dom';

const { Item } = Form;
class SignIn extends Component {
    formRef = React.createRef();
    state = {
        email: '',
    }

    changeEmail = e => {
        this.setState({
            email: e.target.value
        })
    }

    render () {
        const { email } = this.state;
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
                        {'Forgot password'}
                    </p>
                    <p style={{fontSize: 20, color: '#000', textAlign: 'center', width: '60%'}}>
                        {"We've emailed a special link to johndoe@hcltechnologies.com  Click the link to confirm your address and get started."}
                    </p>
                    <Form
                        ref={this.formRef}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        size={'small'}
                        style={{marginTop: 50}}
                    >
                        <Item
                            style={{ width: '100%'}}
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
                        <Item >
                            <Button
                                shape='round'
                                style={styles.button}
                                loading={this.state.loading}
                                htmlType="submit"
                            >
                                {'SEND'}
                            </Button>
                        </Item>
                    </Form>
                    <p style={{fontSize: 14, color: '#989898', marginTop: 10, textAlign: 'center'}}>
                        {'Password reset link will send to your email address'}
                    </p>
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

export default SignIn;

const styles = {
    top: {
        width: '100%',
        marginTop: 50,
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
        marginTop: 20,
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
        marginTop: 20,
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

