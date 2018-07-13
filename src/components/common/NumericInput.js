import React, { Component } from 'react';
import { TextInput } from 'react-native';

class NumericInput extends Component {
    static defaultProps = {
        value: '',
        maxLength: 12,
        placeholder: 'Phone number',
        editable: true
    };

    constructor(props) {
        super(props);

        this.onChanged = this.onChanged.bind(this);
    }

    componentDidMount() {
        this.onChanged(this.props.value);
    }

    onChanged(text){
        let newValue = '';
        let numbers = '0123456789';

        for (let i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1) {
                newValue = newValue + text[i];
            }
        }

        if(newValue.length > 3) newValue = newValue.slice(0, 3) + "-" + newValue.slice(3);
        if(newValue.length > 7) newValue = newValue.slice(0, 7) + "-" + newValue.slice(7);

        if(this.props.handleValueChange) this.props.handleValueChange(newValue);
    }

    render() {
        return (
            <TextInput
                style={this.props.style}
                keyboardType='numeric'
                onChangeText={this.onChanged}
                value={this.props.value}
                editable={this.props.editable}
                maxLength={this.props.maxLength}
                underlineColorAndroid="transparent"
                placeholder={this.props.placeholder}
                autoCorrect={false}
            />
        );
    }
}

export default NumericInput;