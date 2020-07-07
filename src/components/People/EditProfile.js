import React, { Component } from 'react';
import { Button, Input, Checkbox, Form } from 'antd';
import createNotification from '@hoa/components/Notification';

const { Item } = Form;

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        const { role_name } = props.record;
        this.state = {
            checked: role_name === 'org_admin' ? true : false,
            loading: false
        }
    }

    componentDidMount() {
        const { first_name, last_name, email, phone, job_title, role_id } = this.props.record;
        this.formRef.current.setFieldsValue({
            first_name,
            last_name,
            email,
            phone,
            job_title,
            group: 'Business developmen',
            checked: parseInt(role_id) === 2 ? true : false,
        });
    }

    componentDidUpdate(prevProps) {
        const { updated, setIsEdit } = this.props;
        if (JSON.stringify(updated) !== JSON.stringify(prevProps.updated)) {
            const { status, error } = updated;
            if (status === 'started') {
                this.setState({
                    loading: true
                })
            } else if (status === 'success') {
                this.setState({
                    loading: false
                }, () => {
                    setIsEdit(false)
                })
                createNotification('success', 'Update user success', '');
            } else if (status === 'failure'){
                this.setState({
                    loading: false
                })
                createNotification('error', 'Update user failure', error ? error.message: '');
            }
        }
    }
    onFinish = values => {
        const { first_name, last_name, phone, job_title } = values
        this.setState({
            loading: true
        }, () => {
            this.props.updateUser({
                first_name,
                last_name,
                phone, 
                job_title
            }, this.state.checked)
        });
        // this.props.setIsEdit(false)
    };
    
    onFinishFailed = errorInfo => {
    };

    setChecked = (e) => {
        this.setState({
            checked: e.target.checked,
        })
    }
    render () {
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

                {/* <Item
                    style={{marginTop: 5}}
                    name="full_name"
                    rules={[{ required: true, message: 'Please input your full name!' }]}
                >
                    <Input 
                        placeholder="Full name" 
                        style={styles.textInput}
                    />
                </Item> */}
                <Item
                    style={{marginTop: 5}}
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input 
                        placeholder="Email" 
                        style={styles.textInput}
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
                    rules={[{ required: true, message: 'Please input your group!' }]}
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
                            checked={this.state.checked}
                            onChange={this.setChecked}
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
                        {'UPDATE'}
                    </Button>
                </Item>
            </Form>
        )
    }
}

export default EditProfile;

const styles = {
    ctn: {display: 'flex', flexDirection: 'row', width: '100%'},
    mess: {
        display: 'flex',
        width: 47,
        height: 28,
        marginLeft: 50,
        borderRadius: 14,
        backgroundColor: '#FCAF29',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        fontSize: 12,
        color: '#989898',
        borderRadius: 5,
    },
    name1Input: {
        fontSize: 12,
        color: '#989898',
        width: '100%',
        // marginRight: 12,
        borderRadius: 5
    },
    nameInput: {
        fontSize: 12,
        color: '#989898',
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
