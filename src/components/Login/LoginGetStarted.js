// import libraries
import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
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
import MyButton from '../common/ActionButton'
import * as Operator from '../../config/operator'
// import scoin api methods
import scoinApi from '../../api/scoinApi';

class LoginGetStarted extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: ''
        }
    }

    handleSubmit() {
        const _this = this
        if(this.state.phoneNumber.length === 12) {
            this.handleNextStep();
        } else {
            this.showError('Enter valid phone number');
        }
    }

    handleNextStep() {
        const {phoneNumber} = this.state
        this.setState({isLoading: true})
        this.props.setPhoneNumber(phoneNumber)
        this.props.sendOTP({phonenumber: phoneNumber}, (res) => {
            this.setState({isLoading: false})
            if(res == 'success'){
                Actions.loginOTP()
            }
            else{
                Operator.MyAlert('Log In', res)
            }
        })
    }

    handleValueChange(value) {        
        this.setState({phoneNumber: value})
    }

    showError(message) {
        this.refs.toast.show(message, DURATION.LENGTH_LONG);
    }

    render() {
        const { pageText } = this.props
        return (
            <Container>
                <Content contentContainerStyle={styles.contentView}>
                    <View style={styles.container}>
                        <TextWrapper title>
                            {pageText.title}
                        </TextWrapper>
                        <TextWrapper subTitle>
                            {pageText.subTitle}
                        </TextWrapper>
                        <TextWrapper small style={styles.textMargin}>
                            {pageText.text1}
                        </TextWrapper>
                        <TextWrapper small style={styles.textMargin}>
                            {pageText.text2}
                        </TextWrapper>
                        <NumericInputWithIcon
                            style={{marginTop: 30}}
                            icon="phone"
                            size={25}
                            value={this.state.phoneNumber}
                            handleValueChange={(value) => this.handleValueChange(value)}
                            maxLength={12}
                        />
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
                          
                </Content>  
                <View style={{padding: 20}}>
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
            </Container>
        );
    }
}

const styles = StyleSheet.create(
    {
        contentView: {
            padding: 20,
            justifyContent: 'space-between'
        },
        container: {
            margin: 10,
            paddingHorizontal: 5
        },
        textMargin: {
            marginTop: 15
        }
    }
);

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
  return {   
      
  }
}, mapDispatchToProps)(LoginGetStarted);