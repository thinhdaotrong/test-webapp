import React, { Component } from 'react';
import { Menu, Radio, Table, Modal, Button, Pagination } from 'antd';
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
import SpaceDetail from '@hoa/components/SpaceDetail';
import { Redirect, withRouter, Link } from 'react-router-dom';
import { objectToArray } from '../../../utils/convert_data';
import Row from '@hoa/components/Row';
import createNotification from '@hoa/components/Notification';
import { Client4 } from 'hoa-redux/client';
import Calendar from './Calendar';

const { confirm } = Modal;
const PER_PAGE = 10;
class Space extends Component {
    constructor(props) {
        super(props);
        const {location, actions} = props;
        let selected =location.pathname.substr(7, location.pathname.length);
        let spaces = objectToArray(props.spaces);
        selected  = selected.split('/')[1];
        let type = '';
        if (selected === 'office') {
            type = 'O';
        } else if (selected === 'hot_desk') {
            type = 'H';
        } else if (selected === 'conference') {
            type = 'C'
        }

        actions.getAllSpaces(1, PER_PAGE, type);

        spaces.map(s => {
            this.getBuilding(s.building_id);
        })

        this.state = {
            loading: false,
            selected,
            type,
            isChangeSelected: false,
            visibleFilter: false,
            visibleStat: false,
            visibleSetting: false,
            visibleCalendar: false,
            radio: 1,
            redirect: false,
            selectedRowKeys: [],
            isCreate: false,
            isEdit: false,
            spaces,
            record: spaces[0] || {},
            current: 1,
            buildings: {},
        }
    }

    // componentDidMount() {
    //     const { actions } = this.props;
    //     actions.getAllSpaces(1, PER_PAGE, '');
    // }
    
