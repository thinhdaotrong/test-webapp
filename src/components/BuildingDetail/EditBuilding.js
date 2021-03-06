import React, { Component } from 'react';
import { Form, Button, Input, Upload, message } from 'antd';
import Image from '@hoa/assets/images/building_detail.png';
import SpaceDetailStyle from '@hoa/assets/styles/Space/SpaceDetailStyle';
import createNotification from '@hoa/components/Notification';
import { LoadingOutlined, CameraOutlined } from '@ant-design/icons';

const { Item } = Form;

class EditBuilding extends Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.state = {
            infoFile: {},
            loading: false,
            image: props.image
        }
    }

    componentDidMount() {
        const { record } = this.props;
        const { name, floors, address } = record;
        this.formRef.current.setFieldsValue({
            name,
            floors,
            address
        })
    }

    componentDidUpdate(prevProps) {
        const { updated, setIsEdit, record, image } = this.props;
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
                createNotification('success', 'Update building success', '');
            } else if ( status === 'failure') {
                this.setState({
                    loading: false
                })
                createNotification('error', 'Update building failure', error ? error.message : '');
            }
        }

        if (JSON.stringify(record) !== JSON.stringify(prevProps.record)) {
            const { name, floors, address } = record;
            this.formRef.current.setFieldsValue({
                name,
                floors,
                address,
            })
            this.setState({
                image: this.props.image
            })
        }
    }

    onFinish = values => {
        const { name, floors, address } = values;
        const { infoFile } = this.state;
        this.props.updateBuilding({
            name,
            floors,
            address
        }, infoFile)
    };
    
    onFinishFailed = errorInfo => {
    };

    handleChange = info => {
        this.setState({ loadingImage: true });
        // Get this url from response in real world.
        getBase64(info.file, imageUrl =>
        this.setState({
            image: imageUrl,
            loadingImage: false,
            infoFile: info.file
        }))
    }

    renderImage = () => {
        const { loadingImage, image } = this.state;
        let src = image.type ? URL.createObjectURL(image) : image;
        if (!src) {
            src = Image;
        }
        const upload = (
            <Upload
                name="image"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
                style={styles.iconCtn}
            >
                <div style={styles.iconCtn}>
                    {
                        loadingImage ? <LoadingOutlined/> :
                        <CameraOutlined/>
                    }
                </div>
            </Upload>
        )
        return (
            <>
                <div style={{width: '100%'}}>
                    <img
                        src={src}
                        style={{width: '100%', height: 'auto'}}
                        alt='img'
                    />
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        marginTop: -30,
                        marginRight: 5,
                        cursor: 'pointer',
                        
                    }}
                >
                    {upload}
                </div>
            </>
        )
    }

    render () {        
        return (  
            <SpaceDetailStyle>
                {this.renderImage()}
                <Form
                    ref={this.formRef}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    size={'large'}
                    style={{padding: 20}}
                >
                    <p style={styles.title}> {'Name: '} </p>
                    <Item
                        style={{width: '100%'}}
                        name="name"
                        rules={[{ required: true, message: "Please input building's name!" }]}
                    >
                        <Input
                            placeholder='Name'
                            style={styles.input}
                        /> 
                    </Item>

                    <p style={styles.title}> {'Address: '} </p>
                    <Item
                        style={{marginLeft: 5, width: '100%'}}
                        name="address"
                        rules={[{ required: true, message: 'Please input address!' }]}
                    >
                        <Input
                            placeholder='Address'
                            style={styles.input}
                        /> 
                    </Item>
                    <p style={styles.title}> {'Floors: '} </p>
                    <Item
                        style={{marginLeft: 5, width: '100%'}}
                        name="floors"
                        rules={[{ required: true, message: 'Please input floors!' }]}
                    >
                        <Input
                            placeholder='Floors'
                            style={styles.input}
                        /> 
                    </Item>
                    <div style={styles.footer}>
                        <Item>
                            <Button
                                htmlType="submit"
                                shape='round'
                                style={styles.button}
                                loading={this.state.loading}
                            >
                                {'UPDATE'}
                            </Button>
                        </Item>
                    </div>
                </Form>
            </SpaceDetailStyle>
        )
    }
}

export default EditBuilding;

const styles = {
    ctn: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 10,
        fontSize: 12,
        color: '#505050'
    },
    title: {
        fontSize: 12,
        color: '#505050',
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 10
    },
    text: {
        fontSize: 12,
        color: '#989898'
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
    cancel: {
        marginTop: 20,
        color: '#EB3636',
        fontSize: 9,
        fontWeight: 'bold',
        cursor: 'pointer'
    },
    input: {
        borderRadius: 5,
        fontSize: 12,
        color: '#000',
        width: '100%',
        minHeight: 40,
    }
}

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
  
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    // return isJpgOrPng && isLt2M;
    return false
}
