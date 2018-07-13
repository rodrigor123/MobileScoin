import React from 'react';
import { Text, View} from 'react-native';
import { Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import colors from '../../config/colors'

const LoginFooterButtons = ({ actionText, cancelText, onActionPress, onCancelPress, style, hideCancel = false }) => {
    const { submitButtonContainer, submitButtonText, cancelTextStyle } = Styles;

    const cancelAction = onCancelPress || Actions.pop;

    return (
        <View style={style}>
            <Button full style={submitButtonContainer} onPress={onActionPress}>
                <Text style={submitButtonText}>{actionText || "Next"}</Text>
            </Button>
            {!hideCancel && <Button transparent full onPress={cancelAction}>
                <Text style={cancelTextStyle}>{cancelText || "Cancel"}</Text>
            </Button>}
        </View>
    );
};

const Styles = {
    submitButtonContainer: {
        backgroundColor: colors.blue,
        borderRadius: 5,
        shadowOpacity: 0,
        elevation: 0,
        marginBottom: 15
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    cancelTextStyle: {
        //color: '#5195FF',
        color: colors.blue,
        fontSize: 18
    }
};

export default LoginFooterButtons;