import React, { Component } from 'react';
import { Form, Button, Input, Select, Checkbox, Upload, message } from 'antd';
import Image from '@hoa/assets/images/space_detail.png';
import SpaceDetailStyle from '@hoa/assets/styles/Space/SpaceDetailStyle';
import createNotification from '@hoa/components/Notification';
import { CameraOutlined, LoadingOutlined } from '@ant-design/icons';

const { Item } = Form;
const { Option } = Select;
const optionsType = [
    {
        name: 'Office',
        key: 'O'
    },
    {
        name: 'Hot desk',
        key: 'H'
    },
    {
        name: 'Conference room',
        key: 'C'
    }
]

const optionsStatus = [
    {
        key: 'A',
        name: 'Available'
    },
    {
        key: 'NA',
        name: 'Not available'
    }
]

class AddSpace extends Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.state = {
            buildingId: '',
            checked: true,
            loading: false,
            image: Image,
            infoFile: {}
        }
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
                createNotification('success', 'Create space success', '');
            } else if (status === 'failure'){
                this.setState({
                    loading: false
                })
                createNotification('error', 'Create space failure', error ? error.message: '');
            }
        }
    }

    onFinish = values => {
        const { name, building, floor, type, status, suitable, amenities } = values;
        const { checked, infoFile} = this.state;
        this.props.createSpace({
            name,
            building_id: building,
            floor,
            type,
            status,
            best_suitable: suitable,
            is_automation: checked, 
            amenities
        }, infoFile)
    };
    
    onFinishFailed = errorInfo => {
    };

    selectBuilding = (value) => {
        this.setState({
            buildingId: value
        }, () => {
            this.formRef.current.setFieldsValue({
                floor: ''
            })
        })
    }

    setChecked = e => {
        this.setState({
            checked: e.target.checked,
          });
    }

    handleChange = info => {
        this.setState({ loading: true });
        // Get this url from response in real world.
        getBase64(info.file, imageUrl =>
        this.setState({
            image: imageUrl,
            loading: false,
            infoFile: info.file
        }))
    }

    renderImage = () => {
        const { image, loading } = this.state;
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
                        loading ? <LoadingOutlined/> :
                        <CameraOutlined/>
                    }
                </div>
            </Upload>
        )
        return (
            <>
                <div style={{width: '100%'}}>
                {
                    image ?
                        <img
                            src={image}
                            style={{width: '100%', height: 'auto'}}
                            alt='img'
                        /> : 
                        <div
                            style={{
                                width: '100%',
                                height: 150,
                                backgroundColor: 'rgb(211, 211, 211)',
                                
                            }}
                        />
                } 
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        marginTop: -30,
                        marginRight: 5
                    }}
                >
                    {upload}
                </div>
            </>
            // <div
            //     style={{
            //         width: '100%',
            //         height: 150,
            //         backgroundColor: 'rgb(211, 211, 211)',
            //         display: 'flex',
            //         justifyContent: 'flex-end',
            //         alignItems: 'flex-end'
            //     }}
            // >
            // </div>
        )
    }

    render () {
        const { buildings, features } = this.props;
        const { buildingId, checked, loading } = this.state;
        let floors = [];
        
        if (buildingId && buildings[buildingId.toString()]) {
            floors = buildings[buildingId.toString()].floors.split(' ');
        }
        
        return (  
            <SpaceDetailStyle>
                {this.renderImage()}
                {/* <img
                    src={Image}
                    style={{width: '100%', height: 'auto'}}
                /> */}
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
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input
                            placeholder='Name'
                            style={styles.input}
                        /> 
                    </Item>

                    <p style={styles.title}> {'Building: '} </p>
                    <Item
                        style={{marginLeft: 5, width: '100%'}}
                        name="building"
                        rules={[{ required: true, message: 'Please select building!' }]}
                    >
                        <Select
                            style={styles.input}
                            onChange={this.selectBuilding}
                            placeholder='Select building'
                        >
                            {
                                Object.keys(buildings).map(key => {
                                    const { address, id, deleted_at } = buildings[key];
                                    if (!deleted_at) {
                                        return (
                                            <Option value={id} key={id}>{address}</Option>
                                        )
                                    }
                                })
                            }
                        </Select>
                    </Item>
                    {
                        buildingId && 
                        <>
                            <p style={styles.title}> {'Floor: '} </p>
                            <Item
                                style={{marginLeft: 5, width: '100%'}}
                                name="floor"
                                rules={[{ required: true, message: 'Please select floor!' }]}
                            >
                                <Select
                                    style={styles.input}
                                    placeholder='Select floor'
                                >
                                    {
                                        floors.map(floor => {
                                            return (
                                                <Option value={floor} key={floor}>{floor}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Item>
                        </>
                    }

                    <p style={styles.title}> {'Type: '} </p>
                    <Item
                        style={{marginLeft: 5, width: '100%'}}
                        name="type"
                        rules={[{ required: true, message: 'Please select type!' }]}
                    >
                        <Select
                            style={styles.input}
                            placeholder='Select type'
                        >
                            {
                                optionsType.map(option => {
                                    const { name, key } = option;
                                    return (
                                        <Option value={key} key={key}>{name}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Item>
                    <p style={styles.title}> {'Status: '} </p>
                    <Item
                        style={{marginLeft: 5, width: '100%', marginBottom: 5}}
                        name="status"
                        rules={[{ required: true, message: 'Please select status!' }]}
                    >
                        <Select
                            style={styles.input}
                            placeholder='Select status'
                        >
                            {
                                optionsStatus.map(option => {
                                    const { name, key } = option;
                                    return (
                                        <Option value={key} key={key}>{name}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Item>

                    <p style={styles.title}> {'Amenities: '} </p>
                    <Item
                        style={{marginLeft: 5, width: '100%'}}
                        name="amenities"
                        rules={[{ required: true, message: 'Please select amenities!' }]}
                    >
                        <Select
                            style={styles.input}
                            mode="multiple"
                            placeholder='Select amenities'
                        >
                            {
                                Object.keys(features).map(key => {
                                    const { name, id } = features[key];
                                    return (
                                            <Option value={id} key={id}>{name}</Option>
                                        )
                                })
                            }
                        </Select>
                    </Item>

                    <Item
                        style={{marginLeft: 5}}
                        name="checkbox"
                    >
                        <Checkbox 
                            style={styles.title}
                            checked={checked}
                            onChange={this.setChecked}
                        >
                            {'Room automation'}
                        </Checkbox>
                    </Item>

                    <p style={styles.title}> {'Best Suitable for: '} </p>
                    <Item
                        style={{marginLeft: 5}}
                        name="suitable"
                        // rules={[{ required: true, message: 'Please input best suitable!' }]}
                    >
                        <Input
                            placeholder={'Best Suitable'}
                            style={styles.input}
                        />

                    </Item>
                    
                    <div style={styles.footer}>
                        <Item>
                            <Button
                                htmlType="submit"
                                shape='round'
                                style={styles.button}
                                loading={loading}
                                // onClick={() => setIsEdit(false)}
                            >
                                {'SAVE'}
                            </Button>
                        </Item>
                    </div>
                </Form>
            </SpaceDetailStyle>
        )
    }
}

export default AddSpace;

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
    },
    iconCtn: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
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
