import React from 'react';
import { Input } from 'antd';
import { formatNumber } from '../until/formatNumber';

class NumericInput extends React.Component {
    onChange = e => {
        let value = e.target.value;
        value = value.replace(/,/g, '');
        const list = value.split('.');
        if (list[list.length-1].length === 3) {
            value = value.replace(/\./g,'');
        }
        
        const reg = /^-?[0-9]*(\.[0-9]*)?$/;
        
        if ((!isNaN(value) && reg.test(value)) || value === '') {    
            this.props.onChange(value);
        }
    };
  
    // '.' at the end or only '-' in the input box.
    onBlur = () => {
        const { value, onBlur, onChange } = this.props;
        if (!value) return null;
        let valueTemp = value.toString();
        if (value.toString().charAt(value.length - 1) === '.' || value.toString() === '-') {
            valueTemp = value.toString().slice(0, -1);
        }
        onChange(valueTemp.replace(/0*(\d+)/, '$1'));
        if (onBlur) {
            onBlur();
        }
    
    }

    render() {
        const { value } = this.props;
        
        return (
            <Input
                {...this.props}
                value={formatNumber(value)}
                onChange={this.onChange}
                // onBlur={this.onBlur}
                // placeholder="Input a number"
                className="input"
            />
        );
    }
}

export default NumericInput;