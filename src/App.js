// importing libraries
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { connect, Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Scene, ActionConst } from 'react-native-router-flux';
import reducers from './reducers';

// importing components
// HOME
import Splash from './components/Splash/Splash'
import Welcome from './components/Splash/Welcome'
import StartLogin from './components/Login/StartLogin';
import ForgotPassword from './components/Login/ForgotPassword';

// REGISTER
import Login from './components/Login/Login';
import LoginGetStarted from './components/Login/LoginGetStarted';
import LoginOTP from './components/Login/LoginOTP';
import LoginDetails from './components/Login/LoginDetails';
import LoginMoreDetails from './components/Login/LoginMoreDetails';
import LoginPassword from './components/Login/LoginPassword';
import LoginReview from './components/Login/LoginReview';

// DASHBOARD / TRANSACTIONS
import Home from './components/Home'
import Dashboard from './components/Dashboard/Dashboard';
import QRCodeView from './components/More/QRCodeView'
import FilterTransaction from './components/Transaction/FilterTransaction'
import Locator from './components/More/Locator'
import HELP from './components/More/Help'
import Contact from './components/More/Contact'
// TRANSFER
import Transfer from './components/Transfer/Transfer';
import TransferMethod from './components/Transfer/TransferMethod';

const RouterWithRedux = connect()(Router);

const store = compose(
    applyMiddleware(thunk)
)(createStore)(reducers);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <RouterWithRedux>
                    <Scene key="root" hideNavBar={true}>
                        <Scene key="splash" text="splash" component={Splash} title="Splash" />
                        <Scene key="welcome" text="splash" component={Welcome} title="Welcome" />
                        <Scene key="startLogin" text="startLogin" component={StartLogin} title="Scoin" type={ActionConst.REPLACE} />
                        <Scene key="loginForgot" text="forgot" component={ForgotPassword} title="Forgot Password" />
                        <Scene key="login" hideNavBar={true} title="Login" component={Login} title="Join Scoin" duration={0}>
                        <Scene key="loginGetStarted" text="getStarted" component={LoginGetStarted} title="Get Started" nextScene="loginOTP" step={0} />
                            <Scene key="loginGetStarted" text="getStarted" component={LoginGetStarted} title="Get Started" nextScene="loginOTP" step={0} />
                            <Scene key="loginOTP" text="stepOne" component={LoginOTP} title="Hi there" step={1} nextScene="loginPassword" maxSteps={4} />
                            <Scene key="loginPassword" text="stepFour" component={LoginPassword} title="Security" step={2} nextScene="loginDetails" maxSteps={4} />
                            <Scene key="loginDetails" text="stepTwo" component={LoginDetails} title="About you" step={3} nextScene="loginMoreDetails" maxSteps={4} />
                            <Scene key="loginMoreDetails" text="stepThree" component={LoginMoreDetails} title="Other" step={4} nextScene="loginReview" maxSteps={4} />
                            <Scene key="loginReview" text="review" component={LoginReview} title="Review" step={0} />
                        </Scene>
                        <Scene key="qrcode" text="QRCodeView" component={QRCodeView} title="QRCodeView" />
                        <Scene key="home" text="home" component={Home} title="Home" />
                        <Scene key="filterTransaction" text="Filter Transaction" component={FilterTransaction} title="Filter Transaction" />
                        <Scene key="locator" text="Store Locator" component={Locator} title="Store Locator" />
                        <Scene key="help" text="HELP" component={HELP} title="HELP" />
                        <Scene key="contact" text="Contact" component={Contact} title="Contact" />
                    </Scene>
                </RouterWithRedux>
            </Provider>
        );
    }
}