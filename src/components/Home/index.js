// importing react modules
import React, { Component, PropTypes } from 'react';
import { AppState, AppRegistry, View, Text, BackHandler, Image, Alert, TextInput, TouchableOpacity, StyleSheet, AsyncStorage, ScrollView, Dimensions } from 'react-native';

// importing external modules
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// importing custom modules
import { ActionCreators } from '../../actions'
import FacebookTabBar from '../common/FacebookTabBar'

// importing Screens
import Dashboard from '../Dashboard/Dashboard'
import TransactionsList from '../Transaction/TransactionsList'
import Transfer from '../Transfer/Transfer'
import MoreScreen from '../More'
import colors from '../../config/colors'
import * as Storage from '../../config/storage'

// consts
const Width = Dimensions.get('window').width
const Height = Dimensions.get('window').height
const AUTO_SIGNOUT_TIME = 180000 // milli seconds

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile: '',
            email: '',
            tabIndex: 0,
            initialPage: 'none',
            appState: AppState.currentState,
            status: ''
        }
    }
    
    componentDidMount() {
        const _this = this
        AppState.addEventListener('change', this._handleAppStateChange);
        this.props.a_getTransaction(this.props.r_me, [], this.state.tabIndex)
        this.setBackButtonHandler()
    }
    
    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState) => {
        const CT = new Date().getTime()
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            //going to foreground
            this.props.a_getTransaction(this.props.r_me, [], this.state.tabIndex)
            
            Storage.getFromStroage('setting', (value) => {
                if(value.auto){
                    
                    Storage.getFromStroage('live', (time) => {
                        //alert(CT - time)
                        if(CT - time > AUTO_SIGNOUT_TIME){
                            Actions.popTo('startLogin');
                        }
                    })
                }
            })            
        }
        else{
            Storage.setToStorage('live', CT, () => {})
        }
        this.setState({appState: nextAppState});
    }

    componentWillReceiveProps(props) {
        if(props.from){
            setTimeout(() => {
                this.setState({status: ''})
            }, 500)
        }
    }

    setBackButtonHandler() {
        BackHandler.addEventListener("hardwareBackPress", () => {
            if(this.state.status == 'navigate') return true
            switch(Number(this.state.tabIndex)){
                case 0:
                    this.s
                    Alert.alert(
                        'Dashboard',
                        'Are you sure you want to log out?',
                        [
                            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            {text: 'Yes', onPress: () => Actions.pop()},
                        ],
                        { cancelable: false }
                    )
                    break   
                case 1:
                    Alert.alert(
                        'Transactions',
                        'Are you sure you want to log out?',
                        [
                            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            {text: 'Yes', onPress: () => Actions.pop()},
                        ],
                        { cancelable: false }
                    )
                    break
                case 2:
                    switch(this.TransHandle.state.step){
                        case 0:
                            Alert.alert(
                                'Transfer',
                                'Are you sure you want to log out?',
                                [
                                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                    {text: 'Yes', onPress: () => Actions.pop()},
                                ],
                                { cancelable: false }
                            )
                            break
                        case 11, 15, 21, 24, 31:
                            this.TransHandle.setState({step: 0})
                            break
                        default: 
                            this.TransHandle.onBackStep()
                            break
                    }               
                    break
                case 3:
                    if(this.props.b_profile){
                        this.props.gotoProfilePage(false)
                        this.MoreHandle.setState({page: 'Main'})
                    }
                    else{
                        switch(this.MoreHandle.state.page){
                            case 'Main':
                            case 'Scan QR Code':
                            case 'Store Locator':
                                Alert.alert(
                                    'Scoin',
                                    'Are you sure you want to log out?',
                                    [
                                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                        {text: 'Yes', onPress: () => Actions.pop()},
                                    ],
                                    { cancelable: false }
                                )
                                break
                            case 'Profile':
                            case 'Account':
                            case 'Notification':
                            case 'FAQ':
                            case 'Preference':
                            case 'Contact':
                                this.MoreHandle.setState({page: 'Main'})
                                break
                            case 'Change Password':
                            case 'Change PinCode':
                                this.MoreHandle.setState({page: 'Account'})
                                break
                            default:
                        }              
                    }                     
                    break
                default: 
                    break
            }            
            return true
            
        })
    }

    onPressProfile() {
        this.setState({tabIndex: 3})
        this.props.gotoProfilePage(true)
    }

    onCompleteTransfer() {
        this.setState({tabIndex: 0})
        this.props.a_getTransaction(this.props.r_me, [], 1)
        this.props.setUserDataList(this.props.r_me.userId, this.props.r_me.token)
    }

    onNavigate(key) {
        this.setState({status: 'navigate'})
        if(key == 'qrcode'){
            Actions.qrcode()
        }
        else{
            Actions.locator()
        }
    }

    render() {
        const _this = this
        return(

            <View style={styles.container}>
                <ScrollableTabView
                        renderTabBar={() => <FacebookTabBar style={{borderTopWidth: 1, borderColor: 'darkgray', height: 70}}/>}
                        page={this.state.tabIndex}
                        onChangeTab={(tab)=>{this.onClickTab(tab)}}
                        tabBarPosition='bottom'>
                    <Dashboard 
                        tabLabel='dashboard' 
                        onPressQRIcon={() => this.onNavigate('qrcode')}
                    />
                    <TransactionsList 
                        tabLabel='list' 
                        onPressProfile={() => this.onPressProfile()}
                        onPressQRIcon={() => this.onNavigate('qrcode')}
                    />
                    <Transfer 
                        handler = {this}
                        tabLabel='arrow-circle-right' 
                        onPressProfile={() => this.onPressProfile()}
                        onPressQRIcon={() => this.onNavigate('qrcode')}
                        onCompleteStep={() => this.onCompleteTransfer()}                         
                    />
                    <MoreScreen 
                        handler = {this}
                        tabLabel='ellipsis-h' 
                        onPressQRIcon={() => this.onNavigate('qrcode')}
                        onPressLocator={() => this.onNavigate('locator')}
                        initialPage={this.state.initialPage}
                    />
                </ScrollableTabView>
            </View>

        )
    }

    onClickTab(tab) {
        this.setState({tabIndex: tab.i})
        switch(tab.i){
            case 0:
                //BackHandler.removeEventListener('hardwareBackPress', function(){})
                this.props.a_getTransaction(this.props.r_me, [], 0)
                break
            case 1:
                //BackHandler.removeEventListener('hardwareBackPress', function(){})
                this.props.a_getTransaction(this.props.r_me, [], 1)
                break
            case 2:
                break
            case 3:
                this.MoreHandle.setState({page: 'Main'})
                break
            default:                
        }        
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa'
    },
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => {
  return {
    r_me: state.me,
    r_history: state.trans_history,
    b_profile: state.b_profile
  }
}, mapDispatchToProps)(Home);
