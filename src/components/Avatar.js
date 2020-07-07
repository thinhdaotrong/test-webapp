import React, { Component } from 'react';
import { CameraOutlined, UserOutlined, LoadingOutlined } from '@ant-design/icons';
import { Avatar, Upload, message } from 'antd';
import ImageUploader from 'react-images-upload';
import AvatarStyle from '@hoa/assets/styles/AvatarStyle';
import { Client4 } from 'hoa-redux/client';

class AvatarComponent extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            image: '',
            loading: false,
            imageNew: '',
            userId: ''
        }
    }

    componentDidMount() {
        this.getAvatar();
        
    }

    componentDidUpdate(prevProps) {
        const { userId, user, upload } = this.props;
        if (JSON.stringify(upload) !== JSON.stringify(prevProps.upload)) {
            if (upload.status === 'success') {
                this.getAvatar();
            }
        }
        if (userId !== prevProps.userId) {
            this.getAvatar();
        }
        if (JSON.stringify(user) !== JSON.stringify(prevProps.user)) {
            this.getAvatar();
        }
    }

    getAvatar = async () => {
        const { userId } = this.props;
        if (!userId) return null;
        this.setState({
            image: '',
            imageNew: '',
            loading: true
        }, async () => {
            const data = await Client4.getProfileImage(userId);
            
            if (data && data.type.indexOf('image') != -1) {
                this.setState({
                    image: data,
                    userId,
                    loading: false
                })
            } else {
                this.setState({
                    userId,
                    loading: false
                })
            }
        })
    }

    handleChange = info => {
        const { setImage } = this.props
        this.setState({ loading: true });
            
          // Get this url from response in real world.
          getBase64(info.file, imageUrl => {
            this.setState({
              imageNew: imageUrl,
              image: '',
              loading: false,
            }, () => {
                if (info.file) {
                    setImage(info.file)
                }
            })
        });
    }

    // onChange(e) {
    //     console.log(e.target.files[0]);
    // }
    render () {
        const {size, isEdit} = this.props;
        const {image, loading, imageNew} = this.state;
        
        const src = image.type ? URL.createObjectURL(image) : imageNew;
        let statusIcon;
        let Image;

        if (isEdit) {
            statusIcon = (
                <div style={styles.iconCtn}>
                    <CameraOutlined/>
                </div>
            )
            if (src) {
                Image = (
                    <Avatar
                        src={src}
                        size={size}
                    />
                )
            } else {
                Image = (
                    <Avatar
                        icon={loading ? <LoadingOutlined/> : <UserOutlined />}
                        size={size}
                    />
                )
            }
        } else {
            if(src) {
                Image = (
                    <Avatar
                        src={src}
                        size={size}
                    />
                )
            } else {
                Image = (
                    <Avatar
                        // icon={<UserOutlined style={{fontSize: size/2}}/>}
                        icon={loading ? <LoadingOutlined/> : <UserOutlined />}
                        size={size}
                    />
                )
            }
        }

        return (  
            <AvatarStyle>
                {Image}
                {
                    isEdit && 
                    <div 
                        style={{
                            height: size,
                            display: 'flex',
                            alignItems: 'flex-end',
                            marginLeft: -18,
                        }}
                    >

{/* <input type="file" name="myImage" onChange= {this.onChange} /> */}
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={this.handleChange}
                            style={styles.iconCtn}
                            previewFile={file => {
                                console.log(file);
                                
                            }}
                        >
                            {statusIcon}
                        </Upload>
                    </div>
                }
            </AvatarStyle>
        )
    }
}

export default AvatarComponent;

const styles = {
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
    return false;
}