    componentDidUpdate(prevProps) {
        const { spaces, deleted, got } = this.props;
        if (JSON.stringify(spaces) !== JSON.stringify(prevProps.spaces)) {
            
            let spacesList = objectToArray(spaces);
            spacesList.map(s => {
                this.getBuilding(s.building_id);
            })
            this.setState({
                spaces: spacesList,
                record: spacesList[0] || {}
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
                createNotification('success', 'Delete spaces success', '');
            } else if (status === 'failure'){
                this.setState({
                    loading: false
                })
                createNotification('error', 'Delete spaces failure');
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

    getBuilding = async (id) => {
		try {
			const data = await Client4.getBuilding(id);
			
			if (data) {
                let buildings = this.state.buildings;
				buildings[id] = data;
				this.setState({
					buildings,
				})
			} else {
				let buildings = this.state.buildings;
				buildings[id] = {};
				this.setState({
					buildings,
				})
			}
		} catch {
			let buildings = this.state.buildings;
			buildings[id] = {};
			this.setState({
				buildings,
			})
        }
				
    }


    handleClick = (e) => {
        this.setState({
            selected: e.key,
            isChangeSelected: true
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

    changeVisibleCalendar = (value) => {
        this.setState({
            visibleCalendar: value
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
            title: 'Do you want to delete these spaces?',
            icon: <ExclamationCircleOutlined />,
            // content: 'When clicked the OK button, this dialog will be closed after 1 second',
            onOk() {
                actions.deleteSpaces(selectedRowKeys)
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
        const prefix = isAdmin ? '/admin' : '/client';
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
                                    {'Add New Space'} 
                                </p>
                            }
                            <p 
                                style={styles.textModal}
                            > 
                                {'Bulk New Spaces'} 
                            </p>
                            <p 
                                style={styles.textModal}
                            > 
                                {'Download Spaces list'} 
                            </p>
                            <Link to={ prefix + '/space/building'}>
                                <p
                                    style={styles.textModal}
                                > 
                                    {'List Of Buildings'} 
                                </p>
                            </Link>
                            <Link to={ prefix + '/space/feature'}>
                                <p 
                                    style={styles.textModal}
                                > 
                                    {'List Of Features'} 
                                </p>
                            </Link>
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
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Menu 
                    mode="horizontal" 
                    selectedKeys={selected}
                    onClick={this.handleClick}
                    style={{width: '70%'}}
                >
                    <Menu.Item key="all_spaces" style={styles.menuItem}>
                        {'ALL'}
                    </Menu.Item>
                    <Menu.Item key="office" style={styles.menuItem}>
                        {'OFFICES'}
                    </Menu.Item>
                    <Menu.Item key="hot_desk" style={styles.menuItem}>
                        {'HOT DESKS'}
                    </Menu.Item>
                    <Menu.Item key="conference" style={styles.menuItem}>
                        {'CONFERENCE ROOMS'}
                    </Menu.Item>
                </Menu>
                <div 
                    style={{
                        display: 'flex', 
                        flexDirection: 'row', 
                        width: '30%',
                        justifyContent: 'flex-end'
                    }} 
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
        })
    }

    onChangePage = (page) => {
        const { spaces, type } = this.state;
        this.setState({
            current: page,
        }, () => {
            this.props.actions.getAllSpaces(page, PER_PAGE, type);
        })
    }

    renderTable = () => {
        const { isAdmin, totalItems } = this.props;
        const {selectedRowKeys, spaces, current, buildings, loading} = this.state;
        
        const columns = isAdmin ? setColumnsAdmin(buildings) : setColumnsUser(buildings);

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
                dataSource={spaces} 
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
        const { buildings, isAdmin } = this.props;
        const {
            isCreate, 
            isEdit,
            visibleStat, 
            isChangeSelected, 
            selected, 
            record, 
            visibleCalendar
        } = this.state;
        const prefix = isAdmin ? '/admin' : '/client';
        if (isChangeSelected) {
            const pathname = prefix + '/space/' + selected;
            return (
                <Redirect to={pathname}/>
            )
        }
        return (    
            <LayoutContentWrapper>
                <PeopleStyle>
                    <div style={styles.header}>
                        <AppstoreOutlined
                            style={{color: '#000', marginRight: 10}}
                        />
                        <p style={{fontSize: 13, color: '#000'}}> {'DASHBOARD / SPACES'} </p>
                    </div>
                    <div className="body">
                        <div className="table">
                            <LayoutContent>
                                {
                                    visibleCalendar ? 
                                    <Calendar changeVisibleCalendar={this.changeVisibleCalendar}/> : 
                                    <>
                                        {this.renderTop()}
                                        {this.renderTable()}
                                    </>
                                }
                            </LayoutContent>
                        </div>
                        <div className="profile">
                            <LayoutContentProfile>
                                {
                                    visibleStat ? this.renderStat() : 
                                    <SpaceDetail
                                        isCreate={isCreate}
                                        setIsCreate={this.setIsCreate}
                                        isEdit={isEdit}
                                        setIsEdit={this.setIsEdit}
                                        record={record}
                                        changeVisibleCalendar={this.changeVisibleCalendar}
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

export default withRouter(Space);

const styles = {
    header: {
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center',
        marginBottom: 30
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

const setColumnsAdmin = (buildings) => {
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
          title: 'SPACE TYPE',
          dataIndex: 'type',
          key: 'type',
          render: type => {
              if (type === 'O') { 
                  return (
                      <p style={{fontSize: 12, color: '#989898'}}>{'Office'}</p>
                  )
              } else if (type === 'H') {
                  return (
                    <p style={{fontSize: 12, color: '#989898'}}>{'Hot Desks'}</p>
                  )
              }
            return (
                <p style={{fontSize: 12, color: '#989898'}}>{'Conference Rooms'}</p>
                )
          }
        },
        {
            title: 'LOCATION',
            dataIndex: 'building_id',
            key: 'building_id',
            render: (id, record) => {
                  const { floor } = record;
                  const building = buildings[id];
                  let str = '';
                  if (building) {
                      str = building.name + ', ' + floor + 'rd Floor';
                  }
                  return (
                      <p style={{fontSize: 12, color: '#989898'}}>{str}</p>
                  )
            }
          },
          {
              title: 'AMENITIES',
              dataIndex: 'amenities',
              key: 'amenities',
              render: amenities => {
                let str = '';
                amenities.map(a => {
                  str += a.name + ', ';
                })
                str = str.substr(0, str.length - 2);
                return (
                    <p style={{fontSize: 12, color: '#989898'}}>{str}</p>
                )
            }
          },
        {
            title: 'ROOM AUTOMATION',
            dataIndex: 'is_automation',
            key: 'is_automation',
            align: 'right',
            render: a => {
                if (a) {
                    return (
                        <p style={{fontSize: 12, color: '#989898'}}>{'YES'}</p>
                    )
                } 
                return (
                    <p style={{fontSize: 12, color: '#989898'}}>{'NO'}</p>
                )
            }
        },
    ];
}

const setColumnsUser = (buildings) => {
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
            title: 'LOCATION',
            dataIndex: 'building_id',
            key: 'building_id',
            render: (id, record) => {
                  const { floor } = record;
                  const building = buildings[id];
                  let str = '';
                  if (building) {
                      str = building.name + ', ' + floor + 'rd Floor';
                  }
                  return (
                      <p style={{fontSize: 12, color: '#989898'}}>{str}</p>
                  )
            }
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
  
  
