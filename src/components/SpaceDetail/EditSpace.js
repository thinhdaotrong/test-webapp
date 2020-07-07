import React, { Component } from 'react';
import { Form, Button, Input, Select, Checkbox, Upload, message } from 'antd';
import Image from '@hoa/assets/images/space_detail.png';
import SpaceDetailStyle from '@hoa/assets/styles/Space/SpaceDetailStyle';
import createNotification from '@hoa/components/Notification';
import { LoadingOutlined, CameraOutlined } from '@ant-design/icons';

const { Item } = Form;
const { Option } = Select;
const optionsType = [
    {
        name: 'Office',
    },
    {
        name: 'Hot desk'
    },
    {
        name: 'Conference room'
    }
]

const optionsStatus = [
    {
        key: 'available',
        name: 'Available'
    }
]

class EditSpace extends Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        
        this.state = {
            buildingId: props.record.building_id,
            checked: props.record.is_automation,
            loading: false,
            loadingImage: false,
            infoFile: {},
            image: props.image
        }
    }

    componentDidMount() {
        const { record } = this.props;
        const { name, building_id, floor, type, status, best_suitable, is_automation, amenities } = record;
        const a = amenities ? amenities.map(a => a.id) : [];
        let t = 'Office';
        if (type  === 'H') {
            t = 'Hot desk'
        } else if (type === 'C') {
            t = 'Conference room'
        }
        this.formRef.current.setFieldsValue({
            name,
            type: t,
            building: building_id,
            floor: parseInt(floor),
            status, 
            suitable: best_suitable,
            amenities: a
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
                createNotification('success', 'Update space success', '');
            } else if ( status === 'failure') {
                this.setState({
                    loading: false
                })
                createNotification('error', 'Update space failure', error ? error.message : '');
            }
        }

        if (JSON.stringify(record) !== JSON.stringify(prevProps.record)) {
            const { name, building_id, floor, type, status, best_suitable, is_automation } = record;

            this.formRef.current.setFieldsValue({
                name,
                type,
                building: building_id,
                floor,
                status, 
                suitable: best_suitable
            })
            this.setState({
                buildingId: building_id,
                checked: is_automation,
                loading: false,
                image,
            })
        }
    }

    onFinish = values => {
        const { name, building, floor, type, status, suitable, amenities } = values;
        const { checked, infoFile } = this.state;
        this.props.updateSpace({
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
            buildingId: value,
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
        const { buildings, features } = this.props;
        const { buildingId, checked, loading } = this.state;
        let floors = [];
        
        if (buildingId) {
            floors = buildings[buildingId.toString()] ? buildings[buildingId.toString()].floors.split(' ') : [];
        }
        
        return (  
            <SpaceDetailStyle>
                {/* <img
                    src={Image}
                    style={{width: '100%', height: 'auto'}}
                /> */}
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
                        rules={[{ required: true, message: "Please input space's name!"}]}
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
                        >
                            {
                                optionsType.map(option => {
                                    const { name } = option;
                                    return (
                                        <Option value={name} key={name}>{name}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Item>
                    <p style={styles.title}> {'Status: '} </p>
                    <Item
                        style={{marginLeft: 5, width: '100%'}}
                        name="status"
                        rules={[{ required: true, message: 'Please select status!' }]}
                    >
                        <Select
                            style={styles.input}
                        >
                            {
                                optionsStatus.map(option => {
                                    const { name } = option;
                                    return (
                                        <Option value={name} key={name}>{name}</Option>
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
                                {'UPDATE'}
                            </Button>
                        </Item>
                    </div>
                </Form>
            </SpaceDetailStyle>
        )
    }
}

export default EditSpace;

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
