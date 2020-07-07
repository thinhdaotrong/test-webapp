import React, { Component } from 'react';
import {Switch, Button, Input, Form} from 'antd';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';

const {Item} = Form;

class AddDevice extends Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.state = {
            current: true,
            value: 0
        }
    }

    componentDidMount() {
    }

    onChange = (checked) => {
        this.setState({
            current: checked
        })
    }

    changeRange = e => {
        this.setState({
            value: e.target.value
        })
    }

    onFinish = values => {
        // this.props.setIsEdit(false)
    };
    
    onFinishFailed = errorInfo => {
    };

    render () {
        const {current, value} = this.state;
        const {setIsCreate} = this.props;
        return (  
            <Form
                ref={this.formRef}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
                size={'large'}
                style={{padding: 16}}
            >

                <div style={styles.top}>
                    <Item
                        style={{width: '50%'}}
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input
                            placeholder='Name'
                            style={styles.input}
                        /> 
                    </Item>
                    <Switch defaultChecked onChange={this.onChange} checked={current}/>
                </div>
                <RangeSlider
                    value={value}
                    onChange={this.changeRange}
                    tooltip='on'
                    tooltipPlacement='top'
                />
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <p style={{color: '#505050', fontSize: 12}}>{'0%'}</p>
                    <p style={{color: '#505050', fontSize: 12}}>{'100%'}</p>
                </div>
                <div style={styles.ctn}>
                    <p style={styles.title}> {'DEVICE TYPE'} </p>
                    <Item
                        name="type"
                        rules={[{ required: true, message: 'Please input your device type!' }]}
                    >
                        <Input 
                            placeholder={'Device type'}
                            style={styles.input}
                        />
                    </Item>
                </div>
                <div style={styles.ctn}>
                    <p style={styles.title}> {'DEVICE LOCATION'} </p>
                    <Item
                        name="location"
                        rules={[{ required: true, message: 'Please input your device location!' }]}
                    >
                        <Input 
                            placeholder={'Device location'}
                            style={styles.input}
                        />
                    </Item>
                </div>
                <div style={styles.ctn}>
                    <p style={styles.title}> {'DEVICE GROUP'} </p>
                    <Item
                        name="group"
                        rules={[{ required: true, message: 'Please input your device group!' }]}
                    >
                        <Input 
                            placeholder={'Device group'}
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
                            onClick={() => setIsCreate(false)}
                        >
                            {'SAVE'}
                        </Button>
                    </Item>
                    <p style={styles.add}>
                        {'ADD TO GROUPS'}
                    </p>
                </div>
            </Form>
        )
    }
}

export default AddDevice;

const styles = {
    top: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginBottom: 35,
        alignItems: 'center'
    },
    name: {
        fontSize: 18,
        color: '#000',
        fontWeigh: 'bold'
    },
    ctn: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center',
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
    input: {
        borderRadius: 5,
        fontSize: 12,
        color: '#989898',
        // width: '50%'
    }
}
