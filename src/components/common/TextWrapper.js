import React from 'react';
import { Text} from 'react-native';

const TextWrapper = (props) => {
    const { title, subTitle, small, subTitleFade } = props;

    let textStyle = {};

    if (title) textStyle = Styles.title;
    if (subTitle) textStyle = Styles.subTitle;
    if (small) textStyle = Styles.small;
    if (subTitleFade) textStyle = Styles.subTitleFade;

    return (
        <Text style={[textStyle, props.style || {}]}>
            {props.children}
        </Text>
    );
};

const Styles = {
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000'
    },
    subTitle: {
        fontSize: 16,
        color: '#000'
    },
    subTitleFade: {
        fontSize: 16,
        color: '#aaa',
        fontWeight: 'bold'
    },
    small: {
        fontSize: 14,
        color: '#555'
    }
};

export default TextWrapper;