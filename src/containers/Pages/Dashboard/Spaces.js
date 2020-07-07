import React, { Component } from 'react';
import { Table, Button } from 'antd';
import { WifiOutlined } from '@ant-design/icons';
import LayoutContent from '@hoa/components/utility/layoutContent';
import MeetingStyle from '@hoa/assets/styles/Dashboard/MeetingStyle';
import { objectToArray } from '../../../utils/convert_data';
import { Link } from 'react-router-dom';
import { Client4 } from 'hoa-redux/client';
class DashboardSpace extends Component {
	state = {
		buildings: {},
		loading: false
	}

	componentDidMount() {
		const { spaces } = this.props;
		Object.keys(spaces).map(key => {
			this.getBuilding(spaces[key].building_id)
		})
	}

	componentDidUpdate(prevProps) {
		const { spaces, got } = this.props;
		if (JSON.stringify(spaces) !== JSON.stringify(prevProps.spaces)) {
			Object.keys(spaces).map(key => {
				this.getBuilding(spaces[key].building_id)
			})
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
		if (Object.keys(this.state.buildings).includes(id.toString())) {
			return null;
		}
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

    render () {
	  const { spaces, isAdmin } = this.props;
	  const { buildings } = this.state;
      // const link = isAdmin ? 'space/all_spaces' : 'client/space/all_spaces';
      let dataSource = objectToArray(spaces);
      dataSource = dataSource.slice(0, 5);
      const columns = isAdmin ? setColumnAdmin(buildings) : setColumnClient(buildings);

        return (  
            <MeetingStyle>
                <LayoutContent>
                    <p style={styles.title}> 
                        {'SPACES & STATUS'} 
                    </p>
					        <div style={styles.border}/>

                  <Table 
                    dataSource={dataSource} 
                    columns={columns} 
                    pagination={false}
                    rowKey={record => record.id}
                    loading={this.state.loading}
                  />
                  
                  <Link style={styles.button} to={'space/all_spaces'}>
                    <div className={"button"}>
                      <p style={{fontSize: 12, color: '#757575'}}>
                        {'View All'}
                      </p>
                    </div>
                  </Link>
                </LayoutContent>
            </MeetingStyle>
        )
    }
}

export default DashboardSpace;

const styles = {
    title: {fontSize: 14, fontWeight: 'bold', color: '#000'},
   border: {height: 1, backgroundColor: '#DEE2E6', marginTop: 10, },
   button: {display: 'flex', justifyContent: 'center', marginTop: 15}
}

const setColumnAdmin = (buildings) => {
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
    if (!building) {
      return (
        <p style={{fontSize: 12, color: '#989898'}}>{''}</p>
      )
    }
            let str = '';
            if (building) {
                const { address } = building;
                str = address + ', ' + floor + 'rd Floor';
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
];
}

const setColumnClient = (buildings) => {
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
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: status => {
        if (status === 'A') { 
          return (
            <>
              <p style={{fontSize: 12, color: '#4BD662', fontWeight: 'bold'}}>{'AVAILABLE'}</p>
              <p style={{fontSize: 10, color: '#989898'}}> {'NEXT MEETING IN SO MIN'} </p>
            </>
          )
        }
        return (
          <>
            <p style={{fontSize: 12, color: '#FF0000', fontWeight: 'bold'}}>{'OCCUPIED'}</p>
            <p style={{fontSize: 10, color: '#989898'}}> {'RELEASED IN SO MIN'} </p>
          </>
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
            if (!building) {
              return (
                <p style={{fontSize: 12, color: '#989898'}}>{''}</p>
              )
            }
            let str = '';
            if (building) {
                const { address } = building;
                str = address + ', ' + floor + 'rd Floor';
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
      title: '',
      dataIndex: 'status',
      key: 'action',
      render: status => {
        if (status === 'A') { 
          return (
            <Button
              shape='round'
              style={{
                fontSize: 10,
                color: '#fff',
                backgroundColor: '#56DE47',
                width: 114,
                height: 23,
                textAlign: 'center'
              }}
            >
              {'INSTANT BOOK'}
            </Button>
          )
        }
        
        return (
          <Button
            shape='round'
            disabled={true}
            style={{
              fontSize: 10,
              color: '#fff',
              backgroundColor: '#B5B5B5',
              width: 114,
              height: 23,
              textAlign: 'center'
            }}
          >
            {'INSTANT BOOK'}
          </Button>
        )
      }
    },
];
}
  