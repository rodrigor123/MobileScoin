// import libraries
import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
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

class BankStepA1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            amount: '',
            note: ''
        }
    }

    static propTypes = {
        onPressNext: PropTypes.func.isRequired,
    }

    static defaultProps = {
        onPressNext: () => undefined,
    }

    render() {
        return (
            <View style={styles.contentView}>
                <ScrollView style={{flex: 1}}>
                    <LabeledTextInputWithIcon
                        handleValueChange={(value) => console.log(value)}
                        labelColor={colors.text}
                        icon="university"
                        label="Bank Info"
                        size={12}
                        value={"wells2"}
                        placeholder="Select Account"
                        type="picker"
                        options={[
                            { label: 'Wells Fargo xxx9632', value: 'wells'},
                            { label: 'Wells Frago xxx1185', value: 'wells2'}
                        ]}
                    />
                    <TextInput
                        style={styles.bankNameInput}
                        onChangeText={(text) => this.setState({bankName: text})}
                        underlineColorAndroid='transparent'
                        value={this.state.bankName}
                        placeholder="Bank Name"
                    />
                    <LabeledTextInputWithIcon
                        label="Account Details"
                        labelColor={colors.text}
                        icon="money"
                        size={12}
                        style={{ marginTop: 15 }}
                        handleValueChange={(value) => console.log(value)}
                        value={this.state.amount}
                        placeholder="Account Number" />
                    <View style={styles.checkView}>
                        <CheckBox
                            checkboxStyle={{width: 15, height: 15, borderColor: colors.gray}}
                            label='Checking'
                            onChange={(checked) => this.setState({Checking: checked})}
                        />
                        <CheckBox
                            checkboxStyle={{width: 15, height: 15, borderColor: colors.gray}}
                            label='Saving'
                            onChange={(checked) => this.setState({Saving: checked})}
                        />
                    </View>
                    <TextInputWithIcon
                        icon="vcard-o"
                        size={12}
                        style={{ marginTop: 15 }}
                        handleValueChange={(value) => console.log(value)}
                        value={this.state.note}
                        placeholder="Account nickname" />
                    <View style={styles.defaultView}>
                        <CheckBox
                            checkboxStyle={{width: 15, height: 15, borderColor: colors.gray}}
                            labelStyle={{color: colors.red}}
                            label='Set as default account'
                            onChange={(checked) => this.setState({SetDefault: checked})}
                        />
                    </View>
                    <MyButton
                        style={{marginTop: 25}}
                        type='solid'
                        text="Add Bank Account"
                        onPress={() => this.props.onPressNext()} />
                </ScrollView>                
            </View>
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

    bankNameInput: {
        marginTop: 10, 
        height: 40, 
        marginLeft: 40, 
        backgroundColor: colors.lightGray,
        borderRadius: 4,
        paddingLeft: 10
    },
    checkView: {
        paddingLeft: 40,
        paddingTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    defaultView: {
        paddingTop: 25,
        paddingLeft: 5
    }
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
  return {   

  }
}, mapDispatchToProps)(BankStepA1);