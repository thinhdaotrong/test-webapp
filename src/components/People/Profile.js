import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import { MailOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import Avatar from '@hoa/components/Avatar';
import EditProfile from './EditProfile';

const { confirm } = Modal;

class Profile extends Component {
    state = {
        image: '',
    }

    setImage = (image) =>{
        this.setState({
            image
        })
    }

    renderInfo = () => {
        const { first_name, last_name, email, phone, job_title } = this.props.record;
       
        return (
            <>
                <div style={styles.ctn}>
                    <p style={styles.name1}> {first_name || 'none'} </p>
                    <p style={styles.name}> {last_name || 'none'} </p>
                </div>
                <p style={styles.text}> {email || 'none'} </p>
                <p style={styles.text}> {phone || 'none'} </p>
                <p style={styles.text}> {job_title || 'none'} </p>
                <p style={styles.text}> {'group'} </p>
            </>
        )
    }

    updateUser = (info, isAdmin) => {
        this.props.actions.updateUser(info, isAdmin, this.props.record.id, this.state.image);
    }

    suspenUser = () => {
        const { actions, record } = this.props;
        confirm({
            title: 'Do you want to suspend these user?',
            icon: <ExclamationCircleOutlined />,
            // content: 'When clicked the OK button, this dialog will be closed after 1 second',
            onOk() {
                actions.suspendUser(record.id)
            },
            onCancel() {},
          })
    }

    renderBody = () => {
        const {selected, record, isEdit, setIsEdit, updated} = this.props;
        const { image } = this.state;
        
        return (
            <div style={{marginTop: 22, padding: 10}} className="body-profile">
                {!isEdit && this.renderInfo() }
                {
                    isEdit && 
                    <EditProfile
                        selected={selected}
                        setIsEdit={setIsEdit}
                        record={record}
                        updateUser={this.updateUser}
                        updated={updated}
                        image={image}
                    />
                }
                <div style={styles.footer}>
                    {
                        !isEdit && 
                        <Button 
                            shape="round" 
                            style={styles.buttonEdit}
                            onClick={() => setIsEdit(true)}
                        > 
                            {'EDIT'} 
                        </Button>   
                    }
                    <div style={styles.meeting}>
                        <Button
                            shape="round" 
                            style={styles.buttonUp}
                        >
                            {'UPCOMING MEETINGS'}
                        </Button>
                        <Button
                            shape="round" 
                            style={styles.buttonAll}
                        >
                            {'ALL MEETINGS'}
                        </Button>
                    </div>
                    <p 
                        style={styles.suspend}
                        onClick={this.suspenUser}
                    >
                        {"SUSPEND EMPLOYEE"}
                    </p>

                </div>
            </div>
        )
    }

    render () {
        const { record } = this.props;
        const { first_name, last_name, job_title, id } = record;
        
        return (  
            <div className="container">
                <div style={styles.ctn}>
                    <Avatar
                        size={65}
                        // isEdit={id == Auth.getUserId() ? this.props.isEdit : false}
                        isEdit={this.props.isEdit}
                        setImage={this.setImage}
                        userId={id}
                    />
                    <div style={styles.rightTop}>
                        {/* <div style={{display: 'flex',alignItems: 'center', justifyItems: 'space-between'}}> */}
                            <div >
                                <p style={{fontSize: 16, color: '#000'}}> {first_name + ' ' + last_name} </p>
                                <p style={{fontSize: 15, color: '#989898'}}> {job_title} </p>
                            </div>
                            <div style={styles.mess}>
                                <MailOutlined style={{color: '#fff'}}/>
                            </div>
                        {/* </div> */}
                        {/* <p style={{fontSize: 12, color: '#989898'}}> {'Designer'} </p> */}
                    </div>  
                </div>
                {this.renderBody()}
            </div>
        )
    }
}

export default Profile;

const styles = {
    ctn: {display: 'flex', flexDirection: 'row', width: '100%'},
    rightTop: {
        marginLeft: 15, 
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'space-between', 
        width: '100%'
    },
    mess: {
        display: 'flex',
        width: 47,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#FCAF29',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 12,
        color: '#989898',
        marginTop: 23
    },
    name1: {
        fontSize: 12,
        color: '#989898',
        width: '50%',
        marginRight: 12
    },
    name: {
        fontSize: 12,
        color: '#989898',
        width: '50%',
    },

    footer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    buttonEdit: {
        backgroundColor: '#000',
        color: '#fff',
        width: '100%',
        fontSize: 12,
        marginTop: 48,
    },
    meeting: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        marginTop: 17,
    },
    buttonUp: {
        width: '50%',
        backgroundColor: '#5AD56E',
        fontSize: 9,
        color: '#fff',
        marginRight: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonAll: {
        width: '50%',
        backgroundColor: '#29B0F3',
        fontSize: 9,
        color: '#fff'
    },
    suspend: {
        fontSize: 10,
        color: '#FF3939',
        cursor: 'pointer',
        marginTop: 30,
        textAlign: 'center'
    },
}
