import React, { Component } from 'react';
import SignUpStyle from '@hoa/assets/styles/signUpStyle';
import Logo from '@hoa/assets/images/logo2.png';
import {  Button, Form } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import createNotification from '@hoa/components/Notification';
import { LinkSignIn } from '@hoa/assets/config';

class FindOrg extends Component {
    formRef = React.createRef();
    state = {
        loading: false,
        isRegister: false
    }

    componentDidMount() {
       
    }
    
    componentDidUpdate(prevProps) {
        const { isRegister } = this.props;
        if (JSON.stringify(isRegister) !== JSON.stringify(prevProps.isRegister)) {
            
            if (isRegister.status === 'started') {
                this.setState({
                    loading: true
                })
            } else if (isRegister.status === 'success') {
                createNotification('success', 'Signup success', '');
                this.setState({
                    loading: false,
                    isRegister: true
                })
            } else if (isRegister.status === 'failure'){
                createNotification('error', 'Signup failure', 'The email is already registered');
                this.setState({
                    loading: false
                })
            }
        }
    }

    onFinish = values => {
        const { email, password, full_name } = values;
        // this.props.actions.signup({
        //     email,
        //     password,
        //     full_name
        // })
    };
    
    onFinishFailed = errorInfo => {
    };

    register = () => {
        const { infoEmail, actions } = this.props;
        const { organization } = infoEmail;
        actions.register(
            infoEmail.email,
            organization.id,
            LinkSignIn
        )
    }

    render () {
        if (this.state.isRegister) {
            return (
                <Redirect to='/signup/magic_link'/>
            )
        }

        const { infoEmail } = this.props;
        const { organization } = infoEmail

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
                        {'Step 1:  & we find your Organization'}
                    </p>
                    <p style={{fontSize: 17, color: '#000'}}>
                        {'3 steps to get you a superior office experience'}
                    </p>
                    <Form
                        ref={this.formRef}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        size={'small'}
                    >
                        <div
                            style={{
                                marginTop: 30,
                                width: '100%',
                                height: 42,
                                borderRadius: 21,
                                fontSize: 16,
                                color: '#000',
                                borderWidth: 1,
                                borderStyle: 'solid',
                                borderColor: '#707070',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems:'center'
                            }}
                        >
                            <p style={{marginBottom: 0}}> {organization ? organization.display_name : ''} </p>
                        </div>
                        {/* <Item
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
                        </Item> */}
                        {/* <Item> */}
                        <Button
                            shape='round'
                            style={styles.button}
                            loading={this.state.loading}
                            htmlType="submit"
                            onClick={this.register}
                        >
                            {'CONFIRM'}
                        </Button>
                        {/* </Item> */}
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

export default FindOrg;

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

