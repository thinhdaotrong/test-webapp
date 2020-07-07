import React, { Component } from 'react';
import { Button } from 'antd';
import { WifiOutlined } from '@ant-design/icons';
import EditFeature from './EditFeature';
import AddFeature from './AddFeature';

class FeatureDetail extends Component {
    constructor(props) {
        super(props);
    }

    updateFeature = (info) => {
        const { record, actions } = this.props;
        actions.updateFeature(record.id, info);
    }

    createFeature = (info) => {
        this.props.actions.createFeature(info);
    }
    
    render () {
        const { 
            record, 
            isEdit, 
            isCreate, 
            setIsEdit, 
            setIsCreate,
            updated,
            created
        } = this.props;
        const { name } = record;
        if (isEdit) {
            return (
                <EditFeature
                    record={record}
                    setIsEdit={setIsEdit}
                    updateFeature={this.updateFeature}
                    updated={updated}
                />
            )
        }

        if (isCreate) {
            return (
                <AddFeature
                    created={created}
                    setIsCreate={setIsCreate}
                    createFeature={this.createFeature}
                />
            )
        }
        return (  
            <>
                <div style={styles.itemCtn}>
                    <p style={styles.title}> {'Name: '} </p>
                    <p style={styles.name}> {name} </p>
                </div>

                <div style={styles.itemCtn}>
                    <p style={styles.title}> {'Icon: '} </p>
                    <WifiOutlined style={styles.name}/>
                </div>

                <div style={styles.itemCtn}>
                    <p style={styles.title}> {'Spaces: '} </p>
                    <p style={styles.name}> {'spaces'} </p>
                </div>

                <div style={styles.footer}>
                    <Button
                        shape='round'
                        style={styles.button}
                        onClick={() => this.props.setIsEdit(true)}
                    >
                        {'EDIT'}
                    </Button>
                </div>
            </>
        )
    }
}

export default FeatureDetail;

const styles = {
    itemCtn: {display: 'flex', marginTop: 20, alignItems: 'center'},
    title: {fontSize: 18, color: '#000', fontWeight: 'bold'},
    name: {
        fontSize: 16,
        color: '#989898',
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

