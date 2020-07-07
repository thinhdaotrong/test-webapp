import React from 'react';

class Row extends React.Component {
    render() {
        const { 
            handleItem,
            record,
            children,
            ...props } = this.props;
        return (
            <td 
                {...props} 
                onClick={() => {
                    if (handleItem) {
                        handleItem(record)
                    }
                }} 
                style={{cursor: 'pointer'}}
            >
                {children}
            </td>
        );
    }
}

export default Row;