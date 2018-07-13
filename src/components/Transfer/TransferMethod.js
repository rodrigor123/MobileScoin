// import libraries
import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions'
import { Actions } from 'react-native-router-flux';
import { Content } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

// import components
import TextWrapper from '../common/TextWrapper';
import texts from '../../config/texts';

class TransferMethod extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        onPressScoin: PropTypes.func.isRequired,
        onPressBank: PropTypes.func.isRequired
    }

    static defaultProps = {
        onPressScoin: () => undefined,
        onPressBank: () => undefined
    }

    render() {
        const { container, actionContainer, iconContainer, actionTitle, actionText } = Styles,
        { title } = this.props;
        const pageText = texts.transfer.transferMethod

        return (
            <View style={{flex: 1}}>
                <View style={container}>                
                    <TouchableOpacity style={actionContainer} onPress={() => this.props.onPressScoin()}>
                        <View style={iconContainer}>
                            <Icon name="money" size={30} color="#5295FF" />
                        </View>
                        <TextWrapper style={actionTitle}>{pageText.scoinMember}</TextWrapper>
                        <TextWrapper style={actionText}>{pageText.scoinMemberText}</TextWrapper>
                    </TouchableOpacity>
                    <TouchableOpacity style={actionContainer} onPress={() => this.props.onPressBank()}>
                        <View style={iconContainer}>
                            <Icon name="university" size={26} color="#5295FF" />
                        </View>
                        <TextWrapper style={actionTitle}>{pageText.bankAccount}</TextWrapper>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const Styles = {
    container: {
        marginTop: 150,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    actionContainer: {
        alignItems: 'center',
        flex: 0.5,
        paddingHorizontal: 30
    },
    iconContainer: {
        minHeight: 35
    },
    actionTitle: {
        color: "#5295FF",
        fontSize: 15,
        textAlign: 'center'
    },
    actionText: {
        color: "#aaa",
        fontSize: 12,
        textAlign: 'center',
        paddingTop: 5
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
  return {   

  }
}, mapDispatchToProps)(TransferMethod);