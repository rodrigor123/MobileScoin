import React, { Component } from 'react';
import { View } from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';

class Toasters extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { types } = this.props;

        return (
            <View>
                {types.map(type => {
                    return (
                        <Toast
                            key={type}
                            ref={type}
                            style={Styles.toastStyle[type]}
                            position='center'
                            fadeInDuration={500}
                            fadeOutDuration={500}
                            opacity={0.9}
                            textStyle={Styles.toastText}
                        />
                    )
                })}
            </View>
        );
    }
}

const Styles = {
    toastStyle: {
        error: {
            backgroundColor: 'red'
        },
        success: {
            backgroundColor: 'green'
        }
    },
    toastText: {
        color: '#fff'
    }
};

export default Toasters;