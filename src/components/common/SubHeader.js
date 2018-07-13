// import libraries
import React from 'react';
import { View } from 'react-native';

// import components
import TextWrapper from '../common/TextWrapper';

const SubHeader = ({text, rightText}) => {
    const { container, textStyle } = Styles;

    return (
        <View style={container}>
            <TextWrapper title style={textStyle}>
                { text || 'Title' }
            </TextWrapper>
            <TextWrapper style={{ color: '#888' }}>
                { rightText }
            </TextWrapper>
        </View>
    );
};

const Styles = {
    container: {
        padding: 12,
        backgroundColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textStyle: {
        color: '#555'
    }
};

export default SubHeader;