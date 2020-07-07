import React, { Component } from 'react';
import { Button } from 'antd';
import { 
    WifiOutlined,
    InfoCircleFilled,
    ClockCircleFilled,
    LoadingOutlined
} from '@ant-design/icons';
import Avatar from '@hoa/components/Avatar';
import EditSpace from './EditSpace';
import Image from '@hoa/assets/images/space_detail.png';
import SpaceDetailStyle from '@hoa/assets/styles/Space/SpaceDetailStyle';
import AddSpace from './AddSpace';
import { Client4 } from 'hoa-redux/client';
class SpaceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // features: [1,2,3,4],
            // devices: [1,2,3,4],
            image: '',
            loading: false,
        }
    }

    componentDidMount() {
        this.props.actions.getAllBuildings(1, 1000);
        this.props.actions.getAllFeatures();
        this.getImage();

    }

    componentDidUpdate(prevProps) {
        const { record, setIsEdit } = this.props;
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
        if (!this.props.record || !this.props.record.id) return null;
        const { id } = this.props.record;
        const data = await Client4.getSpaceImage(id);
        
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

    updateSpace = (info, infoFile) => {
        const { record, actions } = this.props;
        console.log(record);
        
        actions.updateSpace(info, record.id, infoFile)
    }

    renderInfo = () => {
        // const { name, date, time, space, location } = this.state;
        const { record, buildings } = this.props;
        const { name, floor, building_id } = record;
        const building = buildings[building_id];
        let str = '';
        if (building) {
            const { name } = building;
            str = name + ', ' + floor + 'rd Floor';
        }
        return (  
            <>
                <p style={styles.name}>{name}</p>
                <div style={styles.ctn}>
                    <InfoCircleFilled/>
                    <p style={{marginLeft: 5, fontSize: 12, color: '#505050'}}>{str}</p>
                </div>
                <div style={styles.ctn}>
                    <ClockCircleFilled/>
                    {/* <p style={{marginLeft: 5}}>{time}</p> */}
                </div>
            </>
        )
    }

    renderItem = () => {
        const list = [1, 2, 3, 4];
        let tmp = list;
        if (list.length > 3) {
            tmp = list.slice(0, 3);
        }

        return (
            <div 
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 10,
                    // height: 60,
                    borderRadius: 10
                }}
                className='item-upcoming'
            >
                <div>
                    <p style={{fontSize: 10, fontWeight: 'bold', color: '#000'}}> {'UI UX Plan'} </p>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <div style={{width: 4, height: 4, borderRadius: 2, backgroundColor: '#DBBE03', marginRight: 2}}/>
                        <p style={{fontSize: 7, color: '#989898'}}> {'ROOM HUDDLE'} </p>
                    </div>
                    <div style={{display: 'flex', marginTop: 3}}>
                        {
                            tmp.map(l => {
                            return (
                                <div style={{marginLeft: -7}} key={l}>
                                    <Avatar
                                        size={20}
                                    />
                                </div>
                            )
                            })
                        }
                        {
                        list.length > 3 &&
                        <div style={styles.listAva}>
                            <p style={{color: '#fff', fontSize: 10}}>
                                <span> {'+'} </span>
                                <span> {list.length - 3} </span>
                            </p>
                        </div>
                        }
                    </div>
                </div>
                <div>
                    <p style={{fontSize: 8, color: '#000', fontWeight: 'bold'}}> {'21/05/2020'} </p>
                    <p style={{fontSize: 7, color: '#989898'}}> {'10AM - 11AM'} </p>
                </div>
            </div>
        )
    }

    renderRoleUser = () => {
        const { changeVisibleCalendar } = this.props;
        return (
            <div>
                <div style={{color: '#000'}}>
                    <WifiOutlined/>
                    <p style={{fontSize: 8}}> {'Wifi'} </p>
                </div>
                <div style={{marginTop: 20}}>
                    <p style={{fontSize: 11, color: '#000'}}> {'Upcoming Events'} </p>
                    {this.renderItem()}
                    {this.renderItem()}
                </div>
                <Button 
                    shape= 'round'
                    style={styles.buttonBook} 
                >
                    {'Book for a meeting'}
                </Button>
                <p 
                    style={styles.full}
                    onClick={() => changeVisibleCalendar(true)}
                >
                    {'SEE FULL CALENDAR'}
                </p>
                <p style={{fontSize: 11, color: '#000', marginTop: 15}}> {'Near by Rooms'} </p>
            </div>
        )
    }

    renderRoleAdmin = () => {
        const { record, changeVisibleCalendar } = this.props;
        return (
            <div>
                <p style={styles.title}> {'Features Available'} </p>
                {
                   record.amenities &&  record.amenities.map(f => {
                        return (
                            <WifiOutlined key={f} style={{marginLeft: 5}}/>
                        )
                    })
                }
                <p style={styles.title}> {'Devices Attached'} </p>
                {/* {
                    devices.map(f => {
                        return (
                            <WifiOutlined key={f} style={{marginLeft: 5}}/>
                        )
                    })
                } */}
                <div style={styles.footer}>
                    <Button
                        shape='round'
                        style={styles.button}
                        onClick={() => this.props.setIsEdit(true)}
                    >
                        {'EDIT'}
                    </Button>
                    <p 
                        style={styles.full}
                        onClick={() => changeVisibleCalendar(true)}
                    >
                        {'SEE FULL CALENDAR'}
                    </p>
                </div>
                <p style={styles.title}>{'Upcoming Events'}</p>
                {this.renderItem()}
            </div>  
        )
    }

    render () {
        const { image, loading } = this.state;
        const { 
            isCreate, 
            isEdit,
            record, 
            buildings, 
            setIsCreate, 
            actions, 
            created, 
            updated, 
            upload,
            isAdmin,
            features,
            setIsEdit,
        } = this.props;
        const { best_suitable, status } = record;
        const src = image.type ? URL.createObjectURL(image) : Image;
        
        if (isEdit) {
            return (
                <EditSpace
                    setIsEdit={setIsEdit}
                    record={record}
                    buildings={buildings}
                    updateSpace={this.updateSpace}
                    updated={updated}
                    features={features}
                    image={image}
                    upload={upload}
                />
            )
        }

        if (isCreate) {
            return (
                <AddSpace
                    buildings={buildings}
                    setIsCreate={setIsCreate}
                    createSpace={actions.createSpace}
                    created={created}
                    features={features}
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
                {
                    !isAdmin &&
                    <div
                        style={{
                            width: '100%',
                            height: 27,
                            backgroundColor: '#4BD662',
                            marginTop: -27,
                            position: 'relative',
                            display: 'flex',
                            justifyContent: 'space-between',
                            color: '#fff',
                            alignItems: 'center',
                            opacity: 0.8,
                            fontSize: 12,
                            fontWeight: 'bold',
                            paddingLeft: 5,
                            paddingRight: 5
                        }}
                    >
                        <p> {status ? status.toUpperCase(): ''} </p>
                        <p> {'NEXT MEETING'} </p>
                    </div>
                }
                <div style={{padding: 20}}>
                    {this.renderInfo()}
                    <div style={styles.ctn}>
                        <p style={{fontWeight: 'bold'}}> {'Best Suitable for: '} </p>
                        <p style={{marginLeft: 5}}>{best_suitable}</p>
                    </div>
                    
                    { isAdmin ? this.renderRoleAdmin() : this.renderRoleUser()}
                </div>
            </SpaceDetailStyle>
        )
    }
}

export default SpaceDetail;

const styles = {
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#505050'
    },
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
        marginTop: 10,
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
    buttonBook: {
        color: '#fff',
        backgroundColor: '#4BD662',
        width: '100%',
        fontSize: 13,
        fontWeight: 'bold',
        marginTop: 20
    },
    full: {
        marginTop: 10,
        color: '#0075C4',
        fontSize: 9,
        fontWeight: 'bold',
        cursor: 'pointer',
        textAlign: 'center'
    },
    listAva: {
        width: 20, 
        height: 20, 
        borderRadius: 12, 
        backgroundColor: '#000', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginLeft: -5,
        position: 'relative'
    }
}
