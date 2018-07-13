//import libraries
import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class PinCodeWithIcon extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value.split('')
        }
    }

    createTextInput(id) {
        return (
            <TextInput
                key={id}
                ref={id}
                value={this.state.value[id]}
                style={Styles.inputStyle}
                maxLength={1}
                onChangeText={this.onChange.bind(this, id)}
                keyboardType = 'numeric'
                secureTextEntry={this.props.isPassword || false}
                underlineColorAndroid="transparent"
                autoCorrect={false}
            />
        )

    }

    onChange(id, value) {
        const newValue = this.state.value;

        newValue[id] = value;

        this.setState({
            value: newValue
        });

        if(value) {
            if(id < this.props.length-1) this.refs[id+1].focus();
        } else {
            if(id > 0) this.refs[id-1].focus();
        }

        this.props.handleValueChange(newValue.join(''))
    }

    render() {
        const { length, icon, style, size } = this.props;

        return (
            <View style={[Styles.boxContainer, style || {}]}>
                <Icon name={icon} size={size || 25} color="#000"/>
                <View style={Styles.inputContainer}>
                {
                    Array(...Array(length)).map((_, i) =>
                        this.createTextInput(i)
                    )
                }
                </View>
            </View>
        );
    }
};

const Styles = {
    boxContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputContainer: {
        flex: 1,
        marginLeft: 15,
        padding: 0,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    inputStyle: {
        height: 40,
        flex: 1,
        margin: 2,
        paddingHorizontal: 5,
        fontSize: 16,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#aaa',
        textAlign: 'center'
    }
};

export default PinCodeWithIcon;