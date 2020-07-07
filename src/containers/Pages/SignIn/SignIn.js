import React, { Component } from 'react';
import SignUpStyle from '@hoa/assets/styles/signUpStyle';
import Logo from '@hoa/assets/images/logo2.png';
import { Input, Button, Form } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { Link, Redirect } from 'react-router-dom';
import Auth from '@hoa/components/Auth';

const { Item } = Form;
class SignIn extends Component {
    formRef = React.createRef();
    state = {
        email: ''
    }

    onFinish = values => {
        const { email } = values;
        Auth.setEmail(email);
        this.setState({
            email
        })
    };
    
    onFinishFailed = errorInfo => {
    };

    render () {
        if (this.state.email) {
            return(
                <Redirect to='/signin/options'/>
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
                    <p style={{fontSize: 40, color: '#000', marginTop: 50, marginBottom: 0}}>
                        {'Hello there!'}
                    </p>
                    <p style={{fontSize: 17, color: '#000'}}>
                        {"Let's get productivity started"}
                    </p>
                    <Form
                        ref={this.formRef}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        size={'small'}
                        style={{marginTop: 70}}
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
                                {'LOGIN'}
                            </Button>
                        </Item>
                    </Form>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', marginBottom: 60}}> 
                    <p style={styles.text1}> {"ALREADY HAVE ACCOUNT ?"} </p>
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

