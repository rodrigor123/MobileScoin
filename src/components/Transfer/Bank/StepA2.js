// import libraries
import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../actions'
import { Spinner, Content } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Toast, { DURATION } from 'react-native-easy-toast';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from 'react-native-checkbox'
// import components
import TextWrapper from '../../common/TextWrapper';
import LabeledTextInputWithIcon from '../../common/LabeledTextInputWithIcon';
import SmallActionText from '../../common/SmallActionText';
import LoginFooterButtons from '../../common/LoginFooterButtons';
import TextInputWithIcon from '../../common/TextInputWithIcon'
import MyButton from '../../common/ActionButton'
import colors from '../../../config/colors'

class BankStepA2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            amount: '',
            note: ''
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
                <View style={styles.container}>
                    <Text style={styles.labelText}>Adding Bank Account</Text>
                    <Text style={[styles.bigText, {fontWeight: 'bold'}]}>Wells Fargo</Text>
                    <Text style={styles.bigText}>Checking</Text>
                    <Text style={styles.labelText}>Routing Number</Text>
                    <Text style={styles.bigText}>8542 9632</Text>
                    <Text style={styles.labelText}>Account Number</Text>
                    <Text style={styles.bigText}>1010 0012 5241 3652</Text>
                    <View style={styles.aboutView}>
                        <Text style={styles.aboutText}>
                            Aliquam erat volutpat. Nam lacinia, urna quis ultrices commodo, ex sapien consectetur enim, eget
                            posuere magna est sed augue. In vulputate nisi lacus, etaccumsan velit ornare vel.
                        </Text>
                    </View>
                    <MyButton text='Edit' type='border' onPress={() => this.props.onPressEdit()} />
                    <MyButton text='Confirm' type='solid' onPress={() => this.props.onPressConfirm()} />
                </View>
            </Content>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1, 
        paddingHorizontal: 20, 
        paddingVertical: 10
    },
    labelText: {
        color: colors.text,
        fontSize: 16,
        paddingHorizontal: 10
    },
    bigText: {
        fontSize: 30,
        color: colors.darkGray,
        paddingLeft: 20,
        paddingVertical: 10
    },
    aboutView: {
        borderTopWidth: 1,
        borderColor: colors.gray,
        marginHorizontal: -15,
    },
    aboutText: {        
        fontSize: 12,
        color: colors.gray,
        padding: 20,        
    }
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
  return {   

  }
}, mapDispatchToProps)(BankStepA2);