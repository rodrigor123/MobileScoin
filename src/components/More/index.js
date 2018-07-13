// import libraries
import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, Alert, TouchableOpacity, AccessibilityInfo, BackHandler } from 'react-native';
import { Container, Content, Button, Footer } from 'native-base';

// import components
import HeaderView from '../common/HeaderView';
import Loading from '../common/Loading';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../config/colors'
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions'
// import config
import texts from '../../config/texts';
import MoreMain from './Main'
import Profile from './Profile'
import Account from './Account'
import ChangePassword from './ChangePassword'
import ChangePinCode from './ChangePinCode'
import Notification from './Notification'
import Contact from './Contact'
import HELP from './Help'
import Preference from './Preference'
import * as Storage from '../../config/storage'

const Width = Dimensions.get('window').width;
const pageText = texts.login;

class MoreScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'Main',
            ignoreInitialPage: false
        }
    }

    componentDidMount() {
        this.props.handler.MoreHandle = this        
    }

    onPressAction(action) {
        switch(action.text){
            case 'Scan QR Code':
                this.props.onPressQRIcon()
                break
            case 'Store Locator':
                this.props.onPressLocator()
                break
            case 'Profile':
                this.setState({page: 'Profile'})
                break
            case 'Account':
                this.setState({page: 'Account'})
                break
            case 'Notification':
                this.setState({page: 'Notification'})
                break
            case 'Contact Us':
                this.setState({page: 'Contact'})
                break
            case 'FAQ':
                this.setState({page: 'FAQ'})
                break
            case 'Preference':
                this.setState({page: 'Preference'})
                break
            default:
                break
        }
    }

    onSignOut() {
        this.props.signOut(() => {
            // Storage.getFromStroage('setting', (data) => {
            //     Storage.setToStorage('setting', {
            //         ...data,
            //         remember: false
            //     }, (res) => {
            //         Actions.popTo('startLogin')
            //     })
            // })    
            Actions.popTo('startLogin')
        })            
    }

    render() {
        const _this = this
        return (
            <Container>
                <Loading />                
                {
                    this.props.b_profile?
                        <Profile 
                            onPressBack={() => this.setState({page: 'Main', showProfile: false})} 
                        />
                    :this.state.page == 'Main' || this.state.page == 'Store Locator' || this.state.page == 'Scan QR Code'?
                        <MoreMain 
                            onPressAction={(action) => this.onPressAction(action)} 
                            onSignOut={() => this.onSignOut()}
                        />
                    :this.state.page == 'Profile'?
                        <Profile 
                            onPressBack={() => this.setState({page: 'Main'})} 
                        />
                    :this.state.page == 'Account'?
                        <Account 
                            onPressBack={() => this.setState({page: 'Main'})} 
                            onChangePassword={() => this.setState({page: 'Change Password'})}
                            onChangePinCode={() => this.setState({page: 'Change PinCode'})}
                        />
                    :this.state.page == 'Change Password'?
                        <ChangePassword 
                            onPressBack={() => this.setState({page: 'Account'})} 
                        />
                    :this.state.page == 'Change PinCode'?
                        <ChangePinCode
                            onPressBack={() => this.setState({page: 'Account'})} 
                        />
                    :this.state.page == 'Notification'?
                        <Notification
                            onPressBack={() => this.setState({page: 'Main'})} 
                            onPressSave={() => this.setState({page: 'Main'})}
                        />
                    :this.state.page == 'Contact'?
                        <Contact
                            onPressBack={() => this.setState({page: 'Main'})} 
                            onPressSend={() => this.setState({page: 'Main'})}
                        />
                    :this.state.page == 'FAQ'?
                        <HELP
                            category='faq'
                            onPressBack={() => this.setState({page: 'Main'})} 
                            onPressSend={() => this.setState({page: 'Main'})}
                        />
                    :this.state.page == 'Preference'?
                        <Preference
                            onPressBack={() => this.setState({page: 'Main'})} 
                            onPressSave={() => this.setState({page: 'Main'})}
                        />
                    :null
                }                
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    actionView: {
        flex: 1,
        justifyContent: 'center',
        position: 'relative'
    },
    wrapView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 15
    },
    actionItem: {
        width: Width / 3 - 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20
    },
    actionText: {
        color: colors.gray,
        fontSize: 12,
        textAlign: 'center',
        paddingVertical: 5
    },
    signOutText: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
    signOutButton: {
        backgroundColor: colors.red,
        height: 40,
        justifyContent: 'center',
        borderRadius: 8,
        position: 'absolute',
        left: 20,
        right: 20,
        top: 30
    }
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
  return {   
    b_profile: state.b_profile
  }
}, mapDispatchToProps)(MoreScreen);