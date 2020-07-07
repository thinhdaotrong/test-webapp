import React, { Component } from 'react';
import { Menu, Radio, Modal } from 'antd';
import { 
    AppstoreOutlined,
    FilterOutlined,
    BarChartOutlined,
    SettingOutlined,
    UserOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import { Redirect } from 'react-router-dom';
import Popover from '@hoa/components/uielements/popover';
import TopbarDropdownWrapper from '@hoa/containers/Topbar/TopbarDropdown.styles.js';
import LayoutContentWrapper from '@hoa/components/utility/layoutWrapper';
import LayoutContent from '@hoa/components/utility/layoutContent';
import LayoutContentProfile from '@hoa/components/utility/layoutContentProfile';
import PeopleStyle from '@hoa/assets/styles/People/PeopleStyle';
import Table from './Table';
import Profile from '@hoa/components/People/Profile';
import AddUser from './AddUser';
import CONTENT from '@hoa/components/utility/data_people';
import { objectToArray } from '@hoa/utils/convert_data';
import Auth from '../Auth';

const { confirm } = Modal;
const PER_PAGE = 10;

class People extends Component {
    constructor(props) {
        super(props);
        const dataSource = objectToArray(props.users);
        this.state = {
            selected: props.selected,
            visibleFilter: false,
            visibleStat: false,
            visibleSetting: false,
            radio: 1,
            redirect: false,
            isCreate: false,
            isEdit: false,
            selectedRowKeys: [],
            dataSource,
            record: dataSource && dataSource[0] ? dataSource[0] : {}
        }
    }

    componentDidMount() {
        this.props.actions.getAllUsers(1, PER_PAGE);
    }

    componentDidUpdate(prevProps) {
        const {selected, users, upload} = this.props;
        if (selected != prevProps.selected) {
            this.setState({
                selected,
                visibleFilter: false,
                visibleStat: false,
                visibleSetting: false,
                radio: 1,
                redirect: false,
                isCreate: false,
                selectedRowKeys: [],
                
            })
        }

        if (JSON.stringify(users) !== JSON.stringify(prevProps.users)) {
            const dataSource = objectToArray(users);
            this.setState({
                dataSource,
                record: dataSource && dataSource[0] ? dataSource[0] : {}
            })
        }

        // if (JSON.stringify(upload) !== JSON.stringify(prevProps.upload)) {
        //     const { status, error } = upload;
        //         if (status === 'success') {
        //             this.setState({});
        //         }
        // }
    }
     
    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };

    handleClick = (e) => {
        this.setState({
            selected: e.key,
            redirect: true
        })
    }

    setIsCreate = (value) => {
        this.setState({
            isCreate: value,
            visibleSetting: false
        })
    }

    setIsEdit = (value) => {
        this.setState({
            isEdit: value
        })
    }


    changeVisibleFilter = () => {
        this.setState({
            visibleFilter: !this.state.visibleFilter
        })
    }

    changeVisibleStat = () => {
        this.setState({
            visibleStat: !this.state.visibleStat
        })
    }

    changeVisibleSetting = () => {
        this.setState({
            visibleSetting: !this.state.visibleSetting
        })
    }

    onChangeRadio = e => {
        this.setState({
          radio: e.target.value,
        });
      };

    handleDelete = () => {
        const { actions } = this.props;
        const { selectedRowKeys } = this.state;
        confirm({
            title: 'Do you want to delete these users?',
            icon: <ExclamationCircleOutlined />,
            // content: 'When clicked the OK button, this dialog will be closed after 1 second',
            onOk() {
                // actions.deleteSpaces(selectedRowKeys)
            },
            onCancel() {},
            })
    }

    handleItem = (record) => {
        this.setState({
            record,
            isEdit: false,
            isCreate: false
        })
    }

    renderContent = () => {
        const {visibleFilter, radio, visibleSetting, selected} = this.state;
        if (visibleFilter) {
            return (
                <TopbarDropdownWrapper className="isoUserDropdown">
                    <Radio.Group 
                        onChange={this.onChangeRadio} 
                        value={radio}
                        style={{padding: 16}}
                        size="small"
                    >
                        {
                            CONTENT.FILTER.map(f => {
                                return (
                                    <Radio value={f.key} style={styles.radio} key={f.key}>{f.title}</Radio>
                                )
                            })
                        }
                        {/* <Radio value={1} style={styles.radio}> {'Name Assending'} </Radio>
                        <Radio value={2} style={styles.radio}> {'Date Added (latest first)'} </Radio>
                        <Radio value={3} style={styles.radio}> {'Team (A-Z)'} </Radio>
                        <Radio value={4} style={styles.radio}> {'ID Number'} </Radio> */}
                    </Radio.Group>
                </TopbarDropdownWrapper>
            )
        } else if (visibleSetting) {
            if (selected === 'visitor') {
                return (
                    <TopbarDropdownWrapper className="isoUserDropdown">
                        <div style={{padding: 16}}>
                            <p 
                                style={styles.textModal}
                                onClick={() => this.setIsCreate(true)}
                            > 
                                {'Add New Visitor'} 
                            </p>
                            <p style={styles.textModal}> 
                                {'Approve Visitor'} 
                            </p>
                            <p style={styles.textModal}> 
                                {'Download Visitor list'} 
                            </p>
                            <p style={styles.textModal} > 
                                {'Bulk Upload Visitors'} 
                            </p>
                            <p style={styles.textModal}> 
                                {'Visitor Log'} 
                            </p>
                            <p style={styles.textModal}> 
                                {'Visitor Questions'} 
                            </p>
                        </div>
                    </TopbarDropdownWrapper>
                )
            } else {
                return (
                    <TopbarDropdownWrapper className="isoUserDropdown">
                        <div style={{padding: 16}}>

                            <p 
                                style={styles.textModal}
                                onClick={() => this.setIsCreate(true)}
                            > 
                                {'Add New Employee'} 
                            </p>
                            <p style={styles.textModal}> 
                                {'Approve Employee'} 
                            </p>
                            <p style={styles.textModal}> 
                                {'Download Employee list'} 
                            </p>
                            <p style={styles.textModal}> 
                                {'Bulk Upload Employees'} 
                            </p>
                            <p style={styles.textModal}> 
                                {'Employee Log'} 
                            </p>
                            <p style={styles.textModal}> 
                                {'Employee Questions'} 
                            </p>
                        </div>
                    </TopbarDropdownWrapper>
                )
            }
        } 
        return null;
    }

    renderTop = () => {
        const content = this.renderContent();
        const {visibleFilter, visibleSetting, selectedRowKeys, selected} = this.state;
        let colorEmployee = selected === 'employee' ? '#000' : '#989898';
        let colorVisitor = selected === 'visitor' ? '#000' : '#989898';

        return (
            <div style={styles.topCtn}>
                <Menu 
                    mode="horizontal" 
                    selectedKeys={this.state.selected}
                    onClick={this.handleClick}
                    style={{width: '50%'}}
                >
                    <Menu.Item key="employee" style={{fontSize: 14, fontWeight: 'bold', color: colorEmployee}}>
                        {'EMPLOYEES'}
                    </Menu.Item>
                    <Menu.Item key="visitor" style={{fontSize: 14, fontWeight: 'bold', color: colorVisitor}}>
                        {'VISITORS'}
                    </Menu.Item>
                </Menu>
                <div 
                    style={styles.rightTop} 
                    className="right"
                >
                    {
                        selectedRowKeys.length > 0 && 
                        <div
                            style={{
                                cursor: 'pointer'
                            }}
                            onClick={this.handleDelete}
                        >
                            <DeleteOutlined
                                style={styles.icon}
                            />
                        </div>
                    }

                    <Popover
                        arrowPointAtCenter
                        content={content}
                        onVisibleChange={this.changeVisibleFilter}
                        placement="bottomLeft"
                        trigger="click"
                        visible={visibleFilter}
                        >
                       <FilterOutlined
                            style={styles.icon2}
                        />
                    </Popover>

                    <div style={{cursor: 'pointer'}}
                        onClick={this.changeVisibleStat}
                    >
                        <BarChartOutlined
                            style={styles.icon2}
                        />
                    </div>

                    <Popover
                        arrowPointAtCenter
                        content={content}
                        onVisibleChange={this.changeVisibleSetting}
                        placement="bottomLeft"
                        trigger="click"
                        visible={visibleSetting}
                        >
                       <SettingOutlined
                            style={styles.icon2}
                        />
                    </Popover>
                </div>
            </div>
        )
    }

    renderProfile = () => {
        const { actions, updated, created } = this.props;
        const { isCreate, selected, record, isEdit } = this.state;
        if (isCreate) {
            return (
                <AddUser
                    selected={selected}
                    created={created}
                    createUser={actions.createUser}
                    setIsCreate={this.setIsCreate}
                />
            )
        }
        return (
            <Profile
                selected={selected}
                record={record}
                isEdit={isEdit}
                setIsEdit={this.setIsEdit}
                actions={actions}
                updated={updated}
            />
        )
    }

    renderItem = (title, number) => {
        return (
            <>
                <div style={styles.itemCtn}>
                    <div style={styles.left}>
                        <div style={styles.iconCtn}>
                            <UserOutlined
                                style={{color: '#fff'}}
                            />
                        </div>
                        <p style={styles.text}>{title}</p>
                    </div>
                    <p style={styles.number}>{number}</p>
                </div>
                <div style={styles.border}/>
            </>

        )
    }

    renderStat = () => {
        return (
            <div style={{padding: 20}}>
                <p style={{fontSize: 14, fontWeight: 'bold', color: '#000'}}> {'QUICK STATS'} </p>
                <div style={styles.border}/>
                {this.renderItem('Total Employees', 250)}
                {this.renderItem('Suspended Employees', 14)}
                {this.renderItem('Groups', 7)}
                {this.renderItem('Join requests pending', 4)}
                {this.renderItem('Total Admins', 2)}
                {this.renderItem('Total Visitors', 194)}
                {this.renderItem('Current Visitors', 2)}
                {this.renderItem('Visitor request pending', 0)}
            </div>
        )
    }

    render () {
        const { totalItems, actions, upload } = this.props;
        const {selected, redirect, visibleStat, dataSource} = this.state;
        const role = Auth.getRole();
        
        if (redirect) {
            if (selected === 'visitor') {
                return <Redirect to={'/' + role + '/people/visitor'}/>
            } else {
                return <Redirect to={'/' + role + '/people/employee'}/>
            }
        }

        return (   
            <LayoutContentWrapper>
                <PeopleStyle>
                    <div style={styles.header}>
                        <AppstoreOutlined
                            style={{color: '#000', marginRight: 10}}
                        />
                        <p style={{fontSize: 13, color: '#000'}}> {'DASHBOARD / PEOPLE'} </p>
                    </div>
                    <div className="body">
                        <div className="table">
                            <LayoutContent>
                                {this.renderTop()}
                                <Table
                                    selected={selected}
                                    onSelectChange={this.onSelectChange}
                                    dataSource={dataSource}
                                    handleItem={this.handleItem}
                                    got={this.props.got}
                                    totalItems={totalItems}
                                    getAllUsers={actions.getAllUsers}
                                    upload={upload}

                                />
                            </LayoutContent>
                        </div>
                        <div className="profile">
                            <LayoutContentProfile>
                            {
                                !visibleStat && 
                                this.renderProfile()
                            }
                            {
                                visibleStat &&
                                this.renderStat()
                            }
                            </LayoutContentProfile>
                        </div>
                    </div>
                </PeopleStyle>
            </LayoutContentWrapper>
        )
    }
}

export default People;

const styles = {
    header: {
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center',
        marginBottom: 30
    },
    topCtn: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },
    rightTop: {
        display: 'flex', 
        flexDirection: 'row', 
        width: '50%',
        justifyContent: 'flex-end'
    },
    icon: {fontSize: 20, color: '#000', marginTop: 15},
    icon2: {fontSize: 20, color: '#000', marginLeft: 20, marginTop: 15},
    radio: {
        fontSize: 12,
        color: '#989898'
    },
    itemCtn: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 32,
        marginTop: 15,
    },
    iconCtn: {
        width: 28, 
        height: 28, 
        backgroundColor: '#000', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginRight: 11
    },
    left: {
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center'
    },
    text: {
        fontSize: 12,
        color: '#989898'
    },
    number: {
        fontSize: 14,
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'right'
    },
    textModal: {
        fontSize: 12,
        color: '#989898',
        marginBottom: 13,
        cursor: 'pointer'
    },
    border: {height: 1, backgroundColor: '#DEE2E6', marginTop: 16}
}
