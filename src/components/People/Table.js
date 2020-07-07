import React, { Component } from 'react';
import { Table } from 'antd';
import Avatar from '@hoa/components/Avatar';
import Row from '@hoa/components/Row';

class TableComponent extends Component {
	state = {
		loading: false,
		current: 1
	}

	componentDidUpdate(prevProps) {
		const { got } = this.props;
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
	}}
    
    onSelectChange = selectedRowKeys => {
        this.props.onSelectChange(selectedRowKeys)
    };

    handleItem = (record) => {
      this.props.handleItem(record);
    }

    onChangePage = (page) => {
      const { spaces, type } = this.state;
      this.setState({
          current: page,
      }, () => {
          this.props.getAllUsers(page, 10);
      })
  }

    render () {
        const { current } = this.state;
        const {selected, selectedRowKeys, dataSource, totalItems, upload} = this.props;
        let columns = columnsEmployee;
        if (selected === 'visitor') {
            columns = columnsVisitor
        }
        
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        }; 

        const mergedColumns = columns.map(col => {
          if (col.key === 'group' || col.key === 'id') {
            return {
              ...col,
              onCell: (record) => ({
                record,
                dataindex: record.id,
                title: col.title,
                handleItem: this.handleItem,
                align: 'center'
              }),
            };
          } else if (col.key === 'photo') {
			  return {
				  ...col,
				  render: (image, record) => {
					// console.log(record);
					return (
						<Avatar
							image={image}
							size={30}
							userId={record.id}
							user={record}
							upload={upload}
						/>
					)
				  }
			  }
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
              // rowSelection={rowSelection} 
              dataSource={dataSource} 
              columns={mergedColumns} 
              pagination={{
                current,
                onChange: this.onChangePage,
                defaultPageSize: 10,
                total: totalItems,
                position: ['bottomCenter']
              }}
              rowKey={record => record.id}
              loading={this.state.loading}
            />
        )
    }
}

export default TableComponent;

// const dataSource = [
//     {
//         key: '1',
//         photo: image1,
//         name: 'Mike',
//         email: "John@hogar.com",
//         phone: '123456789',
//         organization: 'TATA consultancy',
//         group: 'Testing',
//         idNumber: '987654321'
//     },
//     {
//         key: '2',
//         photo: image2,
//         name: 'John',
//         email: "John@hogar.com",
//         phone: '123456789',
//         organization: 'TATA consultancy',
//         group: 'Testing',
//         idNumber: '987654321'
//     },
//   ];
  
const columnsEmployee = [
    {
        title: 'PHOTO',
        dataIndex: 'photo',
        key: 'photo',
        render: (image, record) => {
          // console.log(record);
          return (
                  <Avatar
                      image={image}
                      size={30}
                      userId={record.id}
                      user={record}
                  />
          )
        }
    },
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => (
        <p style={{fontSize: 12, color: '#989898'}}>{record.first_name + ' ' + record.last_name}</p>
      )
    },
    {
      title: 'EMAIL',
      dataIndex: 'email',
      key: 'email',
      render: name => (
        <p style={{fontSize: 12, color: '#989898'}}>{name}</p>
      )
    },
    {
        title: 'PHONE',
        dataIndex: 'phone',
        key: 'phone',
        render: name => (
            <p style={{fontSize: 12, color: '#989898'}}>{name}</p>
          )
    },
    {
        title: 'GROUP',
        dataIndex: 'group',
        key: 'group',
        align: 'center',
        render: name => (
            <p style={{fontSize: 12, color: '#989898'}}>{'group'}</p>
          )
    },
    {
        title: 'ID NUMBER',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        render: id => (
            <p style={{fontSize: 12, color: '#989898'}}>{id}</p>
          )
    },
];

const columnsVisitor = [
    {
        title: 'PHOTO',
        dataIndex: 'photo',
        key: 'photo',
        render: (image, record) => (
                <Avatar
                    image={''}
                    size={30}
                    userId={record.id}
                />
        )

    },
    {
      title: 'NAME',
      dataIndex: 'full_name',
      key: 'name',
      render: name => (
        <p style={{fontSize: 12, color: '#989898'}}>{name}</p>
      )
    },
    {
      title: 'EMAIL',
      dataIndex: 'email',
      key: 'email',
      render: name => (
        <p style={{fontSize: 12, color: '#989898'}}>{name}</p>
      )
    },
    {
        title: 'PHONE',
        dataIndex: 'phone',
        key: 'phone',
        render: phone => (
            <p style={{fontSize: 12, color: '#989898'}}>{phone}</p>
          )
    },
    {
        title: 'ORGANIZATION',
        dataIndex: 'organization',
        key: 'organization',
        render: name => (
            <p style={{fontSize: 12, color: '#989898'}}>{name}</p>
          )
    },
    {
        title: 'ID NUMBER',
        dataIndex: 'id',
        key: 'idNumber',
        render: id => (
            <p style={{fontSize: 12, color: '#989898'}}>{id}</p>
          )
    },
];