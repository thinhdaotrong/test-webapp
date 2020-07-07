import React, { Component } from 'react';
import { Menu, Radio, Table, Modal } from 'antd';
import { 
    AppstoreOutlined,
    FilterOutlined,
    BarChartOutlined,
    SettingOutlined,
    WifiOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import Popover from '@hoa/components/uielements/popover';
import TopbarDropdownWrapper from '@hoa/containers/Topbar/TopbarDropdown.styles.js';
import LayoutContentWrapper from '@hoa/components/utility/layoutWrapper';
import LayoutContent from '@hoa/components/utility/layoutContent';
import FeatureStyle from '@hoa/assets/styles/Feature/FeatureStyle';
import { objectToArray } from '../../../utils/convert_data';
import createNotification from '@hoa/components/Notification';
import FeatureDetail from '@hoa/components/FeatureDetail';
import Row from '@hoa/components/Row';

const { confirm } = Modal;
class Feature extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'feature',
            visibleFilter: false,
            visibleSetting: false,
            radio: 1,
            redirect: false,
            selectedRowKeys: [],
            isCreate: false,
            isEdit: false,
            loading: false,
            loadingGet: false,
            record: objectToArray(props.features)[0] ? objectToArray(props.features)[0] : {}
        }
    }

    componentDidMount() {
        const { actions } = this.props;
        actions.getAllFeatures();
    }

    componentDidUpdate(prevProps) {
        const { got, features, deleted } = this.props;
        if (JSON.stringify(features) !== JSON.stringify(prevProps.features)) {
            this.setState({
                record: objectToArray(features)[0] ? objectToArray(features)[0] : {}
            })
        }

        if (JSON.stringify(deleted) !== JSON.stringify(prevProps.deleted)) {
            const { status, error } = deleted;
            if (status === 'started') {
            } else if (status === 'success') {
                createNotification('success', 'Delete feature success', '');
            } else if ( status === 'failure') {
                createNotification('error', 'Delete feature failure', error ? error.message : '');
            }
        }

        if (JSON.stringify(got) !== JSON.stringify(prevProps.got)) {
            const { status } = got;
            if (status === 'started') {
                this.setState({
                    loadingGet: true
                })
            } else  {
                this.setState({
                    loadingGet: false
                })
            }
        }
    }


    changeVisibleFilter = () => {
        this.setState({
            visibleFilter: !this.state.visibleFilter
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
        this.setState({ 
            selectedRowKeys: selectedRowKeys[selectedRowKeys.length - 1] ? [selectedRowKeys[selectedRowKeys.length - 1]] : []
        });
    };

    setIsCreate = (value) => {
        this.setState({
            isCreate: value,
            visibleSetting: false,
            isEdit: false,
        })
    }

    setIsEdit = (value) => {
        this.setState({
            isEdit: value,
            isCreate: false
        })
    }

    handleItem = (record) => {
        this.setState({
            record,
            visibleStat: false,
            isCreate: false,
            isEdit: false,
        })
    }

    handleDelete = () => {
        const { actions } = this.props;
        const { selectedRowKeys } = this.state;
        confirm({
            title: 'Do you want to delete these feature?',
            icon: <ExclamationCircleOutlined />,
            // content: 'When clicked the OK button, this dialog will be closed after 1 second',
            onOk() {
                actions.deleteFeatures(selectedRowKeys[0])
            },
            onCancel() {},
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
                                {'Add New Feature'} 
                            </p>
                        </div>
                    </TopbarDropdownWrapper>
                )
        } 
        return null;
    }

    renderTop = () => {
        const content = this.renderContent();
        const {visibleFilter, visibleSetting, selectedRowKeys} = this.state;

        return (
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Menu 
                    mode="horizontal" 
                    selectedKeys={this.state.selected}
                    onClick={this.handleClick}
                    style={{width: '50%'}}
                >
                    <Menu.Item key="feature" style={{fontSize: 14, fontWeight: 'bold'}}>
                        {'FEATURES'}
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
        const { features } = this.props;
        const { selectedRowKeys, loadingGet } = this.state;
        const dataSource = objectToArray(features);

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        const mergedColumns = columns.map(col => {
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
                dataSource={dataSource} 
                columns={mergedColumns} 
                pagination={{
                    defaultPageSize: 10,
                    position: ['bottomCenter']
                }}
                rowKey={record => record.id}
                loading={loadingGet}
            />
                
        )
    }


    render () {
        const { isCreate, isEdit, record } = this.state;
        return (   
            <LayoutContentWrapper>
                <FeatureStyle>
                    <div style={styles.header}>
                        <AppstoreOutlined
                            style={{color: '#000', marginRight: 10}}
                        />
                        <p style={{fontSize: 13, color: '#000'}}> {'DASHBOARD / SPACES / '} </p>
                        <p style={{fontSize: 13, color: '#707070'}}> {' FEATURES'} </p>
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
                                <FeatureDetail
                                    record={record}
                                    isCreate={isCreate}
                                    isEdit={isEdit}
                                    setIsEdit={this.setIsEdit}
                                    setIsCreate={this.setIsCreate}
                                />
                            </LayoutContent>
                        </div>
                    </div>
                </FeatureStyle>
            </LayoutContentWrapper>
        )
    }
}

export default Feature;

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
    textModal: {
        fontSize: 12,
        color: '#989898',
        marginBottom: 13,
        cursor: 'pointer'
    },
    input: {
        fontSize: 16, 
        color: '#000',
        backgroundColor: '#fff',
        borderRadius: 20
    },
    button: {
        width: '100%',
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        height: 42,
        backgroundColor: '#000'
    },
}
  
  const columns = [
    {
        title: 'FEATURE ICON',
        dataIndex: 'icon',
        key: 'icon',
        align: 'center',
        render: name => (
          <WifiOutlined style={{fontSize: 20}}/>
        )
      },
    {
      title: 'FEATURE NAME',
      dataIndex: 'name',
      key: 'name',
      render: name => (
        <p style={{fontSize: 12, color: '#989898'}}>{name}</p>
      )
    },
    {
      title: 'SPACES WITH FEATURES',
      dataIndex: 'spaces',
      key: 'spaces',
      render: list => {
        // let str = '';
        // list.map(l => {
        //     str += l + ', ';
        // })
        return (
            <p style={{fontSize: 12, color: '#989898'}}>{'Space'}</p>
        )
      }
    },
];
