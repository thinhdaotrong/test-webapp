import React, { Component } from 'react';
import SignUpStyle from '@hoa/assets/styles/signUpStyle';
import Logo from '@hoa/assets/images/logo2.png';
import { LoadingOutlined } from '@ant-design/icons';
import { withRouter, Link } from 'react-router-dom';
import createNotification from '@hoa/components/Notification';
import { Button } from 'antd';
import { LinkSignIn } from '@hoa/assets/config';

class VerifyEmail extends Component {
    state = {
        loading: false,
        isVerify: false,
        loadingSend: false,
        isSent: false
    }

    componentDidMount() {
        const { location, actions } = this.props;
        const s = location.search.split('&');
        const token = s[1] ? s[1].substr(6, s[1].length) : s[0].substr(7, s[0].length);
        actions.verifyEmail(token);
    }

    componentDidUpdate(prevProps) {
        const { result, sent } = this.props;
        if (JSON.stringify(result) !== JSON.stringify(prevProps.result)) {
            if (result.status === 'started') {
                this.setState({
                    loading: true
                })
            } else
            if (result.status === 'success') {
                createNotification('success', 'Verify email success', '');
                this.setState({
                    loading: false,
                    isVerify: true
                })
            } else if (result.status === 'failure') {
                createNotification('error', 'Verify email failure', result.error ? result.error.message: '');
                this.setState({
                    loading: false
                })
            }
        }

        if (JSON.stringify(sent) !== JSON.stringify(prevProps.sent)) {
            if (sent.status === 'started') {
                this.setState({
                    loadingSend: true,
                    isSent: false
                })
            } else
            if (sent.status === 'success') {
                createNotification('success', 'Send verification email success', '');
                this.setState({
                    loadingSend: false,
                    isSent: true
                })
            } else if (sent.status === 'failure') {
                createNotification('error', 'Send cverification email failure', sent.error ? sent.error.message: '');
                this.setState({
                    loadingSend: false
                })
            }
        }
    }

    resendEmail = () => {
        const { location, actions } = this.props;
        const s = location.search.split('&');
        const email = s[0].substr(7, s[0].length);
        actions.sendEmail(email, LinkSignIn);
    }
    render () {
        const { loading, isVerify, loadingSend, isSent } = this.state;
        return (  
            <SignUpStyle>
                <div style={styles.top}>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <img
                            src={Logo}
                            style={{width: 246, height: 78}}
                            alt='img'
                        />
                    </div>
                    {
                        loading &&
                        <>
                            <p style={{fontSize: 40, color: '#000', marginTop: 50, marginBottom: 10}}>
                                {"We're verifying your email "}
                            </p>
                            <p style={{fontSize: 17, color: '#000'}}>
                                {"please wait..."}
                            </p>
                            <LoadingOutlined
                                style={{
                                    marginTop: 100,
                                    fontSize: 50,
                                    color: '#000'
                                }}
                            />
                        </>
                    }
                    {
                        isSent && 
                        <>
                            <p style={{fontSize: 40, color: '#000', marginTop: 50, marginBottom: 10}}>
                                {"HOGAR: We're sent verification email for you "}
                            </p>
                            <p style={{fontSize: 17, color: '#000'}}>
                                {"Please verify your email address. Check your inbox an email."}
                            </p>
                        </>
                    }
                    {
                        !loading && isVerify ?
                        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                            <p style={{fontSize: 40, color: '#000', marginTop: 50, marginBottom: 10}}>
                                {"Verify Email Success !!!"}
                            </p>
                            <Link to='/signin'>
                                <Button
                                    shape='round'
                                    type='primary'
                                    style={{
                                        marginTop: 150,
                                        width: 270,
                                        height: 35,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    {'BACK TO SIGN IN'}
                                </Button>
                            </Link>
                        </div>
                          :
                        <Button
                            shape='round'
                            type='primary'
                            style={{
                                marginTop: 150,
                                width: 270,
                                height: 35,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            onClick={this.resendEmail}
                            loading={loadingSend}
                        >
                            {'RESEND VERIFICATION EMAIL'}
                        </Button>
                    }
                </div>
            </SignUpStyle>
        )
    }
}

export default withRouter(VerifyEmail);

const styles = {
    top: {
        marginTop: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        width: '100%'
    },
}



