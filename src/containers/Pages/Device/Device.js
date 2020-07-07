import React, { Component } from 'react';
import { Menu, Radio, Table } from 'antd';
import { 
    AppstoreOutlined,
    FilterOutlined,
    BarChartOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import Popover from '@hoa/components/uielements/popover';
import TopbarDropdownWrapper from '@hoa/containers/Topbar/TopbarDropdown.styles.js';
import LayoutContentWrapper from '@hoa/components/utility/layoutWrapper';
import LayoutContent from '@hoa/components/utility/layoutContent';
import PeopleStyle from '@hoa/assets/styles/People/PeopleStyle';
import Detail from '@hoa/components/DeviceDetail';

class Device extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'device',
            visibleFilter: false,
            visibleStat: false,
            visibleSetting: false,
            radio: 1,
            redirect: false,
            selectedRowKeys: [],
            isCreate: false
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
            visibleSetting: false
        })
    }

    renderContent = () => {
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
                            <p 
                                style={styles.textModal}
                                onClick={() => this.setIsCreate(true)}
                            > 
                                {'Add New Device'} 
                            </p>
                        </div>
                    </TopbarDropdownWrapper>
                )
        } 
        return null;
    }

    renderTop = () => {
        const content = this.renderContent();
        const {visibleFilter, visibleSetting} = this.state;

        return (
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Menu 
                    mode="horizontal" 
                    selectedKeys={this.state.selected}
                    onClick={this.handleClick}
                    style={{width: '50%'}}
                >
                    <Menu.Item key="device" style={{fontSize: 14, fontWeight: 'bold'}}>
                        {'DEVICES'}
                    </Menu.Item>
                </Menu>
                <div 
                    style={{
                        display: 'flex', 
                        flexDirection: 'row', 
                        width: '50%',
                        justifyContent: 'flex-end'
                    }} 
                    className="right"
                >
                    <Popover
                        arrowPointAtCenter
                        content={content}
                        onVisibleChange={this.changeVisibleFilter}
                        placement="bottomLeft"
                        trigger="click"
                        visible={visibleFilter}
                        >
                       <FilterOutlined
                            style={styles.icon}
                        />
                    </Popover>

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

    renderTable = () => {
        const {selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        let pagination = true;
        if (dataSource.length < 11) {
          pagination = false
        } 
        return (  
            <Table 
              rowSelection={rowSelection} 
              dataSource={dataSource} 
              columns={columns} 
              pagination={pagination}
            />
        )
    }

    render () {
        const {isCreate} = this.state;
        return (   
            <LayoutContentWrapper>
                <PeopleStyle>
                    <div style={styles.header}>
                        <AppstoreOutlined
                            style={{color: '#000', marginRight: 10}}
                        />
                        <p style={{fontSize: 13, color: '#000'}}> {'DASHBOARD / DEVICES'} </p>
                    </div>
                    <div className="body">
                        <div className="table">
                            <LayoutContent>
                                {this.renderTop()}
                                {this.renderTable()}
                            </LayoutContent>
                        </div>
                        <div className="profile">
                            <LayoutContent>
                                <Detail
                                    isCreate={isCreate}
                                    setIsCreate={this.setIsCreate}
                                />
                            </LayoutContent>
                        </div>
                    </div>
                </PeopleStyle>
            </LayoutContentWrapper>
        )
    }
}

export default Device;

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
    }
}

const dataSource = [
    {
      key: '1',
      name: 'Lights 457',
      type: 'Non-Dimmable light',
      space: 'Godavari',
      current: false,
      group: 'Godavari Lights'
    },
    {
      key: '2',
      name: 'Lights 457',
      type: 'Non-Dimmable light',
      space: 'Godavari',
      current: true,
      group: 'Godavari Lights'
    },
  ];
  
  const columns = [
    {
      title: 'DEVICE NAME',
      dataIndex: 'name',
      key: 'name',
      render: name => (
        <p style={{fontSize: 12, color: '#989898'}}>{name}</p>
      )
    },
    {
      title: 'DEVICE TYPE',
      dataIndex: 'type',
      key: 'type',
      render: location => (
        <p style={{fontSize: 12, color: '#989898'}}>{location}</p>
      )
    },
    {
      title: 'SPACE',
      dataIndex: 'space',
      key: 'space',
      render: date => (
        <p style={{fontSize: 12, color: '#989898'}}>{date}</p>
      )
    },
    {
        title: 'CURRENT TYPE',
        dataIndex: 'current',
        key: 'current',
        align: 'center',
        render: type => {
            if (type) {
                return (
                    <p style={{fontSize: 12, color: '#989898'}}>{'ON'}</p>
                )
            }
            return (
                <p style={{fontSize: 12, color: '#989898'}}>{'OFF'}</p>
            )
        }
    },
    {
        title: 'DEVICE GROUP',
        dataIndex: 'group',
        key: 'group',
        render: date => (
            <p style={{fontSize: 12, color: '#989898'}}>{date}</p>
        )
    },
];
