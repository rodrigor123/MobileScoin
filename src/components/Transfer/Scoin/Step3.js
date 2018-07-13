// import libraries
import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../actions'
import { Spinner, Content } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Toast, { DURATION } from 'react-native-easy-toast';
import Icon from 'react-native-vector-icons/FontAwesome';

// import components
import TextWrapper from '../../common/TextWrapper';
import LabeledTextInputWithIcon from '../../common/LabeledTextInputWithIcon';
import SmallActionText from '../../common/SmallActionText';
import LoginFooterButtons from '../../common/LoginFooterButtons';
import MyButton from '../../common/ActionButton'
import * as Operator from '../../../config/operator'
import colors from '../../../config/colors'

class ScoinStep3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    static propTypes = {
        onPressEdit: PropTypes.func.isRequired,
        onPressConfirm: PropTypes.func.isRequired,
    }

    static defaultProps = {
        onPressEdit: () => undefined,
        onPressConfirm: () => undefined
    }

    render() {

        return (
            <Content contentContainerStyle={styles.contentView}>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1, justifyContent: 'space-between'}}>
                            <Text style={styles.labelText}>Transferring</Text>
                            <Text style={styles.bigText}>{Operator.convertPhoneNumber(this.props.r_foundUserInfo.phoneNumber)}</Text>
                            <Text style={styles.bigText}>$ {this.props.r_transfer_amount}</Text>
                        </View>
                        <View style={{width: 60, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center'}}>
                            <TouchableOpacity onPress={() => this.props.onPressEdit()}>
                                <Text style={styles.editText}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.aboutView}>
                        <Text style={styles.aboutText}>
                            Copyrights 2017
                        </Text>
                    </View>
                    <MyButton text='Confirm' type='solid' onPress={() => this.props.onPressConfirm()} />
                </View>
            </Content>
        );
    }
}

const styles = StyleSheet.create({
    contentView: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 10,
        justifyContent: 'space-between'
    },
    labelText: {
        marginTop: 20,
        color: colors.gray,
        fontSize: 16,
        paddingHorizontal: 10
    },
    bigText: {
        fontSize: 28,
        color: colors.darkGray,
        paddingLeft: 20,
        paddingVertical: 5,
        marginVertical: 10,
        fontWeight: 'bold'
    },
    aboutView: {
        flex: 1,
        borderTopWidth: 1,
        borderColor: colors.gray,
        marginHorizontal: -15,
        marginTop: 20
    },
    aboutText: {        
        fontSize: 12,
        color: colors.gray,
        padding: 20,        
    },
    editText: {
        color: colors.blue,
        fontSize: 18,
        fontWeight: 'bold'
    }
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
  return {   
    r_foundUserInfo: state.foundUserInfo,
    r_transfer_amount: state.transfer_amount
  }
}, mapDispatchToProps)(ScoinStep3);