// import libraries
import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Container, Content, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions'
// import components
import HeaderView from '../common/HeaderView';
import FooterView from '../common/FooterView';
import TextWrapper from '../common/TextWrapper';
import MenuNav from '../common/MenuNav';
import SubHeader from '../common/SubHeader';
import Loading from '../common/Loading';
import TextInputWithIcon from '../common/TextInputWithIcon';
import Toast, { DURATION } from 'react-native-easy-toast';
import * as Operator from '../../config/operator'
// import config
import texts from '../../config/texts';
import colors from '../../config/colors';
const pageText = texts.forgot;

class ForgotPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: ''
        }
    }

    onResetPassword() {
        var emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!emailReg.test(this.state.email.replace(/ /g, ''))) return this.showError('Invalid email address');
        //reset process
        const param = {
            emailid: this.state.email
        }
        this.props.forgotPassword(param, (result) => {
            if(result == 'success'){
                Operator.MyAlert('Forgot Password', 'Your password has been reset successfully! Please check your email to continue.')
                Actions.pop()
            }
            else{
                Operator.MyAlert('Forgot Password', 'Email not found or reset error')
            }
        })
    }

    showError(message) {
        this.refs.toast.show(message, DURATION.LENGTH_LONG);
    }

    render() {
        const { contentView, container, verifyButtonContainer, verifyButtonText, explain, bottomView } = Styles,
            { title } = this.props;

        return (
            <Container>
                <Loading />
                <HeaderView
                    text={title}
                />
                <ScrollView>
                <Content contentContainerStyle={contentView}>
                    <View style={container}>
                        <TextWrapper subTitle style={{ marginTop: 10}}>
                            {pageText.subTitle}
                        </TextWrapper>
                        <TextInputWithIcon
                            style={{ margin: 20 }}
                            handleValueChange={(value) => this.setState({ email: value })}
                            value={this.state.email}
                            placeholder="email"
                        />                                               
                    </View>                    
                    <View style={bottomView}>
                        <Button full style={verifyButtonContainer} onPress={() => this.onResetPassword()}>
                            <Text style={verifyButtonText}>{pageText.verify}</Text>
                        </Button>
                        <Text style={explain}>
                            Copyrights 2017
                        </Text>
                    </View>
                </Content>
                </ScrollView>
                <Toast
                    ref="toast"
                    style={{backgroundColor:'red', marginBottom: 40}}
                    position='bottom'
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
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    container: {
        margin: 20,
        paddingHorizontal: 5
    },
    verifyButtonContainer: {
        backgroundColor: '#5195FF',
        borderRadius: 5,
        shadowOpacity: 0,
        elevation: 0,
        marginLeft: 20,
        marginRight: 20,
        height: 45,
        marginBottom: 45,
    },
    verifyButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center'
    },
    explain: {
        color: colors.gray,
        fontSize: 14,
        backgroundColor: 'transparent',
        padding: 40
    },
    bottomView: {
        //flex: 1,
        //justifyContent: 'flex-end'
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
  return {   
      
  }
}, mapDispatchToProps)(ForgotPassword);