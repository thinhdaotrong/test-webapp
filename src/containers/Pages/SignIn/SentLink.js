import React, { Component } from 'react';
import SignUpStyle from '@hoa/assets/styles/signUpStyle';
import Logo from '@hoa/assets/images/logo2.png';
import { Input, Button, Form } from 'antd';
import { MailOutlined, WarningOutlined } from '@ant-design/icons';
import { Link, Redirect } from 'react-router-dom';
import createNotification from '@hoa/components/Notification';

const { Item } = Form;
class SentLink extends Component {
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

    onFinish = values => {
        const { email, password, full_name } = values;
        this.props.actions.signup(
            email,
            password,
            full_name
        )
    };
    
    onFinishFailed = errorInfo => {
    };

    render () {
        if (this.state.signup) {
            return (
                <Redirect to='/signin'/>
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
                        {'Dear Username!'}
                    </p>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: 70,
                            height: 35,
                            backgroundColor: '#F1F1F1',
                            borderLeftWidth: 4,
                            borderLeftStyle: 'solid',
                            borderLeftColor: '#FF0404'
                        }}
                        className='button'
                    >
                        <WarningOutlined style={{color: '#FF0404', marginLeft: 7, marginRight: 10}} />
                        <p style={{fontSize: 12, color: '#000', marginBottom: 0}}> {'We couldn’t find your email please signup'} </p>
                    </div>
                    <Form
                        ref={this.formRef}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        size={'small'}
                    >
                        <Item
                            style={{ marginTop: 50, width: '100%'}}
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
                        {/* <Item> */}
                        <Link to="/signin/magic_link">
                            <Button
                                shape='round'
                                style={styles.button}
                                loading={this.state.loading}
                                htmlType="submit"
                            >
                                {'LOGIN'}
                            </Button>
                        </Link>
                        {/* </Item> */}
                    </Form>
                    <p style={{fontSize: 16, fontStyle: 'italic', color: '#5D5D5D', marginBottom: 0, marginTop: 22}}>
                        {'Are you sure you are at right place?'}
                    </p>
                    <p style={{fontSize: 16, fontStyle: 'italic', color: '#5D5D5D'}}> 
                        {'Sign up maybe or try another email address?'} 
                    </p>
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

export default SentLink;

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

