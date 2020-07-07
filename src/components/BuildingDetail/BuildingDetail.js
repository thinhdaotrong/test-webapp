import React, { Component } from 'react';
import { Button } from 'antd';
import { 
    InfoCircleFilled,
    LoadingOutlined
} from '@ant-design/icons';
import Image from '@hoa/assets/images/building_detail.png';
import SpaceDetailStyle from '@hoa/assets/styles/Space/SpaceDetailStyle';
import AddBuilding from './AddBuilding';
import EditBuilding from './EditBuilding';

import { Client4 } from 'hoa-redux/client';

class BuildingDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            loading: false,
        }
    }

    componentDidMount() {
        this.getImage();

    }

    componentDidUpdate(prevProps) {
        const { updated, setIsEdit, record } = this.props;
        if (JSON.stringify(updated) !== JSON.stringify(prevProps.updated)) {
            if (updated.status === 'success') {
                this.setState({
                    image: ''
                }, () => {
                    this.getImage();
                    setIsEdit(false)
                })
            }
        }
        if (JSON.stringify(record) !== JSON.stringify(prevProps.record)) {
            this.setState({
                image: ''
            }, () => {
                this.getImage();
                setIsEdit(false)
            })
        }

    }

    getImage = async () => {
        this.setState({
            loading: true
        })
        if (!this.props.record || !this.props.record.id) {
            this.setState({
                loading: false
            });
            return null;
        };
        const { id } = this.props.record;
        const data = await Client4.getBuildingImage(id);
        
        if (data && data.type.indexOf('image') != -1) {
            this.setState({
                image: data,
                loading: false
            })
        } else {
            this.setState({
                loading: false
            })
        }
    }

    setIsCreate = (value) => {
        this.props.setIsCreate(value)
    }

    updateBuilding = (info, infoFile) => {
        const { record, actions } = this.props;
        actions.updateBuilding(info, record.id, infoFile)
    }

    renderInfo = () => {
        // const { name, date, time, space, location } = this.state;
        const { record } = this.props;
        const { name, address, floors } = record;
        let str = '';
        if (floors) {
            const list = floors.split(' ');
            list.map(l => {
                str += (parseInt(l) < 10 ? '0' + l : l) + ', '
            })
            str = str.substr(0, str.length - 2);
        }

        return (  
            <div style={{padding: 20}}>
                <p style={styles.name}>{name}</p>
                <div style={{display: 'flex', marginTop: 12}}>
                    <InfoCircleFilled style={{fontSize: 12, marginTop: 3}}/>
                    <p style={{marginLeft: 5, fontSize: 12, color: '#505050'}}>{address}</p>
                </div>
               <p style={styles.title}> {'List Of Floors'} </p>
               <p style={styles.info}> {str} </p>
               <p style={styles.title}> {'List Of Spaces'} </p>
               <p style={styles.info}> {str} </p>
            </div>
        )
    }

    render () {
        const { image, loading } = this.state;
        const { 
            isCreate, 
            isEdit,
            record, 
            setIsCreate, 
            actions, 
            created, 
            updated, 
            setIsEdit,
        } = this.props;
        const src = image.type ? URL.createObjectURL(image) : Image;
        if (isEdit) {
            return (
                <EditBuilding
                    setIsEdit={setIsEdit}
                    record={record}
                    updateBuilding={this.updateBuilding}
                    updated={updated}
                    image={image}
                />
            )
        }

        if (isCreate) {
            return (
                <AddBuilding
                    setIsCreate={setIsCreate}
                    createBuilding={actions.createBuilding}
                    created={created}
                />
            )
        }
        return (  
            <SpaceDetailStyle>
                {
                    loading ? 
                    <div
                        style={{
                            width: '100%',
                            height: 150,
                            backgroundColor: 'rgb(211, 211, 211)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <LoadingOutlined style={{fontSize: 20}}/>
                    </div> : 
                    <img
                        src={src}
                        style={{width: '100%', height: 'auto'}}
                        alt='img'
                    />
                }
                { this.renderInfo()}
                <div style={styles.footer}>
                    <Button 
                        style={styles.button}
                        shape='round'
                        onClick={() => setIsEdit(true)}
                    >
                        {'EDIT'}
                    </Button>
                    <p
                        style={{
                            fontSize: 9,
                            fontWeight: 'bold',
                            color: '#0075C4',
                            cursor: 'pointer',
                            marginBottom: 22,
                            marginTop: 20
                        }}
                    >
                        {'ADD FLOORS'}
                    </p>
                </div>
            </SpaceDetailStyle>
        )
    }
}

export default BuildingDetail;

const styles = {
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000'
    },
    ctn: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 10,
        fontSize: 12,
        color: '#505050'
    },
    title: {fontSize: 11, fontWeight: 'bold', color: '#505050', marginTop: 18},
    info: {
        fontSize: 12,
        color: '#505050',
        marginTop: 5
    },
    footer: {
        margin: 20,
        textAlign: 'center',
    },
    button: {
        color: '#fff',
        backgroundColor: '#000',
        width: '100%'
    },

}
