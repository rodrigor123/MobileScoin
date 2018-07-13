// import libraries
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Spinner from 'native-base';

// import scoin api methods
import scoinApi from '../../api/scoinApi';

// import global styles
import globalStyles from '../../config/globalStyles';

class SmallActionText extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { handleAction, text, style } = this.props;

        return (
            <View style={[Styles.boxContainer, style || {}]}>
                <Text style={Styles.inputStyle} onPress={handleAction}>{text}</Text>
            </View>
        );
    }
};

const Styles = {
    boxContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    inputStyle: {
        fontSize: globalStyles.linkSize,
        color: globalStyles.linkColor,
        paddingLeft: 10,
        paddingVertical: 5
    }
};

export default SmallActionText;