import React, { Component } from 'react';
import { Button, Form, Input, Checkbox } from 'antd';
import Avatar from '@hoa/components/Avatar';
import createNotification from '@hoa/components/Notification';
import { LinkSignIn } from '@hoa/assets/config';

const { Item } = Form;

class AddUser extends Component {

    state = {
        loading: false,
        image: ''
    }

    componentDidUpdate(prevProps) {
        const { created, setIsCreate } = this.props;
            if (JSON.stringify(created) !== JSON.stringify(prevProps.created)) {
                const { status, error } = created;
                if (status === 'started') {
                    this.setState({
                        loading: true
                    })
                } else if (status === 'success') {
                    this.setState({
                        loading: false
                    }, () => {
                        setIsCreate(false)
                    })
                    createNotification('success', 'Create user success', '');
                } else if (status === 'failure') {
                    this.setState({
                        loading: false
                    })
                    createNotification('error', 'Create user failure', error ? error.message : '');
                }
            }
    }
        
    onFinish = values => {
        const { image } = this.state;
        const { first_name, last_name, email, phone, job_title } = values;
        this.props.createUser({
            first_name, 
            last_name, 
            email, 
            phone, 
            job_title,
            link: LinkSignIn
        }, image);
    };
    
    onFinishFailed = errorInfo => {
    };

    renderInfo = () => {
        const {selected} = this.props;
        return (
            <Form
                ref={this.formRef}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
                size={'large'}
            >
                <div style={styles.ctn}>
                    <Item
                        style={{width: '50%', marginRight: 12}}
                        name="first_name"
                        rules={[{ required: true, message: 'Please input your first name!' }]}
                    >
                        <Input 
                            placeholder="First name" 
                            style={styles.name1Input}
                        />
                    </Item>
                    <Item
                        name="last_name"
                        rules={[{ required: true, message: 'Please input your last name!' }]}
                    >
                        <Input 
                            placeholder="Last name" 
                            style={styles.nameInput}
                        />
                    </Item>
                </div>
                <Item
                    style={{marginTop: 5}}
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input 
                        placeholder="Email" 
                        style={styles.textInput}
                        type='email'
                    />
                </Item>
                <Item
                    style={{marginTop: 5}}
                    name="phone"
                    // rules={[{ required: true, message: 'Please input your phone!' }]}
                >
                    <Input 
                        placeholder="Phone" 
                        style={styles.textInput}
                    />
                </Item>
                <Item
                    style={{marginTop: 5}}
                    name="job_title"
                    // rules={[{ required: true, message: 'Please input your job title!' }]}
                >
                    <Input 
                        placeholder="Job title" 
                        style={styles.textInput}
                    />
                </Item>
                <Item
                    style={{marginTop: 5}}
                    name="group"
                    // rules={[{ required: true, message: 'Please input your group!' }]}
                >
                    <Input 
                        placeholder="Group" 
                        style={styles.textInput}
                    />
                </Item>
                {
                    selected === 'employee' && 
                    <Item
                        style={{marginTop: 5}}
                        name="checked"
                    >
                        <Checkbox 
                            style={styles.textInput}
                        > 
                            {'Make Admin'}
                        </Checkbox>
                        
                    </Item>
                }
                <Item style={{marginTop: 30}}>
                    <Button 
                        type="primary" 
                        htmlType="submit"
                        shape="round" 
                        style={styles.buttonUpdate}
                        loading={this.state.loading}
                    >
                        {'SAVE'}
                    </Button>
                </Item>
            </Form>
        )
    }

    setImage = (image) => {
        this.setState({
            image
        })
    }

    render () {
        return (  
            <div className="container">
                {/* <div style={styles.ctn}>
                    <Avatar
                        size={65}
                        isEdit={true}
                        setImage={this.setImage}
                    />
                </div> */}
                <div style={{marginTop: 22}} className="body-profile">
                    {this.renderInfo() }
                </div>
            </div>
        )
    }
}

export default AddUser;

const styles = {
    ctn: {display: 'flex', flexDirection: 'row', width: '100%'},

    textInput: {
        fontSize: 12,
        color: '#000',
        borderRadius: 5,
    },
    name1Input: {
        fontSize: 12,
        color: '#000',
        width: '100%',
        // marginRight: 12,
        borderRadius: 5
    },
    nameInput: {
        fontSize: 12,
        color: '#000',
        // width: '50%',
        borderRadius: 5
    },
    buttonUpdate: {
        backgroundColor: '#000',
        color: '#fff',
        width: '100%',
        fontSize: 12,
    },
}
