import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TextListWithIcon = (props) => {
    const { list, style, size, textStyle, rules } = props;

    return (
        <View style={[Styles.listStyle, style || {}]}>
            {list.map((item, index) => {
                const isValid = rules[item.name];
                return (
                    <View key={index} style={Styles.listItemStyle}>
                        <Icon size={size || 25} name={isValid ? 'check' : 'remove'} color={isValid ? '#32CD32' : 'red'} />
                        <Text style={[Styles.textStyle, textStyle || {}]}>{item.text}</Text>
                    </View>

                );
            })}
        </View>
    );
};

const Styles = {
    listStyle: {
        flexDirection: 'column'
    },
    listItemStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 14,
        color: '#555',
        paddingLeft: 5
    }
};

export default TextListWithIcon;