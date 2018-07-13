// import libraries
import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions'
import { Spinner, Content, Container } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Toast, { DURATION } from 'react-native-easy-toast';

// import components
import TextWrapper from '../common/TextWrapper';
import NumericInputWithIcon from '../common/NumericInputWithIcon';
import LoginFooterButtons from '../common/LoginFooterButtons';
import PinCodeWithIcon from '../common/PinCodeWithIcon';
import SmallActionText from '../common/SmallActionText';
import MyButton from '../common/ActionButton'
import * as Operator from '../../config/operator'
// import api
import scoinApi from '../../api/scoinApi';

class LoginOTP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pin: ''
        }
    }

    sendPinCode() {
        
        
    }

    handleValueChange(value) {
        
    }

    handleSubmit() {
        if(this.state.pin.length === 6) {
            const param = {
                phonenumber: this.props.pNumber,
                pin: this.state.pin
            }
            this.setState({isLoading: true})
            this.props.verifyOTP(param, (res) => {
                this.setState({isLoading: false})
                if(res == 'success' || 1){
                    this.handleNextStep()
                }
                else if(res == 'invalid'){
                    Operator.MyAlert('Log In', 'Invalid OTP!')
                }
                else{
                    Operator.MyButton('Log In', res)
                }
            })            
        } else {
            this.showError();
        }
    }

    handleNextStep() {
        Actions[this.props.nextScene]();
    }

    showError() {
        this.refs.toast.show('Enter valid PIN number', DURATION.LENGTH_LONG);
    }

    render() {
        const { contentView, container, textMargin } = Styles,
            { pageText } = this.props,
            getSubmitAction = this.handleSubmit;

        return (
            <Container>
                <Content padder contentContainerStyle={contentView} >
                    <View>
                        <View style={container}>
                            <TextWrapper small style={textMargin}>
                                {pageText.text1}
                            </TextWrapper>
                            <SmallActionText
                                text="Resend PIN code"
                                handleAction={this.sendPinCode}
                            />
                            <PinCodeWithIcon
                                style={{marginTop: 20}}
                                length={6}
                                icon="mobile"
                                size={35}
                                value={this.state.pin}
                                handleValueChange={(value) => this.setState({pin: value})}
                            />
                        </View>
                        
                    </View>
                    
                    <Toast
                        ref="toast"
                        style={{backgroundColor:'red'}}
                        position='center'
                        fadeInDuration={500}
                        fadeOutDuration={500}
                        opacity={0.9}
                        textStyle={{color:'#fff'}}
                    />
                    <Toast
                        ref="pin"
                        style={{ backgroundColor: 'green' }}
                        position="center"
                        fadeInDuration={500}
                        fadeOutDuration={500}
                        opacity={0.9}
                        textStyle={{color:'#fff'}}
                    />
                </Content>
                <View style={{padding: 20}}>
                    <MyButton
                        type='solid'
                        text='Next'
                        isLoading={this.state.isLoading}
                        onPress={() => this.handleSubmit()}
                    />
                    <MyButton
                        type='transparent'
                        text='Cancel'
                        onPress={() => Actions.pop()}
                    />    
                </View>
            </Container>
        );
    }
}

const Styles = {
    contentView: {
        justifyContent: 'space-between'
    },
    container: {
        margin: 10,
        paddingHorizontal: 5
    },
    textMargin: {
        marginTop: 15
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
  return {   
      pNumber: state.pNumber
  }
}, mapDispatchToProps)(LoginOTP);