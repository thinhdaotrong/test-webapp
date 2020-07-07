import React, { Component } from 'react';
import { Button, Form, Input } from 'antd';
import LayoutContentWrapper from '@hoa/components/utility/layoutWrapper';
import LayoutContent from '@hoa/components/utility/layoutContent';
import EditProfileStyle from '@hoa/assets/styles/Profile/EditProfileStyle';
import Auth from '@hoa/components/Auth';
import Avatar from '@hoa/components/Avatar';
import createNotification from '@hoa/components/Notification';

const { Item } = Form;

class EditProfile extends Component {
    formRef = React.createRef();
    state = {
        loading: false,
        image: ''
    }

    componentDidMount() {
        const { user } = this.props;
        const { email, first_name, last_name } = user;
        this.formRef.current.setFieldsValue({
           first_name,
           last_name,
           email
        })
    }

    componentDidUpdate(prevProps) {
        const { user, updated, setIsEdit } = this.props;
        if (JSON.stringify(user) !== JSON.stringify(prevProps.user)) {
            const { email, first_name, last_name } = user;
            this.formRef.current.setFieldsValue({
                first_name,
                last_name,
                email
            })
        }

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

    setImage = (image) =>{
        this.setState({
            image
        })
    }

    onFinish = values => {
        const { user, actions } = this.props;
        const { first_name, last_name, email } = values;
        this.setState({
            loading: true
        }, () => {
            actions.updateUser({
                first_name,
                last_name,
                email,
            }, user.id, this.state.image )
        });
    };
    
    onFinishFailed = errorInfo => {
    };

    render() {
        
        return (
            <LayoutContentWrapper>
                <LayoutContent>
                    <EditProfileStyle>
                        <div className="avatar">
                            <Avatar
                                userId={Auth.getUserId()}
                                size={72}
                                isEdit={true}
                                setImage={this.setImage}
                            />
                        </div>
                        <Form
                            ref={this.formRef}
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}
                            size={'large'}
                            style={{padding: 20}}
                            className="content"
                        >
                            <p style={styles.title}> {'First Name: '} </p>
                            <Item
                                style={{width: '100%'}}
                                name="first_name"
                                rules={[{ required: true, message: "Please input first name!"}]}
                            >
                                <Input
                                    placeholder='First name'
                                    style={styles.input}
                                /> 
                            </Item>
                            <p style={styles.title}> {'Last Name: '} </p>
                            <Item
                                style={{width: '100%'}}
                                name="last_name"
                                rules={[{ required: true, message: "Please input last name!"}]}
                            >
                                <Input
                                    placeholder='Last name'
                                    style={styles.input}
                                /> 
                            </Item>

                            <p style={styles.title}> {'Email: '} </p>
                            <Item
                                style={{width: '100%'}}
                                name="email"
                                rules={[{ required: true, message: "Please input email!"}]}
                            >
                                <Input
                                    placeholder='Email'
                                    style={styles.input}
                                /> 
                            </Item>

                            <div className='footer'>
                                <Item>
                                    <Button 
                                        htmlType="submit"
                                        type="primary" 
                                        style={{borderRadius: 5}}
                                        loading={this.state.loading}
                                    >
                                        {'UPDATE'}
                                    </Button>
                                </Item>
                            </div>
                        </Form>
                    </EditProfileStyle>
                </LayoutContent>
            </LayoutContentWrapper>
        )
    }
}

export default EditProfile;

const styles = {
    email: {
        display: 'flex', 
        flexDirection: 'row', 
        marginBottom: 24
    },
    title: {
        fontSize: 14, 
        color: '#000', 
        marginBottom: 10,
        marginTop: 20,
        width: 90,
    },
    value: {
        fontSize: 14, 
        color: 'rgba(0, 0, 0, 0.65)'
    },
    input: {
        borderRadius: 5,
        fontSize: 12,
        color: '#000',
        width: '100%',
        minHeight: 40,
    }
}