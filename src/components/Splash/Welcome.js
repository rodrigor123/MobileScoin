// import libraries
import React, { Component } from 'react';
import { View, Image, StyleSheet, AsyncStorage, Text, ScrollView, Platform, TouchableOpacity} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Content, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import colors from '../../config/colors';

class Splash extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        };
    }

    componentDidMount() {
        //this.handleSignIn();
        AsyncStorage.setItem('open', 'yes', (err, result) => {

        })
    }

    getStarted() {
        Actions.startLogin()
    }

    render() {

        return (
            <Container>
                <Image style={styles.ImageView} source={require('../../resources/image/splash2.jpg')} />
                <View style={styles.content}>
                    <Text style={styles.scoin}>Scoin</Text>
                    <Text style={styles.welcomeText}>You will ever need!</Text>
                    <TouchableOpacity style={styles.button} onPress={() => this.getStarted()}>
                        <Text style={styles.buttonText}>GET STARTED</Text>
                    </TouchableOpacity>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create(
    {
        ImageView: {
            flex: 4,
            resizeMode: 'cover',
        },
        content: {
            flex: 6,
            alignItems: 'center',
            backgroundColor: colors.scoinLogoBlue
        },
        scoin: {
            fontSize: 60,
            padding: 15,
            color: 'white',  
        },
        welcomeText: {
            fontSize: 14,
            color: 'white',
            flex: 1,
            paddingTop: 15
        },
        buttonText: {
            color: 'white',
            fontSize: 12,
            backgroundColor: 'transparent',
        },
        button: {
            borderRadius: Platform.OS == 'ios' ? 50 : 25,
            backgroundColor: colors.pink,
            paddingHorizontal: 25,
            paddingVertical: 15,
            height: 50,
            marginBottom: 20
        }

    }
);

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(null, mapDispatchToProps)(Splash);