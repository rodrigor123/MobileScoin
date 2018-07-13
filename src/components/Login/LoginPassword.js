// import libraries
import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions'
import { Spinner, Content, Container } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Toast, { DURATION } from 'react-native-easy-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import components
import TextWrapper from '../common/TextWrapper';
import TextInputWithIcon from '../common/TextInputWithIcon';
import NameInputWithIcon from '../common/NameInputWithIcon';
import LoginFooterButtons from '../common/LoginFooterButtons';
import NumericInputWithIcon from '../common/NumericInputWithIcon';
import SmallActionText from '../common/SmallActionText';
import PinCodeWithIcon from '../common/PinCodeWithIcon';
import TextListWithIcon from '../common/TextListWithIcon';
import MyButton from '../common/ActionButton'
import CheckBox from 'react-native-checkbox'
import * as Storage from '../../config/storage'
import * as Operator from '../../config/operator'

class LoginPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            retype: '',
            safepin: '',
            password: '',
            email: '',
            showPassword: false,
            showPin: false,
            rules: {
                length: false,
                lowercase: false,
                uppercase: false,
                numbers: false,
                special: false
            },
        };
    }

    componentDidMount() {
        this.handlePasswordValueChange(this.state.password)
    }

    handlePasswordValueChange(value) {
        this.setState({
            rules: {
                length: this.validLength(value),
                numbers: this.validNumbers(value),
                lowercase: this.validLowerCase(value),
                uppercase: this.validUpperCase(value),
                special: this.validSpecial(value)
            },
            password: value
        });
    }

    validLength(value) {
        return value.length >= 8;
    }

    validNumbers(value) {
        return /\d/.test(value);
    }

    validLowerCase(value) {
        return /[a-z]/.test(value);
    }

    validUpperCase(value) {
        return /[A-Z]/.test(value);
    }

    validSpecial(value) {
        return /[@#$%!^&+=-]/.test(value)
    }

    handleSubmit() {
        if(this.checkValidation()) {
            this.setState({isLoading: true})
            const user = {
                phone: this.props.r_phone,
                email: this.state.email,
                password: this.state.password,
                pin: this.state.safepin
            }
            this.props.setUserData(user)
            this.props.a_register(user, (res) => {
                this.setState({isLoading: false})
                if(res == 'success'){
                    const data = {
                        touchID: this.props.r_touchID,
                        remember: false,
                        auto: false,
                        email: this.props.r_userInfo.email,
                        password: this.props.r_userInfo.password
                    }
                    Storage.setToStorage('setting', data, (res) => {
                        Actions[this.props.nextScene]();
                    })                    
                }
                else{
                    Operator.MyAlert('Log In', 'User already exists.')
                }
            }) 
        }
    }

    checkValidation() {
        const { length, numbers, lowercase, uppercase, special } = this.state.rules;

        if(!length || !numbers || !lowercase || !uppercase || !special) {
            return this.showError('Password must fulfill all rules above');
        }

        if(this.state.retype !== this.state.password) return this.showError('Passwords do not match');

        if(this.state.safepin.length < 6) return this.showError('Please enter 6 digit PIN code');

        if(this.state.email.length < 1) {
            return this.showError('Please provide an email address');
        }

        var emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!emailReg.test(this.state.email.replace(/ /g, ''))) return this.showError('Invalid email address');
        return true;
    }

    handleNextStep() {
        //save details

        Actions[this.props.nextScene]();
    }

    showError(message) {
        this.refs.toast.show(message, DURATION.LENGTH_LONG);
    }

    onChangeOption(value) {
        this.props.setTouchIDValue(value)
    }

    render() {
        const { contentView, container, pinContainer } = Styles
        const { pageText } = this.props

        return (
            <Container>
                <KeyboardAwareScrollView 
                    enableResetScrollToCoords={false}
                    extraScrollHeight={100}>
                    <View style={{padding: 20}}>
                        <NumericInputWithIcon
                            icon="phone"
                            size={25}
                            editable={false}
                            value={this.props.r_phone}
                            maxLength={12}
                        />
                        <TextInputWithIcon
                            style={{ marginTop: 10 }}
                            handleValueChange={(value) => this.setState({email: value})}
                            icon="envelope"
                            size={20}
                            value={this.state.email}
                            placeholder="Email"
                        />
                        <View style={{padding: 10}}>
                            <CheckBox
                                labelStyle={{fontWeight: 'bold'}}
                                checkboxStyle={{width: 15, height: 15, borderColor: colors.gray}}
                                label='Enable touchID login'
                                checked={this.props.r_touchID}
                                onChange={(checked) => this.onChangeOption(!checked)}
                            />
                        </View>
                        <TextWrapper title style={{ marginTop: 10 }}>
                            {pageText.title}
                        </TextWrapper>
                        <TextWrapper subTitleFade>
                            {pageText.subTitle}
                        </TextWrapper>
                        <TextListWithIcon
                            list={pageText.rules}
                            size={15}
                            rules={this.state.rules}
                            textStyle={{color: '#aaa'}}
                        />
                        <SmallActionText
                            text={this.state.showPassword ? "Hide password" : "Show password"}
                            handleAction={() => this.setState({ showPassword: !this.state.showPassword })}
                        />
                        <TextInputWithIcon
                            style={{ marginTop: 10 }}
                            handleValueChange={(value) => this.handlePasswordValueChange(value)}
                            isPassword={!this.state.showPassword}
                            icon="unlock"
                            size={20}
                            value={this.state.password}
                            placeholder="Password"
                        />
                        <TextInputWithIcon
                            icon='none'
                            style={{ marginTop: 10 }}
                            isPassword={!this.state.showPassword}
                            handleValueChange={(value) => this.setState({ retype: value })}
                            value={this.state.retype}
                            placeholder="Retype password"
                        />
                        <TextWrapper title style={{marginTop: 15}}>
                            {pageText.pinTitle}
                        </TextWrapper>
                        <TextWrapper small style={{marginTop: 5}}>
                            {pageText.pinText}
                        </TextWrapper>
                        <View style={pinContainer}>
                            <PinCodeWithIcon
                                style={{marginTop: 10, flex: 5}}
                                length={6}
                                icon="key"
                                size={20}
                                isPassword={!this.state.showPin}
                                value={this.state.safepin}
                                handleValueChange={(value) => this.setState({safepin: value})}
                            />
                            <SmallActionText
                                style={{flex: 2}}
                                text={this.state.showPin ? "Hide PIN" : "Show PIN"}
                                handleAction={() => this.setState({ showPin: !this.state.showPin })}
                            />
                        </View>
                        <MyButton
                            type='solid'
                            text='Submit'
                            isLoading={this.state.isLoading}
                            onPress={() => this.handleSubmit()}
                        />
                        <MyButton
                            type='transparent'
                            text='Cancel'
                            onPress={() => Actions.pop()}
                        />  
                    </View>        
                </KeyboardAwareScrollView>           
                <Toast
                    ref="toast"
                    style={{backgroundColor:'red'}}
                    position='center'
                    fadeInDuration={500}
                    fadeOutDuration={500}
                    opacity={0.9}
                    textStyle={{color:'#fff'}}
                />  
            </Container>
        );
    }
}

const Styles = {
    contentView: {
        padding: 20,
        justifyContent: 'space-between'
    },
    container: {
        flex: 1,
        margin: 10,
        paddingHorizontal: 5
    },
    textMargin: {
        marginTop: 15
    },
    pinContainer: {
        flexDirection: 'row',
        marginTop: 10
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
  return {   
      r_userInfo: state.userInfo,
      r_phone: state.pNumber,
      r_touchID: state.touchID
  }
}, mapDispatchToProps)(LoginPassword);