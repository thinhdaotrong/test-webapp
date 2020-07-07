import React, { Component } from 'react';
import { Switch, Button } from 'antd';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import EditDevice from './EditDevice';
import AddDevice from './AddDevice';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.state = {
            name: 'LIGHT 457',
            type: 'light',
            location: 'Godavari',
            group: 'Godavari',
            current: true,
            edit: false,
            value: 50
        }
    }

    setEdit = (value) => {
        this.setState({
            edit: value,
        })
    }

    setIsCreate = (value) => {
        this.props.setIsCreate(value)
    }

    render () {
        const {isCreate} = this.props;
        const {edit, name, type, location, group, current, value} = this.state;
        if (edit) {
            return (
                <EditDevice
                    setEdit={this.setEdit}
                />
            )
        } else if (isCreate) {
            return (
                <AddDevice
                    setIsCreate={this.setIsCreate}
                />
            )
        }
        return (  
            <div style={{padding: 16}}>
                <div style={styles.top}>
                    <p style={styles.name}> {name} </p> 
                    <Switch defaultChecked onChange={this.onChange} checked={current}/>
                </div>
                <RangeSlider
                    value={value}
                    onChange={this.changeRange}
                    tooltip='on'
                    tooltipPlacement='top'
                    disabled={true}
                />
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <p style={{color: '#505050', fontSize: 12}}>{'0%'}</p>
                    <p style={{color: '#505050', fontSize: 12}}>{'100%'}</p>
                </div>
                <div style={styles.ctn}>
                    <p style={styles.title}> {'DEVICE ICON'} </p>
                </div>
                <div style={styles.ctn}>
                    <p style={styles.title}> {'DEVICE TYPE'} </p>
                    <p style={styles.text}> {type} </p>
                </div>
                <div style={styles.ctn}>
                    <p style={styles.title}> {'DEVICE LOCATION'} </p>
                    <p style={styles.text}> {location} </p>
                </div>
                <div style={styles.ctn}>
                    <p style={styles.title}> {'DEVICE GROUP'} </p>
                    <p style={styles.text}> {group} </p>
                </div>
                <div style={styles.ctn}>
                    <p style={styles.title}> {'DEVICE STATUS'} </p>
                    <p style={styles.text}> {current ? 'ON' : 'OFF'} </p>
                </div>

                <div style={styles.footer}>
                    <Button
                        shape='round'
                        style={styles.button}
                        onClick={() => {
                            this.setState({
                                edit: !edit
                            })
                        }}
                    >
                        {'EDIT'}
                    </Button>
                    <p style={styles.add}>
                        {'ADD TO GROUPS'}
                    </p>
                </div>
            </div>
        )
    }
}

export default Detail;

const styles = {
    top: {display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 35},
    name: {
        fontSize: 18,
        color: '#000',
        fontWeigh: 'bold'
    },
    ctn: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginTop: 39
    },
    title: {
        fontSize: 11,
        color: '#505050'
    },
    text: {
        fontSize: 12,
        color: '#505050'
    },
    footer: {
        marginTop: 50,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: '#000', 
        color: '#fff',
        width: '100%'
    },
    add: {
        fontSize: 9, 
        fontWeight: 'bold', 
        color: '#0075C4', 
        cursor: 'pointer', 
        textAlign: 'center', 
        marginTop: 20
    },
}
