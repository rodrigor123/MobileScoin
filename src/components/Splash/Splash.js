// import libraries
import React, { Component } from 'react';
import { View, Image, AsyncStorage, Text, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Content, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import SplashScreen from 'react-native-splash-screen'

class Splash extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        };
    }

    componentDidMount() {
        //this.handleSignIn();
        setTimeout(function() {
            SplashScreen.hide();
            AsyncStorage.getItem('open', (err, result) => {
                if(result == 'yes') Actions.startLogin()
                else Actions.welcome()
            })            
        }, 1000)
    }

    render() {

        return (
            <Container>
                
            </Container>
        );
    }
}

const styles = {
    splashImage: {
        resizeMode: 'contain'
    }
};

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(null, mapDispatchToProps)(Splash);