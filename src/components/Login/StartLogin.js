// import libraries
import React, { Component } from 'react';
import { View, Text, ScrollView, AsyncStorage, Platform, BackHandler, Alert, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions'
import { Container, Content, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast, { DURATION } from 'react-native-easy-toast';
import CheckBox from 'react-native-checkbox'
// import components
import HeaderView from '../common/HeaderView';
import FooterView from '../common/FooterView';
import TextWrapper from '../common/TextWrapper';
import MenuNav from '../common/MenuNav';
import SubHeader from '../common/SubHeader';
import Loading from '../common/Loading';
import TextInputWithIcon from '../common/TextInputWithIcon';
import SmallActionText from '../common/SmallActionText';
import Toasters from '../common/Toasters';
import * as Storage from '../../config/storage'
import * as Operator from '../../config/operator'
import colors from '../../config/colors'


// import config
import texts from '../../config/texts';
import TouchID from 'react-native-touch-id'
const pageText = texts.splash;

class StartLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //email: 'testuser100@test.com',
            //password: 'scoin',
            email: '',
            password: '',
            auto: false,
            remember: false,
            touchID: false,
        };

        this.handleSignIn = this.handleSignIn.bind(this);
        this.showToast = this.showToast.bind(this);
        
    }

    

    componentDidMount() {
        //this.handleSignIn();
        Storage.getFromStroage('setting', (value) => {
            if(value == 'error') return
            this.setState({
                email: value.email,
                password: '',
                touch: false,
                auto: value.auto,
                remember: value.remember
            })            
            if(value.touch){
                Platform.OS == 'ios' && TouchID.isSupported()
                .then(supported => {
                    if(supported){
                        TouchID.authenticate('To login securily, please place your finger to continue.')
                        .then(success => {
                        // Success code 
                            this.setState({
                                email: value.email,
                                password: value.password,
                                touch: true
                            })
                            this.startLogin(value.email, value.password)
                        })
                        .catch(error => {
                        // Failure code 
                        });
                    }
                    else{
                        Operator.MyAlert('Log In', 'TouchID is not supported on this device.')
                    }                    
                })
                .catch((error) => Operator.MyAlert('Log In', error.toString()))
            }
            else if(value.remember) {
                
                if(value.auto && 0){
                    //remember and auto-signout
                    const CT = new Date().getTime()
                    Storage.getFromStroage('live', (time) => {
                        if(time !== 'error'){
                            if(CT - time < 180000){
                                this.setState({
                                    email: value.email,
                                    password: value.password,
                                })
                                this.startLogin(value.email, value.password)
                            }
                            else{

                            }      
                        }
                    })
                }
                else{
                    this.setState({
                        email: value.email,
                        password: value.password,
                    })      
                    this.startLogin(value.email, value.password)                    
                }               
            }
        });        
    }

    checkInputValidation() {
        const {email, password} = this.state
        var emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(password.length == 0 || email.replace(/ /g, '').length == 0){
            this.showToast('error', 'Email/Phonenumber or password is empty');
            return false
        }
        else if(!emailReg.test(this.state.email.replace(/ /g, ''))) {
            this.showToast('error', 'Email is invalid');
            return false
        }
        return true
    }

    handleSignIn() {
        const {email, password, remember, auto} = this.state
        if(this.checkInputValidation()) {
            this.startLogin(email.replace(/ /g, ''), password.replace(/ /g, ''))
        }
    }

    startLogin(email, password) {
        this.props.setLoading(true)
        this.props.a_login(email.replace(/ /g, ''), password, (res) => {
            this.props.setLoading(false)
            if(res == 'success'){
                const data = {
                    auto: this.state.auto,
                    remember: this.state.remember,
                    email: this.state.email,
                    password: this.state.password,
                    touch: this.state.touch
                }
                Storage.setToStorage('live', new Date().getTime(), () => {})
                Storage.setToStorage('setting', data, (res) => {
                    this.setState({
                        email: '',
                        password: ''
                    })
                    Actions.home() 
                });              
            }
            else{
                Operator.MyAlert('Log In', res)
            }
        })
    }

    onChangeCheckBox(value) {
        this.setState({ touch: value })        
    }

    showToast(type, message) {
        this.refs[type].show(message, DURATION.LENGTH_LONG)
    }

    render() {
        const { contentView, container, passwordContainer, linkButton, signInButtonContainer, signInButtonText, joinButtonContainer, joinButtonText, menuItems, menuItemText, footerTextContainer, footerText } = Styles,
            { title } = this.props;

        return (
            <Container>
                
                <HeaderView
                    showBackButton={false}
                    text={title}
                />
                    <Content>
                    <View style={contentView}>
                        <View style={container}>
                            <TextInputWithIcon
                                style={{ marginTop: 10 }}
                                handleValueChange={(value) => this.setState({ email: value })}
                                icon="envelope"
                                size={20}
                                value={this.state.email}
                                placeholder="Email"
                                keyboardType='email-address'
                            />
                            <View style={passwordContainer}>
                                <TextInputWithIcon
                                    style={{ flex: 8 }}
                                    handleValueChange={(value) => this.setState({ password: value })}
                                    isPassword={true}
                                    icon="asterisk"
                                    size={20}
                                    value={this.state.password}
                                    placeholder="Password"
                                />
                                <SmallActionText
                                    style={{flex: 2}}
                                    text={pageText.forgot}
                                    handleAction={Actions.loginForgot}
                                />
                            </View>
                            <CheckBox
                                containerStyle={{marginTop: 15}}
                                checkboxStyle={{
                                    width: 20, 
                                    height: 20, 
                                    marginLeft: 40,
                                    marginRight: 8,
                                    marginVertical: 10,
                                    borderColor: 'blue'
                                }}
                                labelStyle={{color: 'blue'}}
                                label='Enable TouchID Login'
                                checked={this.state.touch}
                                onChange={(checked) => this.onChangeCheckBox(!checked)}
                            />
                            <Button full iconRight style={signInButtonContainer} onPress={this.handleSignIn}>
                                <Text style={signInButtonText}>{pageText.signIn}</Text>
                                <Icon name="lock" size={25} color="#000"/>
                            </Button>
                        </View>
                    </View>
                    <View style={{backgroundColor: '#F2F2F2', flex: 1}}>
                        <View style={container}>
                            <Button full iconRight style={joinButtonContainer} onPress={() => Actions.login()}>
                                <Text style={joinButtonText}>{pageText.join}</Text>
                                <Icon name="user" size={25} color="#eee"/>
                            </Button>
                            <View style={menuItems}>
                                <TouchableOpacity style={linkButton} onPress={() => Actions.locator()}>
                                    <Text style={menuItemText}>Store Locator</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={linkButton} onPress={() => Actions.help({category: 'faq'})}>
                                    <Text style={menuItemText}>FAQ</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={linkButton} onPress={() => Actions.contact()}>
                                    <Text style={menuItemText}>Contact Us</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={menuItems}>
                                <TouchableOpacity style={linkButton} onPress={() => Actions.help({category: 'terms'})}>
                                    <Text style={menuItemText}>Terms of services</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={linkButton} onPress={() => Actions.help({category: 'legal'})}>
                                    <Text style={menuItemText}>Legal/Privacy</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{flex: 1}}>
                        </View>
                        <View style={footerTextContainer}>
                            <Text style={footerText}>Copyrights 2017 some text that will appear here as the footer text for license and maybe some copyrights stuff. Explaining about the use of the app maybe and settings som basic ruls for using this amazing app</Text>
                        </View>
                    </View>
                    <Toast
                        ref="error"
                        style={{backgroundColor: 'red', margin: 50}}
                        position='center'
                        fadeInDuration={500}
                        fadeOutDuration={500}
                        opacity={0.9}
                        textStyle={{ color: '#fff' }}
                    />
                    <Toast
                        ref="success"
                        style={{backgroundColor: 'red', margin: 50}}
                        position='center'
                        fadeInDuration={500}
                        fadeOutDuration={500}
                        opacity={0.9}
                        textStyle={{ color: '#fff' }}
                    />
                    </Content>
                <Loading />
            </Container>
        );
    }
}

const Styles = {
    contentView: {
        justifyContent: 'space-between',
        flex: 1
    },
    container: {
        margin: 10,
        paddingHorizontal: 5
    },
    passwordContainer: {
        flexDirection: 'row',
        marginTop: 10
    },
    signInButtonContainer: {
        backgroundColor: '#5195FF',
        borderRadius: 5,
        shadowOpacity: 0,
        elevation: 0,
        marginBottom: 10,
        marginTop: 15,
        justifyContent: 'space-between'
    },
    signInButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center'
    },
    joinButtonContainer: {
        backgroundColor: '#fff',
        borderWidth: 3,
        borderColor: '#5195FF',
        borderRadius: 5,
        shadowOpacity: 0,
        elevation: 0,
        marginBottom: 15,
        marginTop: 10,
        justifyContent: 'space-between'
    },
    joinButtonText: {
        color: '#5195FF',
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center'
    },
    menuItems: {
        flexDirection: 'row',
        marginBottom: 15
    },
    menuItemText: {        
        textAlign: 'center',
        color: '#888'
    },
    footerTextContainer: {
        marginTop: 15,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        paddingTop: 15,
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    footerText: {
        color: '#bbb',
        textAlign: 'center'
    },
    linkButton: {
        flex: 1,
        alignItems: 'center'
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
  return {   
      
  }
}, mapDispatchToProps)(StartLogin);