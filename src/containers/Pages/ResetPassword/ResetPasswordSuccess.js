import React, { Component } from 'react';
import SignUpStyle from '@hoa/assets/styles/signUpStyle';
import Logo from '@hoa/assets/images/logo.png';
import {  Button } from 'antd';
import { CheckCircleOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';

class ResetPasswordSuccess extends Component {

    render () {
        return (  
            <SignUpStyle>
                <div style={styles.background}>
                    <div style={styles.top}>
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <img
                                src={Logo}
                                style={{width: 195, height: 62}}
                                alt='img'
                            />
                        </div>
                        <div style={styles.body}>
                            <CheckCircleOutlined
                                style={{fontSize: 50, color: '#fff'}}
                            />
                            <p style={{fontSize: 15, color: '#fff', marginTop: 20}}> {'Congratulations, you have successfully updated your password'} </p>
                        </div>
                        <Button
                            shape='round'
                            style={styles.button}
                        >
                            <Link to="/signin/with_password">
                                <p> {'LOGIN'}</p>
                            </Link>
                        </Button>
                    </div>
                </div>
            </SignUpStyle>
        )
    }
}

export default ResetPasswordSuccess;

const styles = {
    background: {
        borderRadius: 20,
        backgroundColor: '#000',
        width: 414,
        height: 616,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    top: {
        marginTop: 50,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    body: { 
        marginTop: 70, 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center'
    },
    button: {
        width: '100%',
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        height: 42
    },
}

