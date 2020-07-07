import React, { Component } from 'react';
import { Menu, Radio, Table, Modal, Button } from 'antd';
import { 
    AppstoreOutlined,
    FilterOutlined,
    BarChartOutlined,
    SettingOutlined,
    UserOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import Popover from '@hoa/components/uielements/popover';
import TopbarDropdownWrapper from '@hoa/containers/Topbar/TopbarDropdown.styles.js';
import LayoutContentWrapper from '@hoa/components/utility/layoutWrapper';
import LayoutContent from '@hoa/components/utility/layoutContent';
import LayoutContentProfile from '@hoa/components/utility/layoutContentProfile';
import PeopleStyle from '@hoa/assets/styles/People/PeopleStyle';
import { withRouter } from 'react-router-dom';
import { objectToArray } from '@hoa/utils/convert_data';
import Row from '@hoa/components/Row';
import createNotification from '@hoa/components/Notification';
import BuildingDetail from '@hoa/components/BuildingDetail';

const { confirm } = Modal;
const PER_PAGE = 10;
class Building extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            selected: 'building',
            selectedRowKeys: [],
            isCreate: false,
            isEdit: false,
            current: 1,
            record: objectToArray(props.buildings)[0] ? objectToArray(props.buildings)[0] : {}
        }
    }

    componentDidMount() {
        const { actions } = this.props;
        actions.getAllBuildings(1, PER_PAGE);
    }
    
    componentDidUpdate(prevProps) {
        const { deleted, got, buildings } = this.props;
        if (JSON.stringify(buildings) !== JSON.stringify(prevProps.buildings)) {
            this.setState({
                record: objectToArray(buildings)[0] ? objectToArray(buildings)[0] : {}
            })
        }

        if (JSON.stringify(deleted) !== JSON.stringify(prevProps.deleted)) {
            const { status, error } = deleted;
            if (status === 'started') {
                this.setState({
                    loading: true
                })
            } else if (status === 'success') {
                this.setState({
                    loading: false
                })
                createNotification('success', 'Delete buildings success', '');
            } else if (status === 'failure') {
                this.setState({
                    loading: false
                })
                createNotification('error', 'Delete buildings failure');
            }
        }

        if (JSON.stringify(got) !== JSON.stringify(prevProps.got)) {
            const { status } = got;
            if (status === 'started') {
                this.setState({
                    loading: true
                })
            } else  {
                this.setState({
                    loading: false
                })
            } 
        }
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

    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };

    setIsCreate = (value) => {
        this.setState({
            isCreate: value,
            isEdit: false,
            visibleSetting: false,
            visibleStat: false
        })
    }

    setIsEdit = (value) => {
        this.setState({
            isEdit: value,
            visibleSetting: false,
            visibleStat: false,
            isCreate: false
        })
    }

    handleDelete = () => {
        const { actions } = this.props;
        const { selectedRowKeys } = this.state;
        confirm({
            title: 'Do you want to delete these buildings?',
            icon: <ExclamationCircleOutlined />,
            // content: 'When clicked the OK button, this dialog will be closed after 1 second',
            onOk() {
                actions.deleteBuildings(selectedRowKeys)
            },
            onCancel() {},
          })
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
                {this.renderItem('Total Spaces', 250)}
                {this.renderItem('Total Offices', 14)}
                {this.renderItem('Total Hot Desks', 7)}
                {this.renderItem('Total Conference rooms', 4)}
                {this.renderItem('Total Admins', 2)}
                {this.renderItem('Total Visitors', 194)}
                {this.renderItem('Current Visitors', 2)}
                {this.renderItem('Visitor request pending', 0)}
            </div>
        )
    }

    renderContent = () => {
        const { isAdmin } = this.props;
        const {visibleFilter, radio, visibleSetting} = this.state;
        if (visibleFilter) {
            return (
                <TopbarDropdownWrapper className="isoUserDropdown">
                    <Radio.Group 
                        onChange={this.onChangeRadio} 
                        value={radio}
                        style={{padding: 16}}
                        size="small"
                    >
                        <Radio value={1} style={styles.radio}> {'Name Assending'} </Radio>
                        <Radio value={2} style={styles.radio}> {'Date Added (latest first)'} </Radio>
                        <Radio value={3} style={styles.radio}> {'Team (A-Z)'} </Radio>
                        <Radio value={4} style={styles.radio}> {'ID Number'} </Radio>
                    </Radio.Group>
                </TopbarDropdownWrapper>
            )
        } else if (visibleSetting) {
                return (
                    <TopbarDropdownWrapper className="isoUserDropdown">
                        <div style={{padding: 16}}>
                            {
                                isAdmin && 
                                <p 
                                    style={styles.textModal}
                                    onClick={() => this.setIsCreate(true)}
                                > 
                                    {'Add New Builing'} 
                                </p>
                            }
                        </div>
                    </TopbarDropdownWrapper>
                )
        } 
        return null;
    }

    renderTop = () => {
        const { isAdmin } = this.props;
        const content = this.renderContent();
        const {visibleFilter, visibleSetting, selected, selectedRowKeys} = this.state;

        return (
            <div style={styles.topCtn}>
                <Menu 
                    mode="horizontal" 
                    selectedKeys={selected}
                    onClick={this.handleClick}
                    style={{width: '70%'}}
                >
                    <Menu.Item key="building" style={styles.menuItem}>
                        {'BUILDINGS & FLOORS'}
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

                    {
                        isAdmin && 
                        <div
                            style={{
                                cursor: 'pointer'
                            }}
                            onClick={this.changeVisibleStat}
                        >
                            <BarChartOutlined
                                style={styles.icon2}
                            />
                        </div>
                    }

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

    handleItem = (record) => {
        this.setState({
            record,
            visibleStat: false,
            isCreate: false,
            isEdit: false
        })
    }

    onChangePage = (page) => {
        this.setState({
            current: page,
        }, () => {
            this.props.actions.getAllBuildings(page, PER_PAGE);
        })
    }

    renderTable = () => {
        const { isAdmin, totalItems, buildings } = this.props;
        const {selectedRowKeys, current, loading} = this.state;
        
        const columns = isAdmin ? setColumnsAdmin() : setColumnsUser();

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        const mergedColumns = columns.map(col => {
            if (col.key === 'is_automation') {
                return {
                    ...col,
                    onCell: (record) => ({
                      record,
                      dataindex: record.id,
                      title: col.title,
                      handleItem: this.handleItem,
                      align: 'right',
                    //   width: '10%'
                    }),
                  };
            }
            return {
              ...col,
              onCell: (record) => ({
                record,
                dataindex: record.id,
                title: col.title,
                handleItem: this.handleItem,
              }),
            };
          });

        return (  
            <Table 
                components={{
                    body: {
                        cell: Row,
                    },
                }}
                rowSelection={rowSelection} 
                dataSource={objectToArray(buildings)} 
                columns={mergedColumns} 
                pagination={{
                    current,
                    onChange: this.onChangePage,
                    defaultPageSize: 10,
                    total: totalItems,
                    position: ['bottomCenter']
                }}
                rowKey={record => record.id}
                loading={loading}
            />
                
        )
    }

    render () {
        const { isAdmin } = this.props;
        const {
            isCreate, 
            isEdit,
            visibleStat, 
            record, 
        } = this.state;

        return (    
            <LayoutContentWrapper>
                <PeopleStyle>
                    <div style={styles.header}>
                        <AppstoreOutlined
                            style={{color: '#000', marginRight: 10}}
                        />
                        <p style={{fontSize: 13, color: '#000'}}> {'DASHBOARD / SPACES / BUILDINGS & FLOORS'} </p>
                    </div>
                    <div className="body">
                        <div className="table">
                            <LayoutContent>
                                {this.renderTop()}
                                {this.renderTable()}
                            </LayoutContent>
                        </div>
                        <div className="profile">
                            <LayoutContentProfile>
                                {
                                    visibleStat ? this.renderStat() : 
                                    <BuildingDetail
                                        isCreate={isCreate}
                                        setIsCreate={this.setIsCreate}
                                        isEdit={isEdit}
                                        setIsEdit={this.setIsEdit}
                                        record={record}
                                    />
                                }
                            </LayoutContentProfile>
                        </div>
                    </div>
                </PeopleStyle>
            </LayoutContentWrapper>
        )
    }
}

export default withRouter(Building);

const styles = {
    header: {
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center',
        marginBottom: 30
    },
    topCtn: {display: 'flex', flexDirection: 'row', justifyContent: 'space-between'},
    rightTop: {
        display: 'flex', 
        flexDirection: 'row', 
        width: '30%',
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
        height: 42,
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
    menuItem: {fontSize: 14, fontWeight: 'bold'}
}

const setColumnsAdmin = () => {
    return [
        {
          title: 'BUILDING NAME',
          dataIndex: 'name',
          key: 'name',
          render: name => (
            <p style={{fontSize: 12, color: '#989898'}}>{name}</p>
          )
        },
        {
          title: 'ADDRESS',
          dataIndex: 'address',
          key: 'address',
          render: address => (
            <p style={{fontSize: 12, color: '#989898'}}>{address}</p>
          )
        },
        {
            title: 'LIST OF FLOORS',
            dataIndex: 'floors',
            key: 'floors',
            render: floors => {
                const list = floors.split(' ');
                let str = '';
                list.map(l => {
                    str += (parseInt(l) < 10 ? '0' + l : l) + ', ';
                })
                str = str.substr(0, str.length - 2);
                return (
                    <p style={{fontSize: 12, color: '#989898'}}>{str}</p>
                  )
            }
        },
        {
            title: 'NO. OF SPACES',
            dataIndex: 'no',
            key: 'no',
            render: () => (
              <p style={{fontSize: 12, color: '#989898'}}>{'06'}</p>
            )
          },
    ];
}

const setColumnsUser = () => {
    return [
        {
          title: 'SPACE NAME',
          dataIndex: 'name',
          key: 'name',
          render: name => (
            <p style={{fontSize: 12, color: '#989898'}}>{name}</p>
          )
        },
          {
              title: 'AMENITIES',
              dataIndex: 'amenities',
              key: 'amenities',
              render: list => {
                  return (
                      <p style={{fontSize: 12, color: '#989898'}}>{'amenities'}</p>
                      // <div style={{display: 'flex', flexDirection: 'row'}}>
                      //     {
                      //         list.map(l => {
                      //         return (
                      //             <div style={{marginRight: 10}} key={l}>
                      //               <WifiOutlined style={{fontSize: 20}}/>
                      //             </div>
                      //         )
                      //         })
                      //     }
                      // </div>
                  )
              }
          },
        {
            title: 'PEOPLE',
            dataIndex: 'people',
            key: 'people',
            render: a => {
                return (
                    <p style={{fontSize: 12, color: '#989898'}}>{'people'}</p>
                )
            }
        },
        {
            title: 'STATUS',
            dataIndex: 'status',
            key: 'status',
            render: status => {
                return (
                    <p style={{fontSize: 12, color: '#989898'}}>{status}</p>
                )
            }
        },
        {
            title: '',
            dataIndex: 'action',
            key: 'action',
            // width: '27%',
            align: 'right',
            render: () => {
                return (
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button
                            shape='round'
                            style={{
                                width: 78,
                                height: 28,
                                backgroundColor: '#000',
                                color: '#fff',
                                fontSize: 13,
                                textAlign: 'center'
                            }}
                        >
                            {'Call'}
                        </Button>
                        
                        <Button
                            shape='round'
                            style={{
                                width: 78,
                                height: 28,
                                backgroundColor: '#4BD662',
                                color: '#fff',
                                fontSize: 13,
                                marginLeft: 10,
                                textAlign: 'center'
                            }}
                        >
                            {'Book'}
                        </Button>
                    </div>
                )
            }
        },
    ];
}
  
  
