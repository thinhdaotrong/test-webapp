import React, { Component } from 'react';
import { Button, Form, Input } from 'antd';
import createNotification from '@hoa/components/Notification';

const { Item } = Form;

class EditFeature extends Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.state = {
            loading: false
        }
    }

    componentDidMount() {
        const { record } = this.props;
        const { name } = record;
        this.formRef.current.setFieldsValue({
            name,
        })
    }

    componentDidUpdate(prevProps) {
        const { updated, setIsEdit, record } = this.props;
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
                createNotification('success', 'Update feature success', '');
            } else if ( status === 'failure') {
                this.setState({
                    loading: false
                })
                createNotification('error', 'Update feature failure', error ? error.message : '');
            }
        }

        if (JSON.stringify(record) !== JSON.stringify(prevProps.record)) {
            const { name } = record;

            this.formRef.current.setFieldsValue({
                name,
            })
        }
    }

    onFinish = values => {
        const { name } = values;
        this.props.updateFeature({
            name
        })
    };
    
    onFinishFailed = errorInfo => {
    };

    render () {
        const { loading } = this.state;

        return (  
            <>
                <Form
                    ref={this.formRef}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    size={'large'}
                >
                    <div style={styles.itemCtn}>
                        <p style={styles.title}> {'Name: '} </p>
                        <Item
                            style={{width: '100%'}}
                            name="name"
                            rules={[{ required: true, message: "Please input feature's name!" }]}
                        >
                            <Input
                                placeholder='Name'
                                style={styles.input}
                            /> 
                        </Item>
                    </div>
                    <div style={styles.footer}>
                        <Item>
                            <Button
                                htmlType="submit"
                                shape='round'
                                style={styles.button}
                                loading={loading}
                            >
                                {'UPDATE'}
                            </Button>
                        </Item>
                    </div>
                </Form>
            </>
        )
    }
}

export default EditFeature;

const styles = {
    itemCtn: {display: 'flex', marginTop: 20, alignItems: 'center'},
    title: {fontSize: 18, color: '#000', fontWeight: 'bold'},
    input: {
        borderRadius: 5,
        fontSize: 15,
        color: '#000',
        width: '100%',
        minHeight: 40,
        marginLeft: 10
    },
    footer: {
        marginTop: 30,
        textAlign: 'center'
    },
    button: {
        color: '#fff',
        backgroundColor: '#000',
        width: '100%'
    },
}

