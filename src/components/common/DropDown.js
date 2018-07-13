import React from 'react';
import { Picker } from 'native-base';

const Item = Picker.Item;

const DropDown = ({pickerStyle, styleInput, placeholder, value, handleValueChange, options}) => {
    return (
        <Picker
            style={pickerStyle}
            itemTextStyle={styleInput}
            supportedOrientations={['portrait']}
            iosHeader={placeholder}
            mode="dropdown"            
            selectedValue={value}
            onValueChange={handleValueChange}>
            {options.map(item => {
                return (
                    <Item key={item.value} label={item.label} value={item.value} />
                );
            })}
        </Picker>
    );
};

export default DropDown